// The sky shared by the viewer and the path tracer: a photographic gradient (zenith → horizon) with the sun's glow
// and cirrus wisps (value-noise fbm on a plane above the camera). SKY_FRAG draws the dome at display level;
// SKY_EQUIRECT_FRAG renders it into an equirectangular HDR panorama (linear, with an optional sun disc) for the path
// tracer's environment and background.
export const SKY_VERT = 'varying vec3 vDir; void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4( position, 1. ); gl_Position = p.xyww; }';
const SKY_COMMON = /* glsl */`uniform vec3 zenith, horizon, groundCol, sunDir, sunCol, cloudColor; uniform float cloudAmount, gain;
float hash2( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
float vnoise( vec2 p ) { vec2 i = floor( p ), f = fract( p ); f = f * f * ( 3. - 2. * f );
  return mix( mix( hash2( i ), hash2( i + vec2( 1., 0. ) ), f.x ), mix( hash2( i + vec2( 0., 1. ) ), hash2( i + vec2( 1., 1. ) ), f.x ), f.y ); }
float fbm( vec2 p ) { float s = 0., a = .5; for ( int k = 0; k < 5; k ++ ) { s += a * vnoise( p ); p = p * 2.03 + vec2( 1.7, 9.2 ); a *= .5; } return s; }
`;
const skyColor = /* glsl */`vec3 skyColor( vec3 d ) {
  float y = d.y;
  vec3 c = y > 0. ? mix( horizon, zenith, pow( y, .38 ) ) : mix( horizon, groundCol, smoothstep( 0., .06, - y ) );
  float s = max( dot( d, sunDir ), 0. );
  c += sunCol * ( pow( s, 6. ) * .35 + pow( s, 90. ) * 1.2 ) * smoothstep( -.03, .02, y );
  if ( y > 0. && cloudAmount > 0. ) {
    vec2 cp = d.xz / ( y + .1 ) * 1.4; cp.x *= .32;
    float k = smoothstep( .56, .86, fbm( cp + vec2( 3.1, 1.3 ) ) ) * cloudAmount * smoothstep( 0., .18, y );
    c = mix( c, cloudColor * ( .8 + .25 * fbm( cp * 3. ) ) + sunCol * pow( s, 4. ) * .5, k );
  }
  return c;
}`;
export const SKY_FRAG = SKY_COMMON + 'varying vec3 vDir;\n' + skyColor + /* glsl */`
void main() {
  gl_FragColor = vec4( skyColor( normalize( vDir ) ) * gain, 1. );
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
// three's equirect convention: u = atan( z, x ) / 2π + ½, v = asin( y ) / π + ½
export const SKY_EQUIRECT_VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4( position.xy, 0., 1. ); }';
export const SKY_EQUIRECT_FRAG = SKY_COMMON + 'uniform vec3 sunDisc; uniform float sunCos; varying vec2 vUv;\n' + skyColor + /* glsl */`
void main() {
  float phi = ( vUv.x - .5 ) * 6.2831853, th = ( vUv.y - .5 ) * 3.1415927;
  vec3 d = vec3( cos( th ) * cos( phi ), sin( th ), cos( th ) * sin( phi ) );
  vec3 c = skyColor( d ) * gain;
  if ( dot( d, sunDir ) > sunCos ) c += sunDisc;                      // the sun itself (radiance), for soft shadows
  gl_FragColor = vec4( c, 1. );
}`;
