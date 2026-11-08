import{a as bs,b as ga,c as _a}from"./chunk-FUK6BMXM.js";import{a as Ci,b as xa,e as cr,f as Ri,g as Gl,h as hr,i as ya,j as va,k as Ss,l as Wl,m as Xl,n as ql,o as Yl}from"./chunk-CREJXZ56.js";var Qn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Sc=0,el=1,Tc=2;var nl=1,ho=2,Tn=3,Un=0,Le=1,wn=2,Fn=0,hi=1,il=2,sl=3,rl=4,wc=5,Zn=100,Ec=101,Ac=102,Cc=103,Rc=104,Pc=200,Ic=201,Dc=202,Lc=203,Or=204,Br=205,Uc=206,Nc=207,Fc=208,Oc=209,Bc=210,zc=211,kc=212,Vc=213,Hc=214,uo=0,fo=1,po=2,ui=3,mo=4,go=5,_o=6,xo=7,yo=0,Gc=1,Wc=2,On=0,Xc=1,qc=2,Yc=3,vo=4,Zc=5,$c=6,Jc=7;var ol=300,yi=301,vi=302,Mo=303,bo=304,Qs=306,$n=1e3,Yn=1001,zr=1002,We=1003,Kc=1004;var tr=1005;var fn=1006,So=1007;var ei=1008;var gn=1009,al=1010,ll=1011,os=1012,To=1013,ni=1014,_n=1015,as=1016,wo=1017,Eo=1018,ls=1020,cl=35902,hl=35899,ul=1021,dl=1022,ln=1023,Yi=1026,cs=1027,Ao=1028,Co=1029,fl=1030,Ro=1031;var Po=1033,er=33776,nr=33777,ir=33778,sr=33779,Io=35840,Do=35841,Lo=35842,Uo=35843,No=36196,Fo=37492,Oo=37496,Bo=37808,zo=37809,ko=37810,Vo=37811,Ho=37812,Go=37813,Wo=37814,Xo=37815,qo=37816,Yo=37817,Zo=37818,$o=37819,Jo=37820,Ko=37821,jo=36492,Qo=36494,ta=36495,ea=36283,na=36284,ia=36285,sa=36286;var Ls=2300,kr=2301,Nr=2302,qa=2400,Ya=2401,Za=2402;var jc=3200,Qc=3201;var ra=0,th=1,Bn="",we="srgb",di="srgb-linear",Us="linear",oe="srgb";var ci=7680;var $a=519,eh=512,nh=513,ih=514,pl=515,sh=516,rh=517,oh=518,ah=519,Ja=35044;var ml="300 es",dn=2e3,Ns=2001;var vn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zl=1234567,Xi=Math.PI/180,Zi=180/Math.PI;function hs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Kt(i,t,e){return Math.max(t,Math.min(e,i))}function gl(i,t){return(i%t+t)%t}function hu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function uu(i,t,e){return i!==t?(e-i)/(t-i):0}function Ds(i,t,e){return(1-e)*i+e*t}function du(i,t,e,n){return Ds(i,t,1-Math.exp(-e*n))}function fu(i,t=1){return t-Math.abs(gl(i,t*2)-t)}function pu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function mu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function gu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function _u(i,t){return i+Math.random()*(t-i)}function xu(i){return i*(.5-Math.random())}function yu(i){i!==void 0&&(Zl=i);let t=Zl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vu(i){return i*Xi}function Mu(i){return i*Zi}function bu(i){return(i&i-1)===0&&i!==0}function Su(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Tu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function wu(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),f=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*f,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ze(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var _l={DEG2RAD:Xi,RAD2DEG:Zi,generateUUID:hs,clamp:Kt,euclideanModulo:gl,mapLinear:hu,inverseLerp:uu,lerp:Ds,damp:du,pingpong:fu,smoothstep:pu,smootherstep:mu,randInt:gu,randFloat:_u,randFloatSpread:xu,seededRandom:yu,degToRad:vu,radToDeg:Mu,isPowerOfTwo:bu,ceilPowerOfTwo:Su,floorPowerOfTwo:Tu,setQuaternionFromProperEuler:wu,normalize:ze,denormalize:Wi},Bt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(f!==x||c!==u||l!==p||h!==g){let m=1-a,d=c*u+l*p+h*g+f*x,A=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){let P=Math.sqrt(E),w=Math.atan2(P,d*A);m=Math.sin(m*w)/P,a=Math.sin(a*w)/P}let v=a*A;if(c=c*m+u*v,l=l*m+p*v,h=h*m+g*v,f=f*m+x*v,m===1-a){let P=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=P,l*=P,h*=P,f*=P}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*f+c*p-l*u,t[e+1]=c*g+h*u+l*f-a*p,t[e+2]=l*g+h*p+a*u-c*f,t[e+3]=h*g-a*f-c*u-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),u=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"YZX":this._x=u*h*f+l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f-u*p*g;break;case"XZY":this._x=u*h*f-l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>f){let p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){let p=2*Math.sqrt(1+a-n-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*f+this._w*u,this._x=n*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($l.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($l.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ma.copy(this).projectOnVector(t),this.sub(Ma)}reflect(t){return this.sub(Ma.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ma=new N,$l=new Xe,Yt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],p=n[5],g=n[8],x=s[0],m=s[3],d=s[6],A=s[1],E=s[4],v=s[7],P=s[2],w=s[5],T=s[8];return r[0]=o*x+a*A+c*P,r[3]=o*m+a*E+c*w,r[6]=o*d+a*v+c*T,r[1]=l*x+h*A+f*P,r[4]=l*m+h*E+f*w,r[7]=l*d+h*v+f*T,r[2]=u*x+p*A+g*P,r[5]=u*m+p*E+g*w,r[8]=u*d+p*v+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,u=a*c-h*r,p=l*r-o*c,g=e*f+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=f*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ba.makeScale(t,e)),this}rotate(t){return this.premultiply(ba.makeRotation(-t)),this}translate(t,e){return this.premultiply(ba.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ba=new Yt;function xl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function $i(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lh(){let i=$i("canvas");return i.style.display="block",i}var Jl={};function Ji(i){i in Jl||(Jl[i]=!0,console.warn(i))}function ch(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Kl=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eu(){let i={enabled:!0,workingColorSpace:di,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===oe&&(s.r=Ln(s.r),s.g=Ln(s.g),s.b=Ln(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===oe&&(s.r=qi(s.r),s.g=qi(s.g),s.b=qi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Us:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ji("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ji("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[di]:{primaries:t,whitePoint:n,transfer:Us,toXYZ:Kl,fromXYZ:jl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:Kl,fromXYZ:jl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:we}}}),i}var ee=Eu();function Ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Pi,Vr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Pi===void 0&&(Pi=$i("canvas")),Pi.width=t.width,Pi.height=t.height;let s=Pi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Pi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=$i("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ln(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ln(e[n]/255)*255):e[n]=Ln(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Au=0,Ki=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=hs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Sa(s[o].image)):r.push(Sa(s[o]))}else r=Sa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Cu=0,Ta=new N,Fe=class i extends vn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Yn,s=Yn,r=fn,o=ei,a=ln,c=gn,l=i.DEFAULT_ANISOTROPY,h=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=hs(),this.name="",this.source=new Ki(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Bt(0,0),this.repeat=new Bt(1,1),this.center=new Bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ta).x}get height(){return this.source.getSize(Ta).y}get depth(){return this.source.getSize(Ta).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ol)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $n:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case zr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $n:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case zr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=ol;Fe.DEFAULT_ANISOTROPY=1;var re=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],f=c[8],u=c[1],p=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(l+1)/2,v=(p+1)/2,P=(d+1)/2,w=(h+u)/4,T=(f+x)/4,S=(g+m)/4;return E>v&&E>P?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=T/n):v>P?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=S/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=T/r,s=S/r),this.set(n,s,r,e),this}let A=Math.sqrt((m-g)*(m-g)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(f-x)/A,this.z=(u-h)/A,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Hr=class extends vn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new Fe(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ki(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mn=class extends Hr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Fs=class extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Gr=class extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ve=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ur.copy(n.boundingBox)),ur.applyMatrix4(t.matrixWorld),this.union(ur)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ts),dr.subVectors(this.max,Ts),Ii.subVectors(t.a,Ts),Di.subVectors(t.b,Ts),Li.subVectors(t.c,Ts),Vn.subVectors(Di,Ii),Hn.subVectors(Li,Di),ri.subVectors(Ii,Li);let e=[0,-Vn.z,Vn.y,0,-Hn.z,Hn.y,0,-ri.z,ri.y,Vn.z,0,-Vn.x,Hn.z,0,-Hn.x,ri.z,0,-ri.x,-Vn.y,Vn.x,0,-Hn.y,Hn.x,0,-ri.y,ri.x,0];return!wa(e,Ii,Di,Li,dr)||(e=[1,0,0,0,1,0,0,0,1],!wa(e,Ii,Di,Li,dr))?!1:(fr.crossVectors(Vn,Hn),e=[fr.x,fr.y,fr.z],wa(e,Ii,Di,Li,dr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},An=[new N,new N,new N,new N,new N,new N,new N,new N],cn=new N,ur=new Ve,Ii=new N,Di=new N,Li=new N,Vn=new N,Hn=new N,ri=new N,Ts=new N,dr=new N,fr=new N,oi=new N;function wa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){oi.fromArray(i,r);let a=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Ru=new Ve,ws=new N,Ea=new N,Nn=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ru.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ws.subVectors(t,this.center);let e=ws.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ws.copy(t.center).add(Ea)),this.expandByPoint(ws.copy(t.center).sub(Ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Cn=new N,Aa=new N,pr=new N,Gn=new N,Ca=new N,mr=new N,Ra=new N,bn=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Aa.copy(t).add(e).multiplyScalar(.5),pr.copy(e).sub(t).normalize(),Gn.copy(this.origin).sub(Aa);let r=t.distanceTo(e)*.5,o=-this.direction.dot(pr),a=Gn.dot(this.direction),c=-Gn.dot(pr),l=Gn.lengthSq(),h=Math.abs(1-o*o),f,u,p,g;if(h>0)if(f=o*c-a,u=o*a-c,g=r*h,f>=0)if(u>=-g)if(u<=g){let x=1/h;f*=x,u*=x,p=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u<=-g?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Aa).addScaledVector(pr,u),p}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);let n=Cn.dot(this.direction),s=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,s,r){Ca.subVectors(e,t),mr.subVectors(n,t),Ra.crossVectors(Ca,mr);let o=this.direction.dot(Ra),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gn.subVectors(this.origin,t);let c=a*this.direction.dot(mr.crossVectors(Gn,mr));if(c<0)return null;let l=a*this.direction.dot(Ca.cross(Gn));if(l<0||c+l>o)return null;let h=-a*Gn.dot(Ra);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ae=class i{constructor(t,e,n,s,r,o,a,c,l,h,f,u,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,f,u,p,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,f,u,p,g,x,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=f,d[14]=u,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ui.setFromMatrixColumn(t,0).length(),r=1/Ui.setFromMatrixColumn(t,1).length(),o=1/Ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=o*h,p=o*f,g=a*h,x=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=p+g*l,e[5]=u-x*l,e[9]=-a*c,e[2]=x-u*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,p=c*f,g=l*h,x=l*f;e[0]=u+x*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,p=c*f,g=l*h,x=l*f;e[0]=u-x*a,e[4]=-o*f,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,p=o*f,g=a*h,x=a*f;e[0]=c*h,e[4]=g*l-p,e[8]=u*l+x,e[1]=c*f,e[5]=x*l+u,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-u*f,e[8]=g*f+p,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*f+g,e[10]=u-x*f}else if(t.order==="XZY"){let u=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=u*f+x,e[5]=o*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=a*h,e[10]=x*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pu,t,Iu)}lookAt(t,e,n){let s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Wn.crossVectors(n,je),Wn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Wn.crossVectors(n,je)),Wn.normalize(),gr.crossVectors(je,Wn),s[0]=Wn.x,s[4]=gr.x,s[8]=je.x,s[1]=Wn.y,s[5]=gr.y,s[9]=je.y,s[2]=Wn.z,s[6]=gr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],A=n[3],E=n[7],v=n[11],P=n[15],w=s[0],T=s[4],S=s[8],_=s[12],y=s[1],R=s[5],C=s[9],I=s[13],L=s[2],O=s[6],F=s[10],H=s[14],V=s[3],W=s[7],j=s[11],nt=s[15];return r[0]=o*w+a*y+c*L+l*V,r[4]=o*T+a*R+c*O+l*W,r[8]=o*S+a*C+c*F+l*j,r[12]=o*_+a*I+c*H+l*nt,r[1]=h*w+f*y+u*L+p*V,r[5]=h*T+f*R+u*O+p*W,r[9]=h*S+f*C+u*F+p*j,r[13]=h*_+f*I+u*H+p*nt,r[2]=g*w+x*y+m*L+d*V,r[6]=g*T+x*R+m*O+d*W,r[10]=g*S+x*C+m*F+d*j,r[14]=g*_+x*I+m*H+d*nt,r[3]=A*w+E*y+v*L+P*V,r[7]=A*T+E*R+v*O+P*W,r[11]=A*S+E*C+v*F+P*j,r[15]=A*_+E*I+v*H+P*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],u=t[10],p=t[14],g=t[3],x=t[7],m=t[11],d=t[15];return g*(+r*c*f-s*l*f-r*a*u+n*l*u+s*a*p-n*c*p)+x*(+e*c*p-e*l*u+r*o*u-s*o*p+s*l*h-r*c*h)+m*(+e*l*f-e*a*p-r*o*f+n*o*p+r*a*h-n*l*h)+d*(-s*a*h-e*c*f+e*a*u+s*o*f-n*o*u+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],u=t[10],p=t[11],g=t[12],x=t[13],m=t[14],d=t[15],A=f*m*l-x*u*l+x*c*p-a*m*p-f*c*d+a*u*d,E=g*u*l-h*m*l-g*c*p+o*m*p+h*c*d-o*u*d,v=h*x*l-g*f*l+g*a*p-o*x*p-h*a*d+o*f*d,P=g*f*c-h*x*c-g*a*u+o*x*u+h*a*m-o*f*m,w=e*A+n*E+s*v+r*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/w;return t[0]=A*T,t[1]=(x*u*r-f*m*r-x*s*p+n*m*p+f*s*d-n*u*d)*T,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*d+n*c*d)*T,t[3]=(f*c*r-a*u*r-f*s*l+n*u*l+a*s*p-n*c*p)*T,t[4]=E*T,t[5]=(h*m*r-g*u*r+g*s*p-e*m*p-h*s*d+e*u*d)*T,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*d-e*c*d)*T,t[7]=(o*u*r-h*c*r+h*s*l-e*u*l-o*s*p+e*c*p)*T,t[8]=v*T,t[9]=(g*f*r-h*x*r-g*n*p+e*x*p+h*n*d-e*f*d)*T,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*d+e*a*d)*T,t[11]=(h*a*r-o*f*r-h*n*l+e*f*l+o*n*p-e*a*p)*T,t[12]=P*T,t[13]=(h*x*s-g*f*s+g*n*u-e*x*u-h*n*m+e*f*m)*T,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*T,t[15]=(o*f*s-h*a*s+h*n*c-e*f*c-o*n*u+e*a*u)*T,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,f=a+a,u=r*l,p=r*h,g=r*f,x=o*h,m=o*f,d=a*f,A=c*l,E=c*h,v=c*f,P=n.x,w=n.y,T=n.z;return s[0]=(1-(x+d))*P,s[1]=(p+v)*P,s[2]=(g-E)*P,s[3]=0,s[4]=(p-v)*w,s[5]=(1-(u+d))*w,s[6]=(m+A)*w,s[7]=0,s[8]=(g+E)*T,s[9]=(m-A)*T,s[10]=(1-(u+x))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ui.set(s[0],s[1],s[2]).length(),o=Ui.set(s[4],s[5],s[6]).length(),a=Ui.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);let l=1/r,h=1/o,f=1/a;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=f,hn.elements[9]*=f,hn.elements[10]*=f,e.setFromRotationMatrix(hn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=dn,c=!1){let l=this.elements,h=2*r/(e-t),f=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s),g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===dn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Ns)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=dn,c=!1){let l=this.elements,h=2/(e-t),f=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s),g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===dn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Ns)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ui=new N,hn=new ae,Pu=new N(0,0,0),Iu=new N(1,1,1),Wn=new N,gr=new N,je=new N,Ql=new ae,tc=new Xe,on=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tc.setFromEuler(this),this.setFromQuaternion(tc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER="XYZ";var ji=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Du=0,ec=new N,Ni=new Xe,Rn=new ae,_r=new N,Es=new N,Lu=new N,Uu=new Xe,nc=new N(1,0,0),ic=new N(0,1,0),sc=new N(0,0,1),rc={type:"added"},Nu={type:"removed"},Fi={type:"childadded",child:null},Pa={type:"childremoved",child:null},Ee=class i extends vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new on,n=new Xe,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new Yt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ji,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.premultiply(Ni),this}rotateX(t){return this.rotateOnAxis(nc,t)}rotateY(t){return this.rotateOnAxis(ic,t)}rotateZ(t){return this.rotateOnAxis(sc,t)}translateOnAxis(t,e){return ec.copy(t).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nc,t)}translateY(t){return this.translateOnAxis(ic,t)}translateZ(t){return this.translateOnAxis(sc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_r.copy(t):_r.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Es,_r,this.up):Rn.lookAt(_r,Es,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),Ni.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rc),Fi.child=t,this.dispatchEvent(Fi),Fi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nu),Pa.child=t,this.dispatchEvent(Pa),Pa.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rc),Fi.child=t,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,t,Lu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,Uu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ee.DEFAULT_UP=new N(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var un=new N,Pn=new N,Ia=new N,In=new N,Oi=new N,Bi=new N,oc=new N,Da=new N,La=new N,Ua=new N,Na=new re,Fa=new re,Oa=new re,Dn=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),un.subVectors(t,e),s.cross(un);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){un.subVectors(s,e),Pn.subVectors(n,e),Ia.subVectors(t,e);let o=un.dot(un),a=un.dot(Pn),c=un.dot(Ia),l=Pn.dot(Pn),h=Pn.dot(Ia),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;let u=1/f,p=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,In)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,In.x),c.addScaledVector(o,In.y),c.addScaledVector(a,In.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Na.setScalar(0),Fa.setScalar(0),Oa.setScalar(0),Na.fromBufferAttribute(t,e),Fa.fromBufferAttribute(t,n),Oa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Na,r.x),o.addScaledVector(Fa,r.y),o.addScaledVector(Oa,r.z),o}static isFrontFacing(t,e,n,s){return un.subVectors(n,e),Pn.subVectors(t,e),un.cross(Pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),un.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Oi.subVectors(s,n),Bi.subVectors(r,n),Da.subVectors(t,n);let c=Oi.dot(Da),l=Bi.dot(Da);if(c<=0&&l<=0)return e.copy(n);La.subVectors(t,s);let h=Oi.dot(La),f=Bi.dot(La);if(h>=0&&f<=h)return e.copy(s);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Oi,o);Ua.subVectors(t,r);let p=Oi.dot(Ua),g=Bi.dot(Ua);if(g>=0&&p<=g)return e.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Bi,a);let m=h*g-p*f;if(m<=0&&f-h>=0&&p-g>=0)return oc.subVectors(r,s),a=(f-h)/(f-h+(p-g)),e.copy(s).addScaledVector(oc,a);let d=1/(m+x+u);return o=x*d,a=u*d,e.copy(n).addScaledVector(Oi,o).addScaledVector(Bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},xr={h:0,s:0,l:0};function Ba(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=gl(t,1),e=Kt(e,0,1),n=Kt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ba(o,r,t+1/3),this.g=Ba(o,r,t),this.b=Ba(o,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=we){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){let n=hh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return ee.workingToColorSpace(Ne.copy(this),t),Math.round(Kt(Ne.r*255,0,255))*65536+Math.round(Kt(Ne.g*255,0,255))*256+Math.round(Kt(Ne.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Ne.copy(this),e);let n=Ne.r,s=Ne.g,r=Ne.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=we){ee.workingToColorSpace(Ne.copy(this),t);let e=Ne.r,n=Ne.g,s=Ne.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(xr);let n=Ds(Xn.h,xr.h,e),s=Ds(Xn.s,xr.s,e),r=Ds(Xn.l,xr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ne=new Zt;Zt.NAMES=hh;var Fu=0,Sn=class extends vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=hs(),this.name="",this.type="Material",this.blending=hi,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Or,this.blendDst=Br,this.blendEquation=Zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Or&&(n.blendSrc=this.blendSrc),this.blendDst!==Br&&(n.blendDst=this.blendDst),this.blendEquation!==Zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$a&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},qe=class extends Sn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Te=new N,yr=new Bt,Ou=0,Ge=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ou++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ja,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)yr.fromBufferAttribute(this,e),yr.applyMatrix3(t),this.setXY(e,yr.x,yr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ze(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ja&&(t.usage=this.usage),t}};var fi=class extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var pi=class extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var be=class extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}},Bu=0,rn=new ae,za=new Ee,zi=new N,Qe=new Ve,As=new Ve,Pe=new N,Ye=class i extends vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xl(t)?pi:fi)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,n){return rn.makeTranslation(t,e,n),this.applyMatrix4(rn),this}scale(t,e,n){return rn.makeScale(t,e,n),this.applyMatrix4(rn),this}lookAt(t){return za.lookAt(t),za.updateMatrix(),this.applyMatrix4(za.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new be(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ve);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];As.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(Qe.min,As.min),Qe.expandByPoint(Pe),Pe.addVectors(Qe.max,As.max),Qe.expandByPoint(Pe)):(Qe.expandByPoint(As.min),Qe.expandByPoint(As.max))}Qe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Pe.fromBufferAttribute(a,l),c&&(zi.fromBufferAttribute(t,l),Pe.add(zi)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let S=0;S<n.count;S++)a[S]=new N,c[S]=new N;let l=new N,h=new N,f=new N,u=new Bt,p=new Bt,g=new Bt,x=new N,m=new N;function d(S,_,y){l.fromBufferAttribute(n,S),h.fromBufferAttribute(n,_),f.fromBufferAttribute(n,y),u.fromBufferAttribute(r,S),p.fromBufferAttribute(r,_),g.fromBufferAttribute(r,y),h.sub(l),f.sub(l),p.sub(u),g.sub(u);let R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(R),m.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),a[S].add(x),a[_].add(x),a[y].add(x),c[S].add(m),c[_].add(m),c[y].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let S=0,_=A.length;S<_;++S){let y=A[S],R=y.start,C=y.count;for(let I=R,L=R+C;I<L;I+=3)d(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let E=new N,v=new N,P=new N,w=new N;function T(S){P.fromBufferAttribute(s,S),w.copy(P);let _=a[S];E.copy(_),E.sub(P.multiplyScalar(P.dot(_))).normalize(),v.crossVectors(w,_);let R=v.dot(c[S])<0?-1:1;o.setXYZW(S,E.x,E.y,E.z,R)}for(let S=0,_=A.length;S<_;++S){let y=A[S],R=y.start,C=y.count;for(let I=R,L=R+C;I<L;I+=3)T(t.getX(I+0)),T(t.getX(I+1)),T(t.getX(I+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,f=new N;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,f=a.normalized,u=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let d=0;d<h;d++)u[g++]=l[p++]}return new Ge(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){let u=l[h],p=t(u,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let p=l[f];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ac=new ae,ai=new bn,vr=new Nn,lc=new N,Mr=new N,br=new N,Sr=new N,ka=new N,Tr=new N,cc=new N,wr=new N,he=class extends Ee{constructor(t=new Ye,e=new qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Tr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],f=r[c];h!==0&&(ka.fromBufferAttribute(f,t),o?Tr.addScaledVector(ka,h):Tr.addScaledVector(ka.sub(e),h))}e.add(Tr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(vr.containsPoint(ai.origin)===!1&&(ai.intersectSphere(vr,lc)===null||ai.origin.distanceToSquared(lc)>(t.far-t.near)**2))&&(ac.copy(r).invert(),ai.copy(t.ray).applyMatrix4(ac),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=A,P=E;v<P;v+=3){let w=a.getX(v),T=a.getX(v+1),S=a.getX(v+2);s=Er(this,d,t,n,l,h,f,w,T,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let A=a.getX(m),E=a.getX(m+1),v=a.getX(m+2);s=Er(this,o,t,n,l,h,f,A,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),E=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=A,P=E;v<P;v+=3){let w=v,T=v+1,S=v+2;s=Er(this,d,t,n,l,h,f,w,T,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let A=m,E=m+1,v=m+2;s=Er(this,o,t,n,l,h,f,A,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function zu(i,t,e,n,s,r,o,a){let c;if(t.side===Le?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Un,a),c===null)return null;wr.copy(a),wr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(wr);return l<e.near||l>e.far?null:{distance:l,point:wr.clone(),object:i}}function Er(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Mr),i.getVertexPosition(c,br),i.getVertexPosition(l,Sr);let h=zu(i,t,e,n,Mr,br,Sr,cc);if(h){let f=new N;Dn.getBarycoord(cc,Mr,br,Sr,f),s&&(h.uv=Dn.getInterpolatedAttribute(s,a,c,l,f,new Bt)),r&&(h.uv1=Dn.getInterpolatedAttribute(r,a,c,l,f,new Bt)),o&&(h.normal=Dn.getInterpolatedAttribute(o,a,c,l,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new N,materialIndex:0};Dn.getNormal(Mr,br,Sr,u.normal),h.face=u,h.barycoord=f}return h}var an=class i extends Ye{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],f=[],u=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new be(l,3)),this.setAttribute("normal",new be(h,3)),this.setAttribute("uv",new be(f,2));function g(x,m,d,A,E,v,P,w,T,S,_){let y=v/T,R=P/S,C=v/2,I=P/2,L=w/2,O=T+1,F=S+1,H=0,V=0,W=new N;for(let j=0;j<F;j++){let nt=j*R-I;for(let it=0;it<O;it++){let vt=it*y-C;W[x]=vt*A,W[m]=nt*E,W[d]=L,l.push(W.x,W.y,W.z),W[x]=0,W[m]=0,W[d]=w>0?1:-1,h.push(W.x,W.y,W.z),f.push(it/T),f.push(1-j/S),H+=1}}for(let j=0;j<S;j++)for(let nt=0;nt<T;nt++){let it=u+nt+O*j,vt=u+nt+O*(j+1),Et=u+(nt+1)+O*(j+1),yt=u+(nt+1)+O*j;c.push(it,vt,yt),c.push(vt,Et,yt),V+=6}a.addGroup(p,V,_),p+=V,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Mi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Oe(i){let t={};for(let e=0;e<i.length;e++){let n=Mi(i[e]);for(let s in n)t[s]=n[s]}return t}function ku(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var uh={clone:Mi,merge:Oe},Vu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pn=class extends Sn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vu,this.fragmentShader=Hu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mi(t.uniforms),this.uniformsGroups=ku(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Os=class extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},qn=new N,hc=new Bt,uc=new Bt,De=class extends Os{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Xi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(Xi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qn.x,qn.y).multiplyScalar(-t/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-t/qn.z)}getViewSize(t,e){return this.getViewBounds(t,hc,uc),e.subVectors(uc,hc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Xi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ki=-90,Vi=1,Wr=class extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new De(ki,Vi,t,e);s.layers=this.layers,this.add(s);let r=new De(ki,Vi,t,e);r.layers=this.layers,this.add(r);let o=new De(ki,Vi,t,e);o.layers=this.layers,this.add(o);let a=new De(ki,Vi,t,e);a.layers=this.layers,this.add(a);let c=new De(ki,Vi,t,e);c.layers=this.layers,this.add(c);let l=new De(ki,Vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Bs=class extends Fe{constructor(t=[],e=yi,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Xr=class extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Bs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new an(5,5,5),r=new pn({name:"CubemapFromEquirect",uniforms:Mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:Fn});r.uniforms.tEquirect.value=e;let o=new he(s,r),a=e.minFilter;return e.minFilter===ei&&(e.minFilter=fn),new Wr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ie=class extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gu={type:"move"},Qi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ie,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ie,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ie,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gu)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ie;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var mi=class extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var qr=class extends Fe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=We,h=We,f,u){super(null,o,a,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zs=class extends Ge{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Hi=new ae,dc=new ae,Ar=[],fc=new Ve,Wu=new ae,Cs=new he,Rs=new Nn,Jn=class extends he{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Wu)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ve),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hi),fc.copy(t.boundingBox).applyMatrix4(Hi),this.boundingBox.union(fc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hi),Rs.copy(t.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(Rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rs.copy(this.boundingSphere),Rs.applyMatrix4(n),t.ray.intersectsSphere(Rs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hi),dc.multiplyMatrices(n,Hi),Cs.matrixWorld=dc,Cs.raycast(t,Ar);for(let o=0,a=Ar.length;o<a;o++){let c=Ar[o];c.instanceId=r,c.object=this,e.push(c)}Ar.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new zs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new qr(new Float32Array(s*this.count),s,this.count,Ao,_n));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Va=new N,Xu=new N,qu=new Yt,ke=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Va.subVectors(n,e).cross(Xu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Va),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||qu.getNormalMatrix(t),s=this.coplanarPoint(Va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},li=new Nn,Yu=new Bt(.5,.5),Cr=new N,ts=class{constructor(t=new ke,e=new ke,n=new ke,s=new ke,r=new ke,o=new ke){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=dn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],p=r[7],g=r[8],x=r[9],m=r[10],d=r[11],A=r[12],E=r[13],v=r[14],P=r[15];if(s[0].setComponents(l-o,p-h,d-g,P-A).normalize(),s[1].setComponents(l+o,p+h,d+g,P+A).normalize(),s[2].setComponents(l+a,p+f,d+x,P+E).normalize(),s[3].setComponents(l-a,p-f,d-x,P-E).normalize(),n)s[4].setComponents(c,u,m,v).normalize(),s[5].setComponents(l-c,p-u,d-m,P-v).normalize();else if(s[4].setComponents(l-c,p-u,d-m,P-v).normalize(),e===dn)s[5].setComponents(l+c,p+u,d+m,P+v).normalize();else if(e===Ns)s[5].setComponents(c,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);let e=Yu.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Cr.x=s.normal.x>0?t.max.x:t.min.x,Cr.y=s.normal.y>0?t.max.y:t.min.y,Cr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var es=class extends Sn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Yr=new N,Zr=new N,pc=new ae,Ps=new bn,Rr=new Nn,Ha=new N,mc=new N,$r=class extends Ee{constructor(t=new Ye,e=new es){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Yr.fromBufferAttribute(e,s-1),Zr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Yr.distanceTo(Zr);t.setAttribute("lineDistance",new be(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),Rr.radius+=r,t.ray.intersectsSphere(Rr)===!1)return;pc.copy(s).invert(),Ps.copy(t.ray).applyMatrix4(pc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){let d=h.getX(x),A=h.getX(x+1),E=Pr(this,t,Ps,c,d,A,x);E&&e.push(E)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),d=Pr(this,t,Ps,c,x,m,g-1);d&&e.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){let d=Pr(this,t,Ps,c,x,x+1,x);d&&e.push(d)}if(this.isLineLoop){let x=Pr(this,t,Ps,c,g-1,p,g-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Pr(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(Yr.fromBufferAttribute(a,s),Zr.fromBufferAttribute(a,r),e.distanceSqToSegment(Yr,Zr,Ha,mc)>n)return;Ha.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ha);if(!(l<t.near||l>t.far))return{distance:l,point:mc.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var gc=new N,_c=new N,ks=class extends $r{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)gc.fromBufferAttribute(e,s),_c.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+gc.distanceTo(_c);t.setAttribute("lineDistance",new be(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var gi=class extends Fe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Vs=class extends Fe{constructor(t,e,n=ni,s,r,o,a=We,c=We,l,h=Yi,f=1){if(h!==Yi&&h!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ki(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Hs=class extends Fe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var Gs=class i extends Ye{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],p=[],g=0,x=[],m=n/2,d=0;A(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new be(f,3)),this.setAttribute("normal",new be(u,3)),this.setAttribute("uv",new be(p,2));function A(){let v=new N,P=new N,w=0,T=(e-t)/n;for(let S=0;S<=r;S++){let _=[],y=S/r,R=y*(e-t)+t;for(let C=0;C<=s;C++){let I=C/s,L=I*c+a,O=Math.sin(L),F=Math.cos(L);P.x=R*O,P.y=-y*n+m,P.z=R*F,f.push(P.x,P.y,P.z),v.set(O,T,F).normalize(),u.push(v.x,v.y,v.z),p.push(I,1-y),_.push(g++)}x.push(_)}for(let S=0;S<s;S++)for(let _=0;_<r;_++){let y=x[_][S],R=x[_+1][S],C=x[_+1][S+1],I=x[_][S+1];(t>0||_!==0)&&(h.push(y,R,I),w+=3),(e>0||_!==r-1)&&(h.push(R,C,I),w+=3)}l.addGroup(d,w,0),d+=w}function E(v){let P=g,w=new Bt,T=new N,S=0,_=v===!0?t:e,y=v===!0?1:-1;for(let C=1;C<=s;C++)f.push(0,m*y,0),u.push(0,y,0),p.push(.5,.5),g++;let R=g;for(let C=0;C<=s;C++){let L=C/s*c+a,O=Math.cos(L),F=Math.sin(L);T.x=_*F,T.y=m*y,T.z=_*O,f.push(T.x,T.y,T.z),u.push(0,y,0),w.x=O*.5+.5,w.y=F*.5*y+.5,p.push(w.x,w.y),g++}for(let C=0;C<s;C++){let I=P+C,L=R+C;v===!0?h.push(L,L+1,I):h.push(L+1,L,I),S+=3}l.addGroup(d,S,v===!0?1:2),d+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Jr=class i extends Ye{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new be(r,3)),this.setAttribute("normal",new be(r.slice(),3)),this.setAttribute("uv",new be(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(A){let E=new N,v=new N,P=new N;for(let w=0;w<e.length;w+=3)p(e[w+0],E),p(e[w+1],v),p(e[w+2],P),c(E,v,P,A)}function c(A,E,v,P){let w=P+1,T=[];for(let S=0;S<=w;S++){T[S]=[];let _=A.clone().lerp(v,S/w),y=E.clone().lerp(v,S/w),R=w-S;for(let C=0;C<=R;C++)C===0&&S===w?T[S][C]=_:T[S][C]=_.clone().lerp(y,C/R)}for(let S=0;S<w;S++)for(let _=0;_<2*(w-S)-1;_++){let y=Math.floor(_/2);_%2===0?(u(T[S][y+1]),u(T[S+1][y]),u(T[S][y])):(u(T[S][y+1]),u(T[S+1][y+1]),u(T[S+1][y]))}}function l(A){let E=new N;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(A),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let A=new N;for(let E=0;E<r.length;E+=3){A.x=r[E+0],A.y=r[E+1],A.z=r[E+2];let v=m(A)/2/Math.PI+.5,P=d(A)/Math.PI+.5;o.push(v,1-P)}g(),f()}function f(){for(let A=0;A<o.length;A+=6){let E=o[A+0],v=o[A+2],P=o[A+4],w=Math.max(E,v,P),T=Math.min(E,v,P);w>.9&&T<.1&&(E<.2&&(o[A+0]+=1),v<.2&&(o[A+2]+=1),P<.2&&(o[A+4]+=1))}}function u(A){r.push(A.x,A.y,A.z)}function p(A,E){let v=A*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function g(){let A=new N,E=new N,v=new N,P=new N,w=new Bt,T=new Bt,S=new Bt;for(let _=0,y=0;_<r.length;_+=9,y+=6){A.set(r[_+0],r[_+1],r[_+2]),E.set(r[_+3],r[_+4],r[_+5]),v.set(r[_+6],r[_+7],r[_+8]),w.set(o[y+0],o[y+1]),T.set(o[y+2],o[y+3]),S.set(o[y+4],o[y+5]),P.copy(A).add(E).add(v).divideScalar(3);let R=m(P);x(w,y+0,A,R),x(T,y+2,E,R),x(S,y+4,v,R)}}function x(A,E,v,P){P<0&&A.x===1&&(o[E]=A.x-1),v.x===0&&v.z===0&&(o[E]=P/2/Math.PI+.5)}function m(A){return Math.atan2(A.z,-A.x)}function d(A){return Math.atan2(-A.y,Math.sqrt(A.x*A.x+A.z*A.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Ir=new N,Dr=new N,Ga=new N,Lr=new Dn,Ws=class extends Ye{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Xi*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],f=new Array(3),u={},p=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:x,b:m,c:d}=Lr;if(x.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),d.fromBufferAttribute(a,l[2]),Lr.getNormal(Ga),f[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let A=0;A<3;A++){let E=(A+1)%3,v=f[A],P=f[E],w=Lr[h[A]],T=Lr[h[E]],S=`${v}_${P}`,_=`${P}_${v}`;_ in u&&u[_]?(Ga.dot(u[_].normal)<=r&&(p.push(w.x,w.y,w.z),p.push(T.x,T.y,T.z)),u[_]=null):S in u||(u[S]={index0:l[A],index1:l[E],normal:Ga.clone()})}}for(let g in u)if(u[g]){let{index0:x,index1:m}=u[g];Ir.fromBufferAttribute(a,x),Dr.fromBufferAttribute(a,m),p.push(Ir.x,Ir.y,Ir.z),p.push(Dr.x,Dr.y,Dr.z)}this.setAttribute("position",new be(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Xs=class i extends Jr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var _i=class i extends Ye{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,u=e/c,p=[],g=[],x=[],m=[];for(let d=0;d<h;d++){let A=d*u-o;for(let E=0;E<l;E++){let v=E*f-r;g.push(v,-A,0),x.push(0,0,1),m.push(E/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let A=0;A<a;A++){let E=A+l*d,v=A+l*(d+1),P=A+1+l*(d+1),w=A+1+l*d;p.push(E,v,w),p.push(v,P,w)}this.setIndex(p),this.setAttribute("position",new be(g,3)),this.setAttribute("normal",new be(x,3)),this.setAttribute("uv",new be(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var mn=class extends Sn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ra,this.normalScale=new Bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ye=class extends Sn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ra,this.normalScale=new Bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Kr=class extends Sn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},jr=class extends Sn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ur(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Zu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var xi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qr=class extends xi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qa,endingEnd:qa}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ya:r=t,a=2*e-n;break;case Za:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ya:o=t,c=2*n-e;break;case Za:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,d=-u*m+2*u*x-u*g,A=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,E=(-1-p)*m+(1.5+p)*x+.5*g,v=p*m-p*x;for(let P=0;P!==a;++P)r[P]=d*o[h+P]+A*o[l+P]+E*o[c+P]+v*o[f+P];return r}},to=class extends xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),f=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*f+o[c+u]*h;return r}},eo=class extends xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},tn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ur(e,this.TimeBufferType),this.values=Ur(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ur(t.times,Array),values:Ur(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new eo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new to(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Qr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ls:e=this.InterpolantFactoryMethodDiscrete;break;case kr:e=this.InterpolantFactoryMethodLinear;break;case Nr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ls;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return Nr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Zu(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Nr,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let f=a*n,u=f-n,p=f+n;for(let g=0;g!==n;++g){let x=e[f+g];if(x!==e[u+g]||x!==e[p+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,u=o*n;for(let p=0;p!==n;++p)e[u+p]=e[f+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};tn.prototype.ValueTypeName="";tn.prototype.TimeBufferType=Float32Array;tn.prototype.ValueBufferType=Float32Array;tn.prototype.DefaultInterpolation=kr;var Kn=class extends tn{constructor(t,e,n){super(t,e,n)}};Kn.prototype.ValueTypeName="bool";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=Ls;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends tn{constructor(t,e,n,s){super(t,e,n,s)}};no.prototype.ValueTypeName="color";var io=class extends tn{constructor(t,e,n,s){super(t,e,n,s)}};io.prototype.ValueTypeName="number";var so=class extends xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Xe.slerpFlat(r,0,o,l-a,o,l,c);return r}},qs=class extends tn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new so(this.times,this.values,this.getValueSize(),t)}};qs.prototype.ValueTypeName="quaternion";qs.prototype.InterpolantFactoryMethodSmooth=void 0;var jn=class extends tn{constructor(t,e,n){super(t,e,n)}};jn.prototype.ValueTypeName="string";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=Ls;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends tn{constructor(t,e,n,s){super(t,e,n,s)}};ro.prototype.ValueTypeName="vector";var Fr={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},oo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let p=l[f],g=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},dh=new oo,ns=class{constructor(t){this.manager=t!==void 0?t:dh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ns.DEFAULT_MATERIAL_NAME="__DEFAULT";var Gi=new WeakMap,ao=class extends ns{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Fr.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let f=Gi.get(o);f===void 0&&(f=[],Gi.set(o,f)),f.push({onLoad:e,onError:s})}return o}let a=$i("img");function c(){h(),e&&e(this);let f=Gi.get(this)||[];for(let u=0;u<f.length;u++){let p=f[u];p.onLoad&&p.onLoad(this)}Gi.delete(this),r.manager.itemEnd(t)}function l(f){h(),s&&s(f),Fr.remove(`image:${t}`);let u=Gi.get(this)||[];for(let p=0;p<u.length;p++){let g=u[p];g.onError&&g.onError(f)}Gi.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Fr.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}};var is=class extends ns{constructor(t){super(t)}load(t,e,n,s){let r=new Fe,o=new ao(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},ss=class extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ys=class extends ss{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Wa=new ae,xc=new N,yc=new N,lo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Bt(512,512),this.mapType=gn,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ts,this._frameExtents=new Bt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;xc.setFromMatrixPosition(t.matrixWorld),e.position.copy(xc),yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yc),e.updateMatrixWorld(),Wa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var vc=new ae,Is=new N,Xa=new N,Ka=class extends lo{constructor(){super(new De(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Bt(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Is.setFromMatrixPosition(t.matrixWorld),n.position.copy(Is),Xa.copy(n.position),Xa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Xa),n.updateMatrixWorld(),s.makeTranslation(-Is.x,-Is.y,-Is.z),vc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vc,n.coordinateSystem,n.reversedDepth)}},Zs=class extends ss{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ka}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},$s=class extends Os{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ja=class extends lo{constructor(){super(new $s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Js=class extends ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new ja}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var co=class extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var vl="\\[\\]\\.:\\/",$u=new RegExp("["+vl+"]","g"),Ml="[^"+vl+"]",Ju="[^"+vl.replace("\\.","")+"]",Ku=/((?:WC+[\/:])*)/.source.replace("WC",Ml),ju=/(WCOD+)?/.source.replace("WCOD",Ju),Qu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ml),td=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ml),ed=new RegExp("^"+Ku+ju+Qu+td+"$"),nd=["material","materials","bones","map"],Qa=class{constructor(t,e,n){let s=n||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},_e=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($u,"")}static parseTrackName(t){let e=ed.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);nd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=Qa;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var o_=new Float32Array(1);var Mc=new ae,Ks=class{constructor(t,e,n=0,s=1/0){this.ray=new bn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ji,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Mc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mc),this}intersectObject(t,e=!0,n=[]){return tl(t,this,n,e),n.sort(bc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)tl(t[s],this,n,e);return n.sort(bc),n}};function bc(i,t){return i.distance-t.distance}function tl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)tl(r[o],t,e,!0)}}var rs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var js=class extends vn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function bl(i,t,e,n){let s=id(n);switch(e){case ul:return i*t;case Ao:return i*t/s.components*s.byteLength;case Co:return i*t/s.components*s.byteLength;case fl:return i*t*2/s.components*s.byteLength;case Ro:return i*t*2/s.components*s.byteLength;case dl:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case Po:return i*t*4/s.components*s.byteLength;case er:case nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ir:case sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Do:case Uo:return Math.max(i,16)*Math.max(t,8)/4;case Io:case Lo:return Math.max(i,8)*Math.max(t,8)/2;case No:case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ko:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Go:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case $o:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ko:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case jo:case Qo:case ta:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ea:case na:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ia:case sa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function id(i){switch(i){case gn:case al:return{byteLength:1,components:1};case os:case ll:case as:return{byteLength:2,components:1};case wo:case Eo:return{byteLength:2,components:4};case ni:case To:case _n:return{byteLength:4,components:1};case cl:case hl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Fh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function rd(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){let h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){let g=f[u],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,f[u]=x)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){let x=f[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ad=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ud=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_d=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Rd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Id=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Dd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ld=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ud=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Od=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$d=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,jd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Qd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ef=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,of=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,af=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,df=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ff=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_f=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,If=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Df=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Of=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Gf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$f=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ep=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,op=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ap=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,up=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_p=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ep=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ap=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ip=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Op=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:od,alphahash_pars_fragment:ad,alphamap_fragment:ld,alphamap_pars_fragment:cd,alphatest_fragment:hd,alphatest_pars_fragment:ud,aomap_fragment:dd,aomap_pars_fragment:fd,batching_pars_vertex:pd,batching_vertex:md,begin_vertex:gd,beginnormal_vertex:_d,bsdfs:xd,iridescence_fragment:yd,bumpmap_pars_fragment:vd,clipping_planes_fragment:Md,clipping_planes_pars_fragment:bd,clipping_planes_pars_vertex:Sd,clipping_planes_vertex:Td,color_fragment:wd,color_pars_fragment:Ed,color_pars_vertex:Ad,color_vertex:Cd,common:Rd,cube_uv_reflection_fragment:Pd,defaultnormal_vertex:Id,displacementmap_pars_vertex:Dd,displacementmap_vertex:Ld,emissivemap_fragment:Ud,emissivemap_pars_fragment:Nd,colorspace_fragment:Fd,colorspace_pars_fragment:Od,envmap_fragment:Bd,envmap_common_pars_fragment:zd,envmap_pars_fragment:kd,envmap_pars_vertex:Vd,envmap_physical_pars_fragment:jd,envmap_vertex:Hd,fog_vertex:Gd,fog_pars_vertex:Wd,fog_fragment:Xd,fog_pars_fragment:qd,gradientmap_pars_fragment:Yd,lightmap_pars_fragment:Zd,lights_lambert_fragment:$d,lights_lambert_pars_fragment:Jd,lights_pars_begin:Kd,lights_toon_fragment:Qd,lights_toon_pars_fragment:tf,lights_phong_fragment:ef,lights_phong_pars_fragment:nf,lights_physical_fragment:sf,lights_physical_pars_fragment:rf,lights_fragment_begin:of,lights_fragment_maps:af,lights_fragment_end:lf,logdepthbuf_fragment:cf,logdepthbuf_pars_fragment:hf,logdepthbuf_pars_vertex:uf,logdepthbuf_vertex:df,map_fragment:ff,map_pars_fragment:pf,map_particle_fragment:mf,map_particle_pars_fragment:gf,metalnessmap_fragment:_f,metalnessmap_pars_fragment:xf,morphinstance_vertex:yf,morphcolor_vertex:vf,morphnormal_vertex:Mf,morphtarget_pars_vertex:bf,morphtarget_vertex:Sf,normal_fragment_begin:Tf,normal_fragment_maps:wf,normal_pars_fragment:Ef,normal_pars_vertex:Af,normal_vertex:Cf,normalmap_pars_fragment:Rf,clearcoat_normal_fragment_begin:Pf,clearcoat_normal_fragment_maps:If,clearcoat_pars_fragment:Df,iridescence_pars_fragment:Lf,opaque_fragment:Uf,packing:Nf,premultiplied_alpha_fragment:Ff,project_vertex:Of,dithering_fragment:Bf,dithering_pars_fragment:zf,roughnessmap_fragment:kf,roughnessmap_pars_fragment:Vf,shadowmap_pars_fragment:Hf,shadowmap_pars_vertex:Gf,shadowmap_vertex:Wf,shadowmask_pars_fragment:Xf,skinbase_vertex:qf,skinning_pars_vertex:Yf,skinning_vertex:Zf,skinnormal_vertex:$f,specularmap_fragment:Jf,specularmap_pars_fragment:Kf,tonemapping_fragment:jf,tonemapping_pars_fragment:Qf,transmission_fragment:tp,transmission_pars_fragment:ep,uv_pars_fragment:np,uv_pars_vertex:ip,uv_vertex:sp,worldpos_vertex:rp,background_vert:op,background_frag:ap,backgroundCube_vert:lp,backgroundCube_frag:cp,cube_vert:hp,cube_frag:up,depth_vert:dp,depth_frag:fp,distanceRGBA_vert:pp,distanceRGBA_frag:mp,equirect_vert:gp,equirect_frag:_p,linedashed_vert:xp,linedashed_frag:yp,meshbasic_vert:vp,meshbasic_frag:Mp,meshlambert_vert:bp,meshlambert_frag:Sp,meshmatcap_vert:Tp,meshmatcap_frag:wp,meshnormal_vert:Ep,meshnormal_frag:Ap,meshphong_vert:Cp,meshphong_frag:Rp,meshphysical_vert:Pp,meshphysical_frag:Ip,meshtoon_vert:Dp,meshtoon_frag:Lp,points_vert:Up,points_frag:Np,shadow_vert:Fp,shadow_frag:Op,sprite_vert:Bp,sprite_frag:zp},xt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new Bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new Bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},En={basic:{uniforms:Oe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Oe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Oe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Oe([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Oe([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Oe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Oe([xt.points,xt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Oe([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Oe([xt.common,xt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Oe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Oe([xt.sprite,xt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Oe([xt.common,xt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Oe([xt.lights,xt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};En.physical={uniforms:Oe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new Bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new Bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new Bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var oa={r:0,b:0,g:0},bi=new on,kp=new ae;function Vp(i,t,e,n,s,r,o){let a=new Zt(0),c=r===!0?0:1,l,h,f=null,u=0,p=null;function g(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?e:t).get(v)),v}function x(E){let v=!1,P=g(E);P===null?d(a,c):P&&P.isColor&&(d(P,1),v=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,v){let P=g(v);P&&(P.isCubeTexture||P.mapping===Qs)?(h===void 0&&(h=new he(new an(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:Mi(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,T,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bi.copy(v.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),h.material.uniforms.envMap.value=P,h.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(kp.makeRotationFromEuler(bi)),h.material.toneMapped=ee.getTransfer(P.colorSpace)!==oe,(f!==P||u!==P.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=P,u=P.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new he(new _i(2,2),new pn({name:"BackgroundMaterial",uniforms:Mi(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ee.getTransfer(P.colorSpace)!==oe,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(f!==P||u!==P.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=P,u=P.version,p=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function d(E,v){E.getRGB(oa,yl(i)),n.buffers.color.setClear(oa.r,oa.g,oa.b,v,o)}function A(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),c=v,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,d(a,c)},render:x,addToRenderList:m,dispose:A}}function Hp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(y,R,C,I,L){let O=!1,F=f(I,C,R);r!==F&&(r=F,l(r.object)),O=p(y,I,C,L),O&&g(y,I,C,L),L!==null&&t.update(L,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,v(y,R,C,I),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(L).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function f(y,R,C){let I=C.wireframe===!0,L=n[y.id];L===void 0&&(L={},n[y.id]=L);let O=L[R.id];O===void 0&&(O={},L[R.id]=O);let F=O[I];return F===void 0&&(F=u(c()),O[I]=F),F}function u(y){let R=[],C=[],I=[];for(let L=0;L<e;L++)R[L]=0,C[L]=0,I[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:C,attributeDivisors:I,object:y,attributes:{},index:null}}function p(y,R,C,I){let L=r.attributes,O=R.attributes,F=0,H=C.getAttributes();for(let V in H)if(H[V].location>=0){let j=L[V],nt=O[V];if(nt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(nt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(nt=y.instanceColor)),j===void 0||j.attribute!==nt||nt&&j.data!==nt.data)return!0;F++}return r.attributesNum!==F||r.index!==I}function g(y,R,C,I){let L={},O=R.attributes,F=0,H=C.getAttributes();for(let V in H)if(H[V].location>=0){let j=O[V];j===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(j=y.instanceColor));let nt={};nt.attribute=j,j&&j.data&&(nt.data=j.data),L[V]=nt,F++}r.attributes=L,r.attributesNum=F,r.index=I}function x(){let y=r.newAttributes;for(let R=0,C=y.length;R<C;R++)y[R]=0}function m(y){d(y,0)}function d(y,R){let C=r.newAttributes,I=r.enabledAttributes,L=r.attributeDivisors;C[y]=1,I[y]===0&&(i.enableVertexAttribArray(y),I[y]=1),L[y]!==R&&(i.vertexAttribDivisor(y,R),L[y]=R)}function A(){let y=r.newAttributes,R=r.enabledAttributes;for(let C=0,I=R.length;C<I;C++)R[C]!==y[C]&&(i.disableVertexAttribArray(C),R[C]=0)}function E(y,R,C,I,L,O,F){F===!0?i.vertexAttribIPointer(y,R,C,L,O):i.vertexAttribPointer(y,R,C,I,L,O)}function v(y,R,C,I){x();let L=I.attributes,O=C.getAttributes(),F=R.defaultAttributeValues;for(let H in O){let V=O[H];if(V.location>=0){let W=L[H];if(W===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(W=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(W=y.instanceColor)),W!==void 0){let j=W.normalized,nt=W.itemSize,it=t.get(W);if(it===void 0)continue;let vt=it.buffer,Et=it.type,yt=it.bytesPerElement,$=Et===i.INT||Et===i.UNSIGNED_INT||W.gpuType===To;if(W.isInterleavedBufferAttribute){let Q=W.data,st=Q.stride,dt=W.offset;if(Q.isInstancedInterleavedBuffer){for(let lt=0;lt<V.locationSize;lt++)d(V.location+lt,Q.meshPerAttribute);y.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let lt=0;lt<V.locationSize;lt++)m(V.location+lt);i.bindBuffer(i.ARRAY_BUFFER,vt);for(let lt=0;lt<V.locationSize;lt++)E(V.location+lt,nt/V.locationSize,Et,j,st*yt,(dt+nt/V.locationSize*lt)*yt,$)}else{if(W.isInstancedBufferAttribute){for(let Q=0;Q<V.locationSize;Q++)d(V.location+Q,W.meshPerAttribute);y.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Q=0;Q<V.locationSize;Q++)m(V.location+Q);i.bindBuffer(i.ARRAY_BUFFER,vt);for(let Q=0;Q<V.locationSize;Q++)E(V.location+Q,nt/V.locationSize,Et,j,nt*yt,nt/V.locationSize*Q*yt,$)}}else if(F!==void 0){let j=F[H];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(V.location,j);break;case 3:i.vertexAttrib3fv(V.location,j);break;case 4:i.vertexAttrib4fv(V.location,j);break;default:i.vertexAttrib1fv(V.location,j)}}}}A()}function P(){S();for(let y in n){let R=n[y];for(let C in R){let I=R[C];for(let L in I)h(I[L].object),delete I[L];delete R[C]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;let R=n[y.id];for(let C in R){let I=R[C];for(let L in I)h(I[L].object),delete I[L];delete R[C]}delete n[y.id]}function T(y){for(let R in n){let C=n[R];if(C[y.id]===void 0)continue;let I=C[y.id];for(let L in I)h(I[L].object),delete I[L];delete C[y.id]}}function S(){_(),o=!0,r!==s&&(r=s,l(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:S,resetDefaultState:_,dispose:P,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:A}}function Gp(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function a(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g];e.update(p,n,1)}function c(l,h,f,u){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,f);let g=0;for(let x=0;x<f;x++)g+=h[x]*u[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Wp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==ln&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let S=T===as&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==gn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==_n&&!S)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:A,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:P,maxSamples:w}}function Xp(i){let t=this,e=null,n=0,s=!1,r=!1,o=new ke,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let p=f.length!==0||u||n!==0||s;return s=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,p){let g=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let A=r?0:n,E=A*4,v=d.clippingState||null;c.value=v,v=h(g,u,E,p);for(let P=0;P!==E;++P)v[P]=e[P];d.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,p,g){let x=f!==null?f.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let d=p+x*4,A=u.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,v=p;E!==x;++E,v+=4)o.copy(f[E]).applyMatrix4(A,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function qp(i){let t=new WeakMap;function e(o,a){return a===Mo?o.mapping=yi:a===bo&&(o.mapping=vi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Mo||a===bo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Xr(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ds=4,fh=[.125,.215,.35,.446,.526,.582],wi=20,Sl=new $s,ph=new Zt,Tl=null,wl=0,El=0,Al=!1,Ti=(1+Math.sqrt(5))/2,us=1/Ti,mh=[new N(-Ti,us,0),new N(Ti,us,0),new N(-us,0,Ti),new N(us,0,Ti),new N(0,Ti,-us),new N(0,Ti,us),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Yp=new N,ps=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Yp}=r;Tl=this._renderer.getRenderTarget(),wl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),Al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Tl,wl,El),this._renderer.xr.enabled=Al,t.scissorTest=!1,aa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yi||t.mapping===vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Tl=this._renderer.getRenderTarget(),wl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),Al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:as,format:ln,colorSpace:di,depthBuffer:!1},s=gh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zp(r)),this._blurMaterial=$p(r,t,e)}return s}_compileMaterial(t){let e=new he(this._lodPlanes[0],t);this._renderer.compile(e,Sl)}_sceneToCubeUV(t,e,n,s,r){let c=new De(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(ph),f.toneMapping=On,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null));let x=new qe({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),m=new he(new an,x),d=!1,A=t.background;A?A.isColor&&(x.color.copy(A),t.background=null,d=!0):(x.color.copy(ph),d=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):v===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));let P=this._cubeSize;aa(s,v*P,E>2?P:0,P,P),f.setRenderTarget(s),d&&f.render(m,c),f.render(t,c)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=u,t.background=A}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===yi||t.mapping===vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_h());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new he(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;aa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Sl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=mh[(s-r-1)%mh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,f=new he(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*wi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):wi;m>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);let d=[],A=0;for(let T=0;T<wi;++T){let S=T/x,_=Math.exp(-S*S/2);d.push(_),T===0?A+=_:T<m&&(A+=2*_)}for(let T=0;T<d.length;T++)d[T]=d[T]/A;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=d,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-n;let v=this._sizeLods[s],P=3*v*(s>E-ds?s-E+ds:0),w=4*(this._cubeSize-v);aa(e,P,w,3*v,2*v),c.setRenderTarget(e),c.render(f,Sl)}};function Zp(i){let t=[],e=[],n=[],s=i,r=i-ds+1+fh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ds?c=fh[o-i+ds-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,x=3,m=2,d=1,A=new Float32Array(x*g*p),E=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let w=0;w<p;w++){let T=w%3*2/3-1,S=w>2?0:-1,_=[T,S,0,T+2/3,S,0,T+2/3,S+1,0,T,S,0,T+2/3,S+1,0,T,S+1,0];A.set(_,x*g*w),E.set(u,m*g*w);let y=[w,w,w,w,w,w];v.set(y,d*g*w)}let P=new Ye;P.setAttribute("position",new Ge(A,x)),P.setAttribute("uv",new Ge(E,m)),P.setAttribute("faceIndex",new Ge(v,d)),t.push(P),s>ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function gh(i,t,e){let n=new Mn(i,t,e);return n.texture.mapping=Qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function aa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function $p(i,t,e){let n=new Float32Array(wi),s=new N(0,1,0);return new pn({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function _h(){return new pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function xh(){return new pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Mo||c===bo,h=c===yi||c===vi;if(l||h){let f=t.get(a),u=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new ps(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new ps(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Kp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ji("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function jp(i,t,e,n){let s={},r=new WeakMap;function o(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(f){let u=f.attributes;for(let p in u)t.update(u[p],i.ARRAY_BUFFER)}function l(f){let u=[],p=f.index,g=f.attributes.position,x=0;if(p!==null){let A=p.array;x=p.version;for(let E=0,v=A.length;E<v;E+=3){let P=A[E+0],w=A[E+1],T=A[E+2];u.push(P,w,w,T,T,P)}}else if(g!==void 0){let A=g.array;x=g.version;for(let E=0,v=A.length/3-1;E<v;E+=3){let P=E+0,w=E+1,T=E+2;u.push(P,w,w,T,T,P)}}else return;let m=new(xl(u)?pi:fi)(u,1);m.version=x;let d=r.get(f);d&&t.remove(d),r.set(f,m)}function h(f){let u=r.get(f);if(u){let p=f.index;p!==null&&u.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function Qp(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,p){i.drawElements(n,p,r,u*o),e.update(p,n,1)}function l(u,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,u*o,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function f(u,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<u.length;d++)l(u[d]/o,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,x,0,g);let d=0;for(let A=0;A<g;A++)d+=p[A]*x[A];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function tm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function em(i,t,e){let n=new WeakMap,s=new re;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==f){let _=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",_)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],A=a.morphAttributes.color||[],E=0;p===!0&&(E=1),g===!0&&(E=2),x===!0&&(E=3);let v=a.attributes.position.count*E,P=1;v>t.maxTextureSize&&(P=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let w=new Float32Array(v*P*4*f),T=new Fs(w,v,P,f);T.type=_n,T.needsUpdate=!0;let S=E*4;for(let y=0;y<f;y++){let R=m[y],C=d[y],I=A[y],L=v*P*4*y;for(let O=0;O<R.count;O++){let F=O*S;p===!0&&(s.fromBufferAttribute(R,O),w[L+F+0]=s.x,w[L+F+1]=s.y,w[L+F+2]=s.z,w[L+F+3]=0),g===!0&&(s.fromBufferAttribute(C,O),w[L+F+4]=s.x,w[L+F+5]=s.y,w[L+F+6]=s.z,w[L+F+7]=0),x===!0&&(s.fromBufferAttribute(I,O),w[L+F+8]=s.x,w[L+F+9]=s.y,w[L+F+10]=s.z,w[L+F+11]=I.itemSize===4?s.w:1)}}u={count:f,texture:T,size:new Bt(v,P)},n.set(a,u),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function nm(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return f}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Oh=new Fe,yh=new Vs(1,1),Bh=new Fs,zh=new Gr,kh=new Bs,vh=[],Mh=[],bh=new Float32Array(16),Sh=new Float32Array(9),Th=new Float32Array(4);function ms(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=vh[s];if(r===void 0&&(r=new Float32Array(s),vh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ha(i,t){let e=Mh[t];e===void 0&&(e=new Int32Array(t),Mh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function im(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function sm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function rm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function om(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function am(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;Th.set(n),i.uniformMatrix2fv(this.addr,!1,Th),Ce(e,n)}}function lm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;Sh.set(n),i.uniformMatrix3fv(this.addr,!1,Sh),Ce(e,n)}}function cm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;bh.set(n),i.uniformMatrix4fv(this.addr,!1,bh),Ce(e,n)}}function hm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function um(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function dm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function fm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function pm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function mm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function gm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function _m(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function xm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(yh.compareFunction=pl,r=yh):r=Oh,e.setTexture2D(t||r,s)}function ym(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||zh,s)}function vm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||kh,s)}function Mm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Bh,s)}function bm(i){switch(i){case 5126:return im;case 35664:return sm;case 35665:return rm;case 35666:return om;case 35674:return am;case 35675:return lm;case 35676:return cm;case 5124:case 35670:return hm;case 35667:case 35671:return um;case 35668:case 35672:return dm;case 35669:case 35673:return fm;case 5125:return pm;case 36294:return mm;case 36295:return gm;case 36296:return _m;case 35678:case 36198:case 36298:case 36306:case 35682:return xm;case 35679:case 36299:case 36307:return ym;case 35680:case 36300:case 36308:case 36293:return vm;case 36289:case 36303:case 36311:case 36292:return Mm}}function Sm(i,t){i.uniform1fv(this.addr,t)}function Tm(i,t){let e=ms(t,this.size,2);i.uniform2fv(this.addr,e)}function wm(i,t){let e=ms(t,this.size,3);i.uniform3fv(this.addr,e)}function Em(i,t){let e=ms(t,this.size,4);i.uniform4fv(this.addr,e)}function Am(i,t){let e=ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Cm(i,t){let e=ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Rm(i,t){let e=ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Pm(i,t){i.uniform1iv(this.addr,t)}function Im(i,t){i.uniform2iv(this.addr,t)}function Dm(i,t){i.uniform3iv(this.addr,t)}function Lm(i,t){i.uniform4iv(this.addr,t)}function Um(i,t){i.uniform1uiv(this.addr,t)}function Nm(i,t){i.uniform2uiv(this.addr,t)}function Fm(i,t){i.uniform3uiv(this.addr,t)}function Om(i,t){i.uniform4uiv(this.addr,t)}function Bm(i,t,e){let n=this.cache,s=t.length,r=ha(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Oh,r[o])}function zm(i,t,e){let n=this.cache,s=t.length,r=ha(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||zh,r[o])}function km(i,t,e){let n=this.cache,s=t.length,r=ha(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||kh,r[o])}function Vm(i,t,e){let n=this.cache,s=t.length,r=ha(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Bh,r[o])}function Hm(i){switch(i){case 5126:return Sm;case 35664:return Tm;case 35665:return wm;case 35666:return Em;case 35674:return Am;case 35675:return Cm;case 35676:return Rm;case 5124:case 35670:return Pm;case 35667:case 35671:return Im;case 35668:case 35672:return Dm;case 35669:case 35673:return Lm;case 5125:return Um;case 36294:return Nm;case 36295:return Fm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Vm}}var Rl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=bm(e.type)}},Pl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Hm(e.type)}},Il=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Cl=/(\w+)(\])?(\[|\.)?/g;function wh(i,t){i.seq.push(t),i.map[t.id]=t}function Gm(i,t,e){let n=i.name,s=n.length;for(Cl.lastIndex=0;;){let r=Cl.exec(n),o=Cl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){wh(e,l===void 0?new Rl(a,i,t):new Pl(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Il(a),wh(e,f)),e=f}}}var fs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Gm(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Eh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Wm=37297,Xm=0;function qm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Ah=new Yt;function Ym(i){ee._getMatrix(Ah,ee.workingColorSpace,i);let t=`mat3( ${Ah.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Us:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ch(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+qm(i.getShaderSource(t),a)}else return r}function Zm(i,t){let e=Ym(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $m(i,t){let e;switch(t){case Xc:e="Linear";break;case qc:e="Reinhard";break;case Yc:e="Cineon";break;case vo:e="ACESFilmic";break;case $c:e="AgX";break;case Jc:e="Neutral";break;case Zc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var la=new N;function Jm(){ee.getLuminanceCoefficients(la);let i=la.x.toFixed(4),t=la.y.toFixed(4),e=la.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Km(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function jm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Qm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function rr(i){return i!==""}function Rh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ph(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var tg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dl(i){return i.replace(tg,ng)}var eg=new Map;function ng(i,t){let e=$t[t];if(e===void 0){let n=eg.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Dl(e)}var ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(i){return i.replace(ig,sg)}function sg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===nl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ho?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function og(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yi:case vi:t="ENVMAP_TYPE_CUBE";break;case Qs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ag(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vi:t="ENVMAP_MODE_REFRACTION";break}return t}function lg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yo:t="ENVMAP_BLENDING_MULTIPLY";break;case Gc:t="ENVMAP_BLENDING_MIX";break;case Wc:t="ENVMAP_BLENDING_ADD";break}return t}function cg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function hg(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=rg(e),l=og(e),h=ag(e),f=lg(e),u=cg(e),p=Km(e),g=jm(r),x=s.createProgram(),m,d,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(rr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(rr).join(`
`),d.length>0&&(d+=`
`)):(m=[Dh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),d=[Dh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==On?"#define TONE_MAPPING":"",e.toneMapping!==On?$t.tonemapping_pars_fragment:"",e.toneMapping!==On?$m("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Zm("linearToOutputTexel",e.outputColorSpace),Jm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(rr).join(`
`)),o=Dl(o),o=Rh(o,e),o=Ph(o,e),a=Dl(a),a=Rh(a,e),a=Ph(a,e),o=Ih(o),a=Ih(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let E=A+m+o,v=A+d+a,P=Eh(s,s.VERTEX_SHADER,E),w=Eh(s,s.FRAGMENT_SHADER,v);s.attachShader(x,P),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function T(R){if(i.debug.checkShaderErrors){let C=s.getProgramInfoLog(x)||"",I=s.getShaderInfoLog(P)||"",L=s.getShaderInfoLog(w)||"",O=C.trim(),F=I.trim(),H=L.trim(),V=!0,W=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,P,w);else{let j=Ch(s,P,"vertex"),nt=Ch(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+j+`
`+nt)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||H==="")&&(W=!1);W&&(R.diagnostics={runnable:V,programLog:O,vertexShader:{log:F,prefix:m},fragmentShader:{log:H,prefix:d}})}s.deleteShader(P),s.deleteShader(w),S=new fs(s,x),_=Qm(s,x)}let S;this.getUniforms=function(){return S===void 0&&T(this),S};let _;this.getAttributes=function(){return _===void 0&&T(this),_};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,Wm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xm++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=w,this}var ug=0,Ll=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ul(t),e.set(t,n)),n}},Ul=class{constructor(t){this.id=ug++,this.code=t,this.usedTimes=0}};function dg(i,t,e,n,s,r,o){let a=new ji,c=new Ll,l=new Set,h=[],f=s.logarithmicDepthBuffer,u=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,y,R,C,I){let L=C.fog,O=I.geometry,F=_.isMeshStandardMaterial?C.environment:null,H=(_.isMeshStandardMaterial?e:t).get(_.envMap||F),V=H&&H.mapping===Qs?H.image.height:null,W=g[_.type];_.precision!==null&&(p=s.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));let j=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,nt=j!==void 0?j.length:0,it=0;O.morphAttributes.position!==void 0&&(it=1),O.morphAttributes.normal!==void 0&&(it=2),O.morphAttributes.color!==void 0&&(it=3);let vt,Et,yt,$;if(W){let jt=En[W];vt=jt.vertexShader,Et=jt.fragmentShader}else vt=_.vertexShader,Et=_.fragmentShader,c.update(_),yt=c.getVertexShaderID(_),$=c.getFragmentShaderID(_);let Q=i.getRenderTarget(),st=i.state.buffers.depth.getReversed(),dt=I.isInstancedMesh===!0,lt=I.isBatchedMesh===!0,wt=!!_.map,se=!!_.matcap,U=!!H,le=!!_.aoMap,Xt=!!_.lightMap,Nt=!!_.bumpMap,ft=!!_.normalMap,Jt=!!_.displacementMap,At=!!_.emissiveMap,Gt=!!_.metalnessMap,de=!!_.roughnessMap,xe=_.anisotropy>0,D=_.clearcoat>0,b=_.dispersion>0,X=_.iridescence>0,K=_.sheen>0,rt=_.transmission>0,J=xe&&!!_.anisotropyMap,Lt=D&&!!_.clearcoatMap,ut=D&&!!_.clearcoatNormalMap,Pt=D&&!!_.clearcoatRoughnessMap,Rt=X&&!!_.iridescenceMap,ht=X&&!!_.iridescenceThicknessMap,gt=K&&!!_.sheenColorMap,zt=K&&!!_.sheenRoughnessMap,It=!!_.specularMap,_t=!!_.specularColorMap,kt=!!_.specularIntensityMap,z=rt&&!!_.transmissionMap,ct=rt&&!!_.thicknessMap,pt=!!_.gradientMap,St=!!_.alphaMap,at=_.alphaTest>0,tt=!!_.alphaHash,Ct=!!_.extensions,qt=On;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(qt=i.toneMapping);let ie={shaderID:W,shaderType:_.type,shaderName:_.name,vertexShader:vt,fragmentShader:Et,defines:_.defines,customVertexShaderID:yt,customFragmentShaderID:$,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:lt,batchingColor:lt&&I._colorsTexture!==null,instancing:dt,instancingColor:dt&&I.instanceColor!==null,instancingMorph:dt&&I.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:di,alphaToCoverage:!!_.alphaToCoverage,map:wt,matcap:se,envMap:U,envMapMode:U&&H.mapping,envMapCubeUVHeight:V,aoMap:le,lightMap:Xt,bumpMap:Nt,normalMap:ft,displacementMap:u&&Jt,emissiveMap:At,normalMapObjectSpace:ft&&_.normalMapType===th,normalMapTangentSpace:ft&&_.normalMapType===ra,metalnessMap:Gt,roughnessMap:de,anisotropy:xe,anisotropyMap:J,clearcoat:D,clearcoatMap:Lt,clearcoatNormalMap:ut,clearcoatRoughnessMap:Pt,dispersion:b,iridescence:X,iridescenceMap:Rt,iridescenceThicknessMap:ht,sheen:K,sheenColorMap:gt,sheenRoughnessMap:zt,specularMap:It,specularColorMap:_t,specularIntensityMap:kt,transmission:rt,transmissionMap:z,thicknessMap:ct,gradientMap:pt,opaque:_.transparent===!1&&_.blending===hi&&_.alphaToCoverage===!1,alphaMap:St,alphaTest:at,alphaHash:tt,combine:_.combine,mapUv:wt&&x(_.map.channel),aoMapUv:le&&x(_.aoMap.channel),lightMapUv:Xt&&x(_.lightMap.channel),bumpMapUv:Nt&&x(_.bumpMap.channel),normalMapUv:ft&&x(_.normalMap.channel),displacementMapUv:Jt&&x(_.displacementMap.channel),emissiveMapUv:At&&x(_.emissiveMap.channel),metalnessMapUv:Gt&&x(_.metalnessMap.channel),roughnessMapUv:de&&x(_.roughnessMap.channel),anisotropyMapUv:J&&x(_.anisotropyMap.channel),clearcoatMapUv:Lt&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:ut&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:zt&&x(_.sheenRoughnessMap.channel),specularMapUv:It&&x(_.specularMap.channel),specularColorMapUv:_t&&x(_.specularColorMap.channel),specularIntensityMapUv:kt&&x(_.specularIntensityMap.channel),transmissionMapUv:z&&x(_.transmissionMap.channel),thicknessMapUv:ct&&x(_.thicknessMap.channel),alphaMapUv:St&&x(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ft||xe),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!O.attributes.uv&&(wt||St),fog:!!L,useFog:_.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:_.flatShading===!0&&_.wireframe===!1,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:st,skinning:I.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:it,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:qt,decodeVideoTexture:wt&&_.map.isVideoTexture===!0&&ee.getTransfer(_.map.colorSpace)===oe,decodeVideoTextureEmissive:At&&_.emissiveMap.isVideoTexture===!0&&ee.getTransfer(_.emissiveMap.colorSpace)===oe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===wn,flipSided:_.side===Le,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Ct&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&_.extensions.multiDraw===!0||lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ie.vertexUv1s=l.has(1),ie.vertexUv2s=l.has(2),ie.vertexUv3s=l.has(3),l.clear(),ie}function d(_){let y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)y.push(R),y.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(A(y,_),E(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function A(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function E(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),_.push(a.mask)}function v(_){let y=g[_.type],R;if(y){let C=En[y];R=uh.clone(C.uniforms)}else R=_.uniforms;return R}function P(_,y){let R;for(let C=0,I=h.length;C<I;C++){let L=h[C];if(L.cacheKey===y){R=L,++R.usedTimes;break}}return R===void 0&&(R=new hg(i,y,_,r),h.push(R)),R}function w(_){if(--_.usedTimes===0){let y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function T(_){c.remove(_)}function S(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:P,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:S}}function fg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function pg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Lh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Uh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,u,p,g,x,m){let d=i[t];return d===void 0?(d={id:f.id,object:f,geometry:u,material:p,groupOrder:g,renderOrder:f.renderOrder,z:x,group:m},i[t]=d):(d.id=f.id,d.object=f,d.geometry=u,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=x,d.group=m),t++,d}function a(f,u,p,g,x,m){let d=o(f,u,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):e.push(d)}function c(f,u,p,g,x,m){let d=o(f,u,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function l(f,u){e.length>1&&e.sort(f||pg),n.length>1&&n.sort(u||Lh),s.length>1&&s.sort(u||Lh)}function h(){for(let f=t,u=i.length;f<u;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function mg(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Uh,i.set(n,[o])):s>=r.length?(o=new Uh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function gg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Zt};break;case"SpotLight":e={position:new N,direction:new N,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function _g(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var xg=0;function yg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function vg(i){let t=new gg,e=_g(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new ae,o=new ae;function a(l){let h=0,f=0,u=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,A=0,E=0,v=0,P=0,w=0,T=0;l.sort(yg);for(let _=0,y=l.length;_<y;_++){let R=l[_],C=R.color,I=R.intensity,L=R.distance,O=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=C.r*I,f+=C.g*I,u+=C.b*I;else if(R.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(R.sh.coefficients[F],I);T++}else if(R.isDirectionalLight){let F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let H=R.shadow,V=e.get(R);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=O,n.directionalShadowMatrix[p]=R.shadow.matrix,A++}n.directional[p]=F,p++}else if(R.isSpotLight){let F=t.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(C).multiplyScalar(I),F.distance=L,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,n.spot[x]=F;let H=R.shadow;if(R.map&&(n.spotLightMap[P]=R.map,P++,H.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[x]=H.matrix,R.castShadow){let V=e.get(R);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=O,v++}x++}else if(R.isRectAreaLight){let F=t.get(R);F.color.copy(C).multiplyScalar(I),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=F,m++}else if(R.isPointLight){let F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){let H=R.shadow,V=e.get(R);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,V.shadowCameraNear=H.camera.near,V.shadowCameraFar=H.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=F,g++}else if(R.isHemisphereLight){let F=t.get(R);F.skyColor.copy(R.color).multiplyScalar(I),F.groundColor.copy(R.groundColor).multiplyScalar(I),n.hemi[d]=F,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let S=n.hash;(S.directionalLength!==p||S.pointLength!==g||S.spotLength!==x||S.rectAreaLength!==m||S.hemiLength!==d||S.numDirectionalShadows!==A||S.numPointShadows!==E||S.numSpotShadows!==v||S.numSpotMaps!==P||S.numLightProbes!==T)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+P-w,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,S.directionalLength=p,S.pointLength=g,S.spotLength=x,S.rectAreaLength=m,S.hemiLength=d,S.numDirectionalShadows=A,S.numPointShadows=E,S.numSpotShadows=v,S.numSpotMaps=P,S.numLightProbes=T,n.version=xg++)}function c(l,h){let f=0,u=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let d=0,A=l.length;d<A;d++){let E=l[d];if(E.isDirectionalLight){let v=n.directional[f];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(E.isSpotLight){let v=n.spot[p];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(E.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Nh(i){let t=new vg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Mg(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Nh(i),t.set(s,[a])):r>=o.length?(a=new Nh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var bg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tg(i,t,e){let n=new ts,s=new Bt,r=new Bt,o=new re,a=new Kr({depthPacking:Qc}),c=new jr,l={},h=e.maxTextureSize,f={[Un]:Le,[Le]:Un,[wn]:wn},u=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Bt},radius:{value:4}},vertexShader:bg,fragmentShader:Sg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new Ye;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new he(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nl;let d=this.type;this.render=function(w,T,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let _=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Fn),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);let I=d!==Tn&&this.type===Tn,L=d===Tn&&this.type!==Tn;for(let O=0,F=w.length;O<F;O++){let H=w[O],V=H.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let W=V.getFrameExtents();if(s.multiply(W),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,V.mapSize.y=r.y)),V.map===null||I===!0||L===!0){let nt=this.type!==Tn?{minFilter:We,magFilter:We}:{};V.map!==null&&V.map.dispose(),V.map=new Mn(s.x,s.y,nt),V.map.texture.name=H.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let j=V.getViewportCount();for(let nt=0;nt<j;nt++){let it=V.getViewport(nt);o.set(r.x*it.x,r.y*it.y,r.x*it.z,r.y*it.w),C.viewport(o),V.updateMatrices(H,nt),n=V.getFrustum(),v(T,S,V.camera,H,this.type)}V.isPointLightShadow!==!0&&this.type===Tn&&A(V,S),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(_,y,R)};function A(w,T){let S=t.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Mn(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,S,u,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,S,p,x,null)}function E(w,T,S,_){let y=null,R=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=S.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let C=y.uuid,I=T.uuid,L=l[C];L===void 0&&(L={},l[C]=L);let O=L[I];O===void 0&&(O=y.clone(),L[I]=O,T.addEventListener("dispose",P)),y=O}if(y.visible=T.visible,y.wireframe=T.wireframe,_===Tn?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:f[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,S.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let C=i.properties.get(y);C.light=S}return y}function v(w,T,S,_,y){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Tn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);let I=t.update(w),L=w.material;if(Array.isArray(L)){let O=I.groups;for(let F=0,H=O.length;F<H;F++){let V=O[F],W=L[V.materialIndex];if(W&&W.visible){let j=E(w,W,_,y);w.onBeforeShadow(i,w,T,S,I,j,V),i.renderBufferDirect(S,null,I,j,w,V),w.onAfterShadow(i,w,T,S,I,j,V)}}}else if(L.visible){let O=E(w,L,_,y);w.onBeforeShadow(i,w,T,S,I,O,null),i.renderBufferDirect(S,null,I,O,w,null),w.onAfterShadow(i,w,T,S,I,O,null)}}let C=w.children;for(let I=0,L=C.length;I<L;I++)v(C[I],T,S,_,y)}function P(w){w.target.removeEventListener("dispose",P);for(let S in l){let _=l[S],y=w.target.uuid;y in _&&(_[y].dispose(),delete _[y])}}}var wg={[uo]:fo,[po]:_o,[mo]:xo,[ui]:go,[fo]:uo,[_o]:po,[xo]:mo,[go]:ui};function Eg(i,t){function e(){let z=!1,ct=new re,pt=null,St=new re(0,0,0,0);return{setMask:function(at){pt!==at&&!z&&(i.colorMask(at,at,at,at),pt=at)},setLocked:function(at){z=at},setClear:function(at,tt,Ct,qt,ie){ie===!0&&(at*=qt,tt*=qt,Ct*=qt),ct.set(at,tt,Ct,qt),St.equals(ct)===!1&&(i.clearColor(at,tt,Ct,qt),St.copy(ct))},reset:function(){z=!1,pt=null,St.set(-1,0,0,0)}}}function n(){let z=!1,ct=!1,pt=null,St=null,at=null;return{setReversed:function(tt){if(ct!==tt){let Ct=t.get("EXT_clip_control");tt?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),ct=tt;let qt=at;at=null,this.setClear(qt)}},getReversed:function(){return ct},setTest:function(tt){tt?Q(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(tt){pt!==tt&&!z&&(i.depthMask(tt),pt=tt)},setFunc:function(tt){if(ct&&(tt=wg[tt]),St!==tt){switch(tt){case uo:i.depthFunc(i.NEVER);break;case fo:i.depthFunc(i.ALWAYS);break;case po:i.depthFunc(i.LESS);break;case ui:i.depthFunc(i.LEQUAL);break;case mo:i.depthFunc(i.EQUAL);break;case go:i.depthFunc(i.GEQUAL);break;case _o:i.depthFunc(i.GREATER);break;case xo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=tt}},setLocked:function(tt){z=tt},setClear:function(tt){at!==tt&&(ct&&(tt=1-tt),i.clearDepth(tt),at=tt)},reset:function(){z=!1,pt=null,St=null,at=null,ct=!1}}}function s(){let z=!1,ct=null,pt=null,St=null,at=null,tt=null,Ct=null,qt=null,ie=null;return{setTest:function(jt){z||(jt?Q(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function(jt){ct!==jt&&!z&&(i.stencilMask(jt),ct=jt)},setFunc:function(jt,en,$e){(pt!==jt||St!==en||at!==$e)&&(i.stencilFunc(jt,en,$e),pt=jt,St=en,at=$e)},setOp:function(jt,en,$e){(tt!==jt||Ct!==en||qt!==$e)&&(i.stencilOp(jt,en,$e),tt=jt,Ct=en,qt=$e)},setLocked:function(jt){z=jt},setClear:function(jt){ie!==jt&&(i.clearStencil(jt),ie=jt)},reset:function(){z=!1,ct=null,pt=null,St=null,at=null,tt=null,Ct=null,qt=null,ie=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},f={},u=new WeakMap,p=[],g=null,x=!1,m=null,d=null,A=null,E=null,v=null,P=null,w=null,T=new Zt(0,0,0),S=0,_=!1,y=null,R=null,C=null,I=null,L=null,O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,H=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(V)[1]),F=H>=1):V.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),F=H>=2);let W=null,j={},nt=i.getParameter(i.SCISSOR_BOX),it=i.getParameter(i.VIEWPORT),vt=new re().fromArray(nt),Et=new re().fromArray(it);function yt(z,ct,pt,St){let at=new Uint8Array(4),tt=i.createTexture();i.bindTexture(z,tt),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ct=0;Ct<pt;Ct++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(ct+Ct,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return tt}let $={};$[i.TEXTURE_2D]=yt(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=yt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=yt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=yt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(ui),Nt(!1),ft(el),Q(i.CULL_FACE),le(Fn);function Q(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function st(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function dt(z,ct){return f[z]!==ct?(i.bindFramebuffer(z,ct),f[z]=ct,z===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ct),z===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function lt(z,ct){let pt=p,St=!1;if(z){pt=u.get(ct),pt===void 0&&(pt=[],u.set(ct,pt));let at=z.textures;if(pt.length!==at.length||pt[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,Ct=at.length;tt<Ct;tt++)pt[tt]=i.COLOR_ATTACHMENT0+tt;pt.length=at.length,St=!0}}else pt[0]!==i.BACK&&(pt[0]=i.BACK,St=!0);St&&i.drawBuffers(pt)}function wt(z){return g!==z?(i.useProgram(z),g=z,!0):!1}let se={[Zn]:i.FUNC_ADD,[Ec]:i.FUNC_SUBTRACT,[Ac]:i.FUNC_REVERSE_SUBTRACT};se[Cc]=i.MIN,se[Rc]=i.MAX;let U={[Pc]:i.ZERO,[Ic]:i.ONE,[Dc]:i.SRC_COLOR,[Or]:i.SRC_ALPHA,[Bc]:i.SRC_ALPHA_SATURATE,[Fc]:i.DST_COLOR,[Uc]:i.DST_ALPHA,[Lc]:i.ONE_MINUS_SRC_COLOR,[Br]:i.ONE_MINUS_SRC_ALPHA,[Oc]:i.ONE_MINUS_DST_COLOR,[Nc]:i.ONE_MINUS_DST_ALPHA,[zc]:i.CONSTANT_COLOR,[kc]:i.ONE_MINUS_CONSTANT_COLOR,[Vc]:i.CONSTANT_ALPHA,[Hc]:i.ONE_MINUS_CONSTANT_ALPHA};function le(z,ct,pt,St,at,tt,Ct,qt,ie,jt){if(z===Fn){x===!0&&(st(i.BLEND),x=!1);return}if(x===!1&&(Q(i.BLEND),x=!0),z!==wc){if(z!==m||jt!==_){if((d!==Zn||v!==Zn)&&(i.blendEquation(i.FUNC_ADD),d=Zn,v=Zn),jt)switch(z){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case il:i.blendFunc(i.ONE,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case il:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case sl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}A=null,E=null,P=null,w=null,T.set(0,0,0),S=0,m=z,_=jt}return}at=at||ct,tt=tt||pt,Ct=Ct||St,(ct!==d||at!==v)&&(i.blendEquationSeparate(se[ct],se[at]),d=ct,v=at),(pt!==A||St!==E||tt!==P||Ct!==w)&&(i.blendFuncSeparate(U[pt],U[St],U[tt],U[Ct]),A=pt,E=St,P=tt,w=Ct),(qt.equals(T)===!1||ie!==S)&&(i.blendColor(qt.r,qt.g,qt.b,ie),T.copy(qt),S=ie),m=z,_=!1}function Xt(z,ct){z.side===wn?st(i.CULL_FACE):Q(i.CULL_FACE);let pt=z.side===Le;ct&&(pt=!pt),Nt(pt),z.blending===hi&&z.transparent===!1?le(Fn):le(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);let St=z.stencilWrite;a.setTest(St),St&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),At(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(z){y!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),y=z)}function ft(z){z!==Sc?(Q(i.CULL_FACE),z!==R&&(z===el?i.cullFace(i.BACK):z===Tc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),R=z}function Jt(z){z!==C&&(F&&i.lineWidth(z),C=z)}function At(z,ct,pt){z?(Q(i.POLYGON_OFFSET_FILL),(I!==ct||L!==pt)&&(i.polygonOffset(ct,pt),I=ct,L=pt)):st(i.POLYGON_OFFSET_FILL)}function Gt(z){z?Q(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function de(z){z===void 0&&(z=i.TEXTURE0+O-1),W!==z&&(i.activeTexture(z),W=z)}function xe(z,ct,pt){pt===void 0&&(W===null?pt=i.TEXTURE0+O-1:pt=W);let St=j[pt];St===void 0&&(St={type:void 0,texture:void 0},j[pt]=St),(St.type!==z||St.texture!==ct)&&(W!==pt&&(i.activeTexture(pt),W=pt),i.bindTexture(z,ct||$[z]),St.type=z,St.texture=ct)}function D(){let z=j[W];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function X(){try{i.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function K(){try{i.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function rt(){try{i.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Lt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ut(){try{i.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Pt(){try{i.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Rt(){try{i.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ht(){try{i.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(z){vt.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),vt.copy(z))}function zt(z){Et.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),Et.copy(z))}function It(z,ct){let pt=l.get(ct);pt===void 0&&(pt=new WeakMap,l.set(ct,pt));let St=pt.get(z);St===void 0&&(St=i.getUniformBlockIndex(ct,z.name),pt.set(z,St))}function _t(z,ct){let St=l.get(ct).get(z);c.get(ct)!==St&&(i.uniformBlockBinding(ct,St,z.__bindingPointIndex),c.set(ct,St))}function kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},W=null,j={},f={},u=new WeakMap,p=[],g=null,x=!1,m=null,d=null,A=null,E=null,v=null,P=null,w=null,T=new Zt(0,0,0),S=0,_=!1,y=null,R=null,C=null,I=null,L=null,vt.set(0,0,i.canvas.width,i.canvas.height),Et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:st,bindFramebuffer:dt,drawBuffers:lt,useProgram:wt,setBlending:le,setMaterial:Xt,setFlipSided:Nt,setCullFace:ft,setLineWidth:Jt,setPolygonOffset:At,setScissorTest:Gt,activeTexture:de,bindTexture:xe,unbindTexture:D,compressedTexImage2D:b,compressedTexImage3D:X,texImage2D:Rt,texImage3D:ht,updateUBOMapping:It,uniformBlockBinding:_t,texStorage2D:ut,texStorage3D:Pt,texSubImage2D:K,texSubImage3D:rt,compressedTexSubImage2D:J,compressedTexSubImage3D:Lt,scissor:gt,viewport:zt,reset:kt}}function Ag(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Bt,h=new WeakMap,f,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,b){return p?new OffscreenCanvas(D,b):$i("canvas")}function x(D,b,X){let K=1,rt=xe(D);if((rt.width>X||rt.height>X)&&(K=X/Math.max(rt.width,rt.height)),K<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let J=Math.floor(K*rt.width),Lt=Math.floor(K*rt.height);f===void 0&&(f=g(J,Lt));let ut=b?g(J,Lt):f;return ut.width=J,ut.height=Lt,ut.getContext("2d").drawImage(D,0,0,J,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+J+"x"+Lt+")."),ut}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),D;return D}function m(D){return D.generateMipmaps}function d(D){i.generateMipmap(D)}function A(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(D,b,X,K,rt=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let J=b;if(b===i.RED&&(X===i.FLOAT&&(J=i.R32F),X===i.HALF_FLOAT&&(J=i.R16F),X===i.UNSIGNED_BYTE&&(J=i.R8)),b===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(J=i.R8UI),X===i.UNSIGNED_SHORT&&(J=i.R16UI),X===i.UNSIGNED_INT&&(J=i.R32UI),X===i.BYTE&&(J=i.R8I),X===i.SHORT&&(J=i.R16I),X===i.INT&&(J=i.R32I)),b===i.RG&&(X===i.FLOAT&&(J=i.RG32F),X===i.HALF_FLOAT&&(J=i.RG16F),X===i.UNSIGNED_BYTE&&(J=i.RG8)),b===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(J=i.RG8UI),X===i.UNSIGNED_SHORT&&(J=i.RG16UI),X===i.UNSIGNED_INT&&(J=i.RG32UI),X===i.BYTE&&(J=i.RG8I),X===i.SHORT&&(J=i.RG16I),X===i.INT&&(J=i.RG32I)),b===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(J=i.RGB8UI),X===i.UNSIGNED_SHORT&&(J=i.RGB16UI),X===i.UNSIGNED_INT&&(J=i.RGB32UI),X===i.BYTE&&(J=i.RGB8I),X===i.SHORT&&(J=i.RGB16I),X===i.INT&&(J=i.RGB32I)),b===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),X===i.UNSIGNED_INT&&(J=i.RGBA32UI),X===i.BYTE&&(J=i.RGBA8I),X===i.SHORT&&(J=i.RGBA16I),X===i.INT&&(J=i.RGBA32I)),b===i.RGB&&(X===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),b===i.RGBA){let Lt=rt?Us:ee.getTransfer(K);X===i.FLOAT&&(J=i.RGBA32F),X===i.HALF_FLOAT&&(J=i.RGBA16F),X===i.UNSIGNED_BYTE&&(J=Lt===oe?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function v(D,b){let X;return D?b===null||b===ni||b===ls?X=i.DEPTH24_STENCIL8:b===_n?X=i.DEPTH32F_STENCIL8:b===os&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ni||b===ls?X=i.DEPTH_COMPONENT24:b===_n?X=i.DEPTH_COMPONENT32F:b===os&&(X=i.DEPTH_COMPONENT16),X}function P(D,b){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==We&&D.minFilter!==fn?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function w(D){let b=D.target;b.removeEventListener("dispose",w),S(b),b.isVideoTexture&&h.delete(b)}function T(D){let b=D.target;b.removeEventListener("dispose",T),y(b)}function S(D){let b=n.get(D);if(b.__webglInit===void 0)return;let X=D.source,K=u.get(X);if(K){let rt=K[b.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&_(D),Object.keys(K).length===0&&u.delete(X)}n.remove(D)}function _(D){let b=n.get(D);i.deleteTexture(b.__webglTexture);let X=D.source,K=u.get(X);delete K[b.__cacheKey],o.memory.textures--}function y(D){let b=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let rt=0;rt<b.__webglFramebuffer[K].length;rt++)i.deleteFramebuffer(b.__webglFramebuffer[K][rt]);else i.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)i.deleteFramebuffer(b.__webglFramebuffer[K]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let X=D.textures;for(let K=0,rt=X.length;K<rt;K++){let J=n.get(X[K]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(X[K])}n.remove(D)}let R=0;function C(){R=0}function I(){let D=R;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),R+=1,D}function L(D){let b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function O(D,b){let X=n.get(D);if(D.isVideoTexture&&Gt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&X.__version!==D.version){let K=D.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(X,D,b);return}}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+b)}function F(D,b){let X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){$(X,D,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+b)}function H(D,b){let X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){$(X,D,b);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+b)}function V(D,b){let X=n.get(D);if(D.version>0&&X.__version!==D.version){Q(X,D,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+b)}let W={[$n]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[zr]:i.MIRRORED_REPEAT},j={[We]:i.NEAREST,[Kc]:i.NEAREST_MIPMAP_NEAREST,[tr]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[So]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},nt={[eh]:i.NEVER,[ah]:i.ALWAYS,[nh]:i.LESS,[pl]:i.LEQUAL,[ih]:i.EQUAL,[oh]:i.GEQUAL,[sh]:i.GREATER,[rh]:i.NOTEQUAL};function it(D,b){if(b.type===_n&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===fn||b.magFilter===So||b.magFilter===tr||b.magFilter===ei||b.minFilter===fn||b.minFilter===So||b.minFilter===tr||b.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,W[b.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,W[b.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,W[b.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,j[b.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,j[b.minFilter]),b.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,nt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===We||b.minFilter!==tr&&b.minFilter!==ei||b.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function vt(D,b){let X=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",w));let K=b.source,rt=u.get(K);rt===void 0&&(rt={},u.set(K,rt));let J=L(b);if(J!==D.__cacheKey){rt[J]===void 0&&(rt[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),rt[J].usedTimes++;let Lt=rt[D.__cacheKey];Lt!==void 0&&(rt[D.__cacheKey].usedTimes--,Lt.usedTimes===0&&_(b)),D.__cacheKey=J,D.__webglTexture=rt[J].texture}return X}function Et(D,b,X){return Math.floor(Math.floor(D/X)/b)}function yt(D,b,X,K){let J=D.updateRanges;if(J.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,X,K,b.data);else{J.sort((ht,gt)=>ht.start-gt.start);let Lt=0;for(let ht=1;ht<J.length;ht++){let gt=J[Lt],zt=J[ht],It=gt.start+gt.count,_t=Et(zt.start,b.width,4),kt=Et(gt.start,b.width,4);zt.start<=It+1&&_t===kt&&Et(zt.start+zt.count-1,b.width,4)===_t?gt.count=Math.max(gt.count,zt.start+zt.count-gt.start):(++Lt,J[Lt]=zt)}J.length=Lt+1;let ut=i.getParameter(i.UNPACK_ROW_LENGTH),Pt=i.getParameter(i.UNPACK_SKIP_PIXELS),Rt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let ht=0,gt=J.length;ht<gt;ht++){let zt=J[ht],It=Math.floor(zt.start/4),_t=Math.ceil(zt.count/4),kt=It%b.width,z=Math.floor(It/b.width),ct=_t,pt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,kt),i.pixelStorei(i.UNPACK_SKIP_ROWS,z),e.texSubImage2D(i.TEXTURE_2D,0,kt,z,ct,pt,X,K,b.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ut),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Pt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Rt)}}function $(D,b,X){let K=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(K=i.TEXTURE_3D);let rt=vt(D,b),J=b.source;e.bindTexture(K,D.__webglTexture,i.TEXTURE0+X);let Lt=n.get(J);if(J.version!==Lt.__version||rt===!0){e.activeTexture(i.TEXTURE0+X);let ut=ee.getPrimaries(ee.workingColorSpace),Pt=b.colorSpace===Bn?null:ee.getPrimaries(b.colorSpace),Rt=b.colorSpace===Bn||ut===Pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let ht=x(b.image,!1,s.maxTextureSize);ht=de(b,ht);let gt=r.convert(b.format,b.colorSpace),zt=r.convert(b.type),It=E(b.internalFormat,gt,zt,b.colorSpace,b.isVideoTexture);it(K,b);let _t,kt=b.mipmaps,z=b.isVideoTexture!==!0,ct=Lt.__version===void 0||rt===!0,pt=J.dataReady,St=P(b,ht);if(b.isDepthTexture)It=v(b.format===cs,b.type),ct&&(z?e.texStorage2D(i.TEXTURE_2D,1,It,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,It,ht.width,ht.height,0,gt,zt,null));else if(b.isDataTexture)if(kt.length>0){z&&ct&&e.texStorage2D(i.TEXTURE_2D,St,It,kt[0].width,kt[0].height);for(let at=0,tt=kt.length;at<tt;at++)_t=kt[at],z?pt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,_t.width,_t.height,gt,zt,_t.data):e.texImage2D(i.TEXTURE_2D,at,It,_t.width,_t.height,0,gt,zt,_t.data);b.generateMipmaps=!1}else z?(ct&&e.texStorage2D(i.TEXTURE_2D,St,It,ht.width,ht.height),pt&&yt(b,ht,gt,zt)):e.texImage2D(i.TEXTURE_2D,0,It,ht.width,ht.height,0,gt,zt,ht.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){z&&ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,It,kt[0].width,kt[0].height,ht.depth);for(let at=0,tt=kt.length;at<tt;at++)if(_t=kt[at],b.format!==ln)if(gt!==null)if(z){if(pt)if(b.layerUpdates.size>0){let Ct=bl(_t.width,_t.height,b.format,b.type);for(let qt of b.layerUpdates){let ie=_t.data.subarray(qt*Ct/_t.data.BYTES_PER_ELEMENT,(qt+1)*Ct/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,qt,_t.width,_t.height,1,gt,ie)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,_t.width,_t.height,ht.depth,gt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,at,It,_t.width,_t.height,ht.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?pt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,_t.width,_t.height,ht.depth,gt,zt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,at,It,_t.width,_t.height,ht.depth,0,gt,zt,_t.data)}else{z&&ct&&e.texStorage2D(i.TEXTURE_2D,St,It,kt[0].width,kt[0].height);for(let at=0,tt=kt.length;at<tt;at++)_t=kt[at],b.format!==ln?gt!==null?z?pt&&e.compressedTexSubImage2D(i.TEXTURE_2D,at,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,at,It,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?pt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,_t.width,_t.height,gt,zt,_t.data):e.texImage2D(i.TEXTURE_2D,at,It,_t.width,_t.height,0,gt,zt,_t.data)}else if(b.isDataArrayTexture)if(z){if(ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,It,ht.width,ht.height,ht.depth),pt)if(b.layerUpdates.size>0){let at=bl(ht.width,ht.height,b.format,b.type);for(let tt of b.layerUpdates){let Ct=ht.data.subarray(tt*at/ht.data.BYTES_PER_ELEMENT,(tt+1)*at/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ht.width,ht.height,1,gt,zt,Ct)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,gt,zt,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,ht.width,ht.height,ht.depth,0,gt,zt,ht.data);else if(b.isData3DTexture)z?(ct&&e.texStorage3D(i.TEXTURE_3D,St,It,ht.width,ht.height,ht.depth),pt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,gt,zt,ht.data)):e.texImage3D(i.TEXTURE_3D,0,It,ht.width,ht.height,ht.depth,0,gt,zt,ht.data);else if(b.isFramebufferTexture){if(ct)if(z)e.texStorage2D(i.TEXTURE_2D,St,It,ht.width,ht.height);else{let at=ht.width,tt=ht.height;for(let Ct=0;Ct<St;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,It,at,tt,0,gt,zt,null),at>>=1,tt>>=1}}else if(kt.length>0){if(z&&ct){let at=xe(kt[0]);e.texStorage2D(i.TEXTURE_2D,St,It,at.width,at.height)}for(let at=0,tt=kt.length;at<tt;at++)_t=kt[at],z?pt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,gt,zt,_t):e.texImage2D(i.TEXTURE_2D,at,It,gt,zt,_t);b.generateMipmaps=!1}else if(z){if(ct){let at=xe(ht);e.texStorage2D(i.TEXTURE_2D,St,It,at.width,at.height)}pt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,zt,ht)}else e.texImage2D(i.TEXTURE_2D,0,It,gt,zt,ht);m(b)&&d(K),Lt.__version=J.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Q(D,b,X){if(b.image.length!==6)return;let K=vt(D,b),rt=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+X);let J=n.get(rt);if(rt.version!==J.__version||K===!0){e.activeTexture(i.TEXTURE0+X);let Lt=ee.getPrimaries(ee.workingColorSpace),ut=b.colorSpace===Bn?null:ee.getPrimaries(b.colorSpace),Pt=b.colorSpace===Bn||Lt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let Rt=b.isCompressedTexture||b.image[0].isCompressedTexture,ht=b.image[0]&&b.image[0].isDataTexture,gt=[];for(let tt=0;tt<6;tt++)!Rt&&!ht?gt[tt]=x(b.image[tt],!0,s.maxCubemapSize):gt[tt]=ht?b.image[tt].image:b.image[tt],gt[tt]=de(b,gt[tt]);let zt=gt[0],It=r.convert(b.format,b.colorSpace),_t=r.convert(b.type),kt=E(b.internalFormat,It,_t,b.colorSpace),z=b.isVideoTexture!==!0,ct=J.__version===void 0||K===!0,pt=rt.dataReady,St=P(b,zt);it(i.TEXTURE_CUBE_MAP,b);let at;if(Rt){z&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,kt,zt.width,zt.height);for(let tt=0;tt<6;tt++){at=gt[tt].mipmaps;for(let Ct=0;Ct<at.length;Ct++){let qt=at[Ct];b.format!==ln?It!==null?z?pt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,qt.width,qt.height,It,qt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,kt,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,qt.width,qt.height,It,_t,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,kt,qt.width,qt.height,0,It,_t,qt.data)}}}else{if(at=b.mipmaps,z&&ct){at.length>0&&St++;let tt=xe(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,kt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ht){z?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,gt[tt].width,gt[tt].height,It,_t,gt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,kt,gt[tt].width,gt[tt].height,0,It,_t,gt[tt].data);for(let Ct=0;Ct<at.length;Ct++){let ie=at[Ct].image[tt].image;z?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,ie.width,ie.height,It,_t,ie.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,kt,ie.width,ie.height,0,It,_t,ie.data)}}else{z?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,It,_t,gt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,kt,It,_t,gt[tt]);for(let Ct=0;Ct<at.length;Ct++){let qt=at[Ct];z?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,It,_t,qt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,kt,It,_t,qt.image[tt])}}}m(b)&&d(i.TEXTURE_CUBE_MAP),J.__version=rt.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function st(D,b,X,K,rt,J){let Lt=r.convert(X.format,X.colorSpace),ut=r.convert(X.type),Pt=E(X.internalFormat,Lt,ut,X.colorSpace),Rt=n.get(b),ht=n.get(X);if(ht.__renderTarget=b,!Rt.__hasExternalTextures){let gt=Math.max(1,b.width>>J),zt=Math.max(1,b.height>>J);rt===i.TEXTURE_3D||rt===i.TEXTURE_2D_ARRAY?e.texImage3D(rt,J,Pt,gt,zt,b.depth,0,Lt,ut,null):e.texImage2D(rt,J,Pt,gt,zt,0,Lt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),At(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,rt,ht.__webglTexture,0,Jt(b)):(rt===i.TEXTURE_2D||rt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,rt,ht.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(D,b,X){if(i.bindRenderbuffer(i.RENDERBUFFER,D),b.depthBuffer){let K=b.depthTexture,rt=K&&K.isDepthTexture?K.type:null,J=v(b.stencilBuffer,rt),Lt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=Jt(b);At(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,J,b.width,b.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,D)}else{let K=b.textures;for(let rt=0;rt<K.length;rt++){let J=K[rt],Lt=r.convert(J.format,J.colorSpace),ut=r.convert(J.type),Pt=E(J.internalFormat,Lt,ut,J.colorSpace),Rt=Jt(b);X&&At(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,Pt,b.width,b.height):At(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,Pt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Pt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function lt(D,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=n.get(b.depthTexture);K.__renderTarget=b,(!K.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),O(b.depthTexture,0);let rt=K.__webglTexture,J=Jt(b);if(b.depthTexture.format===Yi)At(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,rt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,rt,0);else if(b.depthTexture.format===cs)At(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,rt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function wt(D){let b=n.get(D),X=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){let K=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),K){let rt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,K.removeEventListener("dispose",rt)};K.addEventListener("dispose",rt),b.__depthDisposeCallback=rt}b.__boundDepthTexture=K}if(D.depthTexture&&!b.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");let K=D.texture.mipmaps;K&&K.length>0?lt(b.__webglFramebuffer[0],D):lt(b.__webglFramebuffer,D)}else if(X){b.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[K]),b.__webglDepthbuffer[K]===void 0)b.__webglDepthbuffer[K]=i.createRenderbuffer(),dt(b.__webglDepthbuffer[K],D,!1);else{let rt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,J)}}else{let K=D.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),dt(b.__webglDepthbuffer,D,!1);else{let rt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,J)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function se(D,b,X){let K=n.get(D);b!==void 0&&st(K.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&wt(D)}function U(D){let b=D.texture,X=n.get(D),K=n.get(b);D.addEventListener("dispose",T);let rt=D.textures,J=D.isWebGLCubeRenderTarget===!0,Lt=rt.length>1;if(Lt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=b.version,o.memory.textures++),J){X.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer[ut]=[];for(let Pt=0;Pt<b.mipmaps.length;Pt++)X.__webglFramebuffer[ut][Pt]=i.createFramebuffer()}else X.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer=[];for(let ut=0;ut<b.mipmaps.length;ut++)X.__webglFramebuffer[ut]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let ut=0,Pt=rt.length;ut<Pt;ut++){let Rt=n.get(rt[ut]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&At(D)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ut=0;ut<rt.length;ut++){let Pt=rt[ut];X.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[ut]);let Rt=r.convert(Pt.format,Pt.colorSpace),ht=r.convert(Pt.type),gt=E(Pt.internalFormat,Rt,ht,Pt.colorSpace,D.isXRRenderTarget===!0),zt=Jt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,gt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,X.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(X.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),it(i.TEXTURE_CUBE_MAP,b);for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0)for(let Pt=0;Pt<b.mipmaps.length;Pt++)st(X.__webglFramebuffer[ut][Pt],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt);else st(X.__webglFramebuffer[ut],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(b)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let ut=0,Pt=rt.length;ut<Pt;ut++){let Rt=rt[ut],ht=n.get(Rt),gt=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(gt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,ht.__webglTexture),it(gt,Rt),st(X.__webglFramebuffer,D,Rt,i.COLOR_ATTACHMENT0+ut,gt,0),m(Rt)&&d(gt)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ut=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,K.__webglTexture),it(ut,b),b.mipmaps&&b.mipmaps.length>0)for(let Pt=0;Pt<b.mipmaps.length;Pt++)st(X.__webglFramebuffer[Pt],D,b,i.COLOR_ATTACHMENT0,ut,Pt);else st(X.__webglFramebuffer,D,b,i.COLOR_ATTACHMENT0,ut,0);m(b)&&d(ut),e.unbindTexture()}D.depthBuffer&&wt(D)}function le(D){let b=D.textures;for(let X=0,K=b.length;X<K;X++){let rt=b[X];if(m(rt)){let J=A(D),Lt=n.get(rt).__webglTexture;e.bindTexture(J,Lt),d(J),e.unbindTexture()}}}let Xt=[],Nt=[];function ft(D){if(D.samples>0){if(At(D)===!1){let b=D.textures,X=D.width,K=D.height,rt=i.COLOR_BUFFER_BIT,J=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(D),ut=b.length>1;if(ut)for(let Rt=0;Rt<b.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);let Pt=D.texture.mipmaps;Pt&&Pt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Rt=0;Rt<b.length;Rt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(rt|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(rt|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Rt]);let ht=n.get(b[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ht,0)}i.blitFramebuffer(0,0,X,K,0,0,X,K,rt,i.NEAREST),c===!0&&(Xt.length=0,Nt.length=0,Xt.push(i.COLOR_ATTACHMENT0+Rt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Xt.push(J),Nt.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let Rt=0;Rt<b.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Rt]);let ht=n.get(b[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){let b=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Jt(D){return Math.min(s.maxSamples,D.samples)}function At(D){let b=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Gt(D){let b=o.render.frame;h.get(D)!==b&&(h.set(D,b),D.update())}function de(D,b){let X=D.colorSpace,K=D.format,rt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||X!==di&&X!==Bn&&(ee.getTransfer(X)===oe?(K!==ln||rt!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),b}function xe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=C,this.setTexture2D=O,this.setTexture2DArray=F,this.setTexture3D=H,this.setTextureCube=V,this.rebindTextures=se,this.setupRenderTarget=U,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=At}function Cg(i,t){function e(n,s=Bn){let r,o=ee.getTransfer(s);if(n===gn)return i.UNSIGNED_BYTE;if(n===wo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Eo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===cl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===al)return i.BYTE;if(n===ll)return i.SHORT;if(n===os)return i.UNSIGNED_SHORT;if(n===To)return i.INT;if(n===ni)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===as)return i.HALF_FLOAT;if(n===ul)return i.ALPHA;if(n===dl)return i.RGB;if(n===ln)return i.RGBA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===cs)return i.DEPTH_STENCIL;if(n===Ao)return i.RED;if(n===Co)return i.RED_INTEGER;if(n===fl)return i.RG;if(n===Ro)return i.RG_INTEGER;if(n===Po)return i.RGBA_INTEGER;if(n===er||n===nr||n===ir||n===sr)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Io||n===Do||n===Lo||n===Uo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Do)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===No||n===Fo||n===Oo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===No||n===Fo)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Oo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Bo||n===zo||n===ko||n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===Yo||n===Zo||n===$o||n===Jo||n===Ko)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Bo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ho)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$o)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ko)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jo||n===Qo||n===ta)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===jo)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ta)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ea||n===na||n===ia||n===sa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ea)return r.COMPRESSED_RED_RGTC1_EXT;if(n===na)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ia)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Hs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new pn({vertexShader:Rg,fragmentShader:Pg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new he(new _i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fl=class extends vn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,u=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new Nl,d={},A=e.getContextAttributes(),E=null,v=null,P=[],w=[],T=new Bt,S=null,_=new De;_.viewport=new re;let y=new De;y.viewport=new re;let R=[_,y],C=new co,I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=P[$];return Q===void 0&&(Q=new Qi,P[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=P[$];return Q===void 0&&(Q=new Qi,P[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=P[$];return Q===void 0&&(Q=new Qi,P[$]=Q),Q.getHandSpace()};function O($){let Q=w.indexOf($.inputSource);if(Q===-1)return;let st=P[Q];st!==void 0&&(st.update($.inputSource,$.frame,l||o),st.dispatchEvent({type:$.type,data:$.inputSource}))}function F(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",H);for(let $=0;$<P.length;$++){let Q=w[$];Q!==null&&(w[$]=null,P[$].disconnect(Q))}I=null,L=null,m.reset();for(let $ in d)delete d[$];t.setRenderTarget(E),p=null,u=null,f=null,s=null,v=null,yt.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",F),s.addEventListener("inputsourceschange",H),A.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(T),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,dt=null,lt=null;A.depth&&(lt=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=A.stencil?cs:Yi,dt=A.stencil?ls:ni);let wt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(wt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Mn(u.textureWidth,u.textureHeight,{format:ln,type:gn,depthTexture:new Vs(u.textureWidth,u.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let st={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Mn(p.framebufferWidth,p.framebufferHeight,{format:ln,type:gn,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),yt.setContext(s),yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H($){for(let Q=0;Q<$.removed.length;Q++){let st=$.removed[Q],dt=w.indexOf(st);dt>=0&&(w[dt]=null,P[dt].disconnect(st))}for(let Q=0;Q<$.added.length;Q++){let st=$.added[Q],dt=w.indexOf(st);if(dt===-1){for(let wt=0;wt<P.length;wt++)if(wt>=w.length){w.push(st),dt=wt;break}else if(w[wt]===null){w[wt]=st,dt=wt;break}if(dt===-1)break}let lt=P[dt];lt&&lt.connect(st)}}let V=new N,W=new N;function j($,Q,st){V.setFromMatrixPosition(Q.matrixWorld),W.setFromMatrixPosition(st.matrixWorld);let dt=V.distanceTo(W),lt=Q.projectionMatrix.elements,wt=st.projectionMatrix.elements,se=lt[14]/(lt[10]-1),U=lt[14]/(lt[10]+1),le=(lt[9]+1)/lt[5],Xt=(lt[9]-1)/lt[5],Nt=(lt[8]-1)/lt[0],ft=(wt[8]+1)/wt[0],Jt=se*Nt,At=se*ft,Gt=dt/(-Nt+ft),de=Gt*-Nt;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(de),$.translateZ(Gt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),lt[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let xe=se+Gt,D=U+Gt,b=Jt-de,X=At+(dt-de),K=le*U/D*xe,rt=Xt*U/D*xe;$.projectionMatrix.makePerspective(b,X,K,rt,xe,D),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function nt($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let Q=$.near,st=$.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(st=m.depthFar)),C.near=y.near=_.near=Q,C.far=y.far=_.far=st,(I!==C.near||L!==C.far)&&(s.updateRenderState({depthNear:C.near,depthFar:C.far}),I=C.near,L=C.far),C.layers.mask=$.layers.mask|6,_.layers.mask=C.layers.mask&3,y.layers.mask=C.layers.mask&5;let dt=$.parent,lt=C.cameras;nt(C,dt);for(let wt=0;wt<lt.length;wt++)nt(lt[wt],dt);lt.length===2?j(C,_,y):C.projectionMatrix.copy(_.projectionMatrix),it($,C,dt)};function it($,Q,st){st===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(st.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Zi*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(C)},this.getCameraTexture=function($){return d[$]};let vt=null;function Et($,Q){if(h=Q.getViewerPose(l||o),g=Q,h!==null){let st=h.views;p!==null&&(t.setRenderTargetFramebuffer(v,p.framebuffer),t.setRenderTarget(v));let dt=!1;st.length!==C.cameras.length&&(C.cameras.length=0,dt=!0);for(let U=0;U<st.length;U++){let le=st[U],Xt=null;if(p!==null)Xt=p.getViewport(le);else{let ft=f.getViewSubImage(u,le);Xt=ft.viewport,U===0&&(t.setRenderTargetTextures(v,ft.colorTexture,ft.depthStencilTexture),t.setRenderTarget(v))}let Nt=R[U];Nt===void 0&&(Nt=new De,Nt.layers.enable(U),Nt.viewport=new re,R[U]=Nt),Nt.matrix.fromArray(le.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(le.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),U===0&&(C.matrix.copy(Nt.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),dt===!0&&C.cameras.push(Nt)}let lt=s.enabledFeatures;if(lt&&lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=n.getBinding();let U=f.getDepthInformation(st[0]);U&&U.isValid&&U.texture&&m.init(U,s.renderState)}if(lt&&lt.includes("camera-access")&&x){t.state.unbindTexture(),f=n.getBinding();for(let U=0;U<st.length;U++){let le=st[U].camera;if(le){let Xt=d[le];Xt||(Xt=new Hs,d[le]=Xt);let Nt=f.getCameraImage(le);Xt.sourceTexture=Nt}}}}for(let st=0;st<P.length;st++){let dt=w[st],lt=P[st];dt!==null&&lt!==void 0&&lt.update(dt,Q,l||o)}vt&&vt($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}let yt=new Fh;yt.setAnimationLoop(Et),this.setAnimationLoop=function($){vt=$},this.dispose=function(){}}},Si=new on,Ig=new ae;function Dg(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,yl(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,A,E,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),u(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,A,E):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Le&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Le&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let A=t.get(d),E=A.envMap,v=A.envMapRotation;E&&(m.envMap.value=E,Si.copy(v),Si.x*=-1,Si.y*=-1,Si.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),m.envMapRotation.value.setFromMatrix4(Ig.makeRotationFromEuler(Si)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,A,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=E*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Le&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let A=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lg(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,E){let v=E.program;n.uniformBlockBinding(A,v)}function l(A,E){let v=s[A.id];v===void 0&&(g(A),v=h(A),s[A.id]=v,A.addEventListener("dispose",m));let P=E.program;n.updateUBOMapping(A,P);let w=t.render.frame;r[A.id]!==w&&(u(A),r[A.id]=w)}function h(A){let E=f();A.__bindingPointIndex=E;let v=i.createBuffer(),P=A.__size,w=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,P,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function f(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(A){let E=s[A.id],v=A.uniforms,P=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,T=v.length;w<T;w++){let S=Array.isArray(v[w])?v[w]:[v[w]];for(let _=0,y=S.length;_<y;_++){let R=S[_];if(p(R,w,_,P)===!0){let C=R.__offset,I=Array.isArray(R.value)?R.value:[R.value],L=0;for(let O=0;O<I.length;O++){let F=I[O],H=x(F);typeof F=="number"||typeof F=="boolean"?(R.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,C+L,R.__data)):F.isMatrix3?(R.__data[0]=F.elements[0],R.__data[1]=F.elements[1],R.__data[2]=F.elements[2],R.__data[3]=0,R.__data[4]=F.elements[3],R.__data[5]=F.elements[4],R.__data[6]=F.elements[5],R.__data[7]=0,R.__data[8]=F.elements[6],R.__data[9]=F.elements[7],R.__data[10]=F.elements[8],R.__data[11]=0):(F.toArray(R.__data,L),L+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,C,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(A,E,v,P){let w=A.value,T=E+"_"+v;if(P[T]===void 0)return typeof w=="number"||typeof w=="boolean"?P[T]=w:P[T]=w.clone(),!0;{let S=P[T];if(typeof w=="number"||typeof w=="boolean"){if(S!==w)return P[T]=w,!0}else if(S.equals(w)===!1)return S.copy(w),!0}return!1}function g(A){let E=A.uniforms,v=0,P=16;for(let T=0,S=E.length;T<S;T++){let _=Array.isArray(E[T])?E[T]:[E[T]];for(let y=0,R=_.length;y<R;y++){let C=_[y],I=Array.isArray(C.value)?C.value:[C.value];for(let L=0,O=I.length;L<O;L++){let F=I[L],H=x(F),V=v%P,W=V%H.boundary,j=V+W;v+=W,j!==0&&P-j<H.storage&&(v+=P-j),C.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=v,v+=H.storage}}}let w=v%P;return w>0&&(v+=P-w),A.__size=v,A.__cache={},this}function x(A){let E={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(E.boundary=4,E.storage=4):A.isVector2?(E.boundary=8,E.storage=8):A.isVector3||A.isColor?(E.boundary=16,E.storage=12):A.isVector4?(E.boundary=16,E.storage=16):A.isMatrix3?(E.boundary=48,E.storage=48):A.isMatrix4?(E.boundary=64,E.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),E}function m(A){let E=A.target;E.removeEventListener("dispose",m);let v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function d(){for(let A in s)i.deleteBuffer(s[A]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var ca=class{constructor(t={}){let{canvas:e=lh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,d=null,A=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,P=!1;this._outputColorSpace=we;let w=0,T=0,S=null,_=-1,y=null,R=new re,C=new re,I=null,L=new Zt(0),O=0,F=e.width,H=e.height,V=1,W=null,j=null,nt=new re(0,0,F,H),it=new re(0,0,F,H),vt=!1,Et=new ts,yt=!1,$=!1,Q=new ae,st=new N,dt=new re,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},wt=!1;function se(){return S===null?V:1}let U=n;function le(M,k){return e.getContext(M,k)}try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",at,!1),U===null){let k="webgl2";if(U=le(k,M),U===null)throw le(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Xt,Nt,ft,Jt,At,Gt,de,xe,D,b,X,K,rt,J,Lt,ut,Pt,Rt,ht,gt,zt,It,_t,kt;function z(){Xt=new Kp(U),Xt.init(),It=new Cg(U,Xt),Nt=new Wp(U,Xt,t,It),ft=new Eg(U,Xt),Nt.reversedDepthBuffer&&u&&ft.buffers.depth.setReversed(!0),Jt=new tm(U),At=new fg,Gt=new Ag(U,Xt,ft,At,Nt,It,Jt),de=new qp(v),xe=new Jp(v),D=new rd(U),_t=new Hp(U,D),b=new jp(U,D,Jt,_t),X=new nm(U,b,D,Jt),ht=new em(U,Nt,Gt),ut=new Xp(At),K=new dg(v,de,xe,Xt,Nt,_t,ut),rt=new Dg(v,At),J=new mg,Lt=new Mg(Xt),Rt=new Vp(v,de,xe,ft,X,p,c),Pt=new Tg(v,X,Nt),kt=new Lg(U,Jt,Nt,ft),gt=new Gp(U,Xt,Jt),zt=new Qp(U,Xt,Jt),Jt.programs=K.programs,v.capabilities=Nt,v.extensions=Xt,v.properties=At,v.renderLists=J,v.shadowMap=Pt,v.state=ft,v.info=Jt}z();let ct=new Fl(v,U);this.xr=ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=Xt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Xt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(F,H,!1))},this.getSize=function(M){return M.set(F,H)},this.setSize=function(M,k,Z=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=M,H=k,e.width=Math.floor(M*V),e.height=Math.floor(k*V),Z===!0&&(e.style.width=M+"px",e.style.height=k+"px"),this.setViewport(0,0,M,k)},this.getDrawingBufferSize=function(M){return M.set(F*V,H*V).floor()},this.setDrawingBufferSize=function(M,k,Z){F=M,H=k,V=Z,e.width=Math.floor(M*Z),e.height=Math.floor(k*Z),this.setViewport(0,0,M,k)},this.getCurrentViewport=function(M){return M.copy(R)},this.getViewport=function(M){return M.copy(nt)},this.setViewport=function(M,k,Z,Y){M.isVector4?nt.set(M.x,M.y,M.z,M.w):nt.set(M,k,Z,Y),ft.viewport(R.copy(nt).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(it)},this.setScissor=function(M,k,Z,Y){M.isVector4?it.set(M.x,M.y,M.z,M.w):it.set(M,k,Z,Y),ft.scissor(C.copy(it).multiplyScalar(V).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(M){ft.setScissorTest(vt=M)},this.setOpaqueSort=function(M){W=M},this.setTransparentSort=function(M){j=M},this.getClearColor=function(M){return M.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(M=!0,k=!0,Z=!0){let Y=0;if(M){let G=!1;if(S!==null){let ot=S.texture.format;G=ot===Po||ot===Ro||ot===Co}if(G){let ot=S.texture.type,mt=ot===gn||ot===ni||ot===os||ot===ls||ot===wo||ot===Eo,bt=Rt.getClearColor(),Mt=Rt.getClearAlpha(),Ot=bt.r,Wt=bt.g,Ft=bt.b;mt?(g[0]=Ot,g[1]=Wt,g[2]=Ft,g[3]=Mt,U.clearBufferuiv(U.COLOR,0,g)):(x[0]=Ot,x[1]=Wt,x[2]=Ft,x[3]=Mt,U.clearBufferiv(U.COLOR,0,x))}else Y|=U.COLOR_BUFFER_BIT}k&&(Y|=U.DEPTH_BUFFER_BIT),Z&&(Y|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",at,!1),Rt.dispose(),J.dispose(),Lt.dispose(),At.dispose(),de.dispose(),xe.dispose(),X.dispose(),_t.dispose(),kt.dispose(),K.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",$e),ct.removeEventListener("sessionend",lr),xn.stop()};function pt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let M=Jt.autoReset,k=Pt.enabled,Z=Pt.autoUpdate,Y=Pt.needsUpdate,G=Pt.type;z(),Jt.autoReset=M,Pt.enabled=k,Pt.autoUpdate=Z,Pt.needsUpdate=Y,Pt.type=G}function at(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function tt(M){let k=M.target;k.removeEventListener("dispose",tt),Ct(k)}function Ct(M){qt(M),At.remove(M)}function qt(M){let k=At.get(M).programs;k!==void 0&&(k.forEach(function(Z){K.releaseProgram(Z)}),M.isShaderMaterial&&K.releaseShaderCache(M))}this.renderBufferDirect=function(M,k,Z,Y,G,ot){k===null&&(k=lt);let mt=G.isMesh&&G.matrixWorld.determinant()<0,bt=Dt(M,k,Z,Y,G);ft.setMaterial(Y,mt);let Mt=Z.index,Ot=1;if(Y.wireframe===!0){if(Mt=b.getWireframeAttribute(Z),Mt===void 0)return;Ot=2}let Wt=Z.drawRange,Ft=Z.attributes.position,te=Wt.start*Ot,ce=(Wt.start+Wt.count)*Ot;ot!==null&&(te=Math.max(te,ot.start*Ot),ce=Math.min(ce,(ot.start+ot.count)*Ot)),Mt!==null?(te=Math.max(te,0),ce=Math.min(ce,Mt.count)):Ft!=null&&(te=Math.max(te,0),ce=Math.min(ce,Ft.count));let Se=ce-te;if(Se<0||Se===1/0)return;_t.setup(G,Y,bt,Z,Mt);let ge,fe=gt;if(Mt!==null&&(ge=D.get(Mt),fe=zt,fe.setIndex(ge)),G.isMesh)Y.wireframe===!0?(ft.setLineWidth(Y.wireframeLinewidth*se()),fe.setMode(U.LINES)):fe.setMode(U.TRIANGLES);else if(G.isLine){let Vt=Y.linewidth;Vt===void 0&&(Vt=1),ft.setLineWidth(Vt*se()),G.isLineSegments?fe.setMode(U.LINES):G.isLineLoop?fe.setMode(U.LINE_LOOP):fe.setMode(U.LINE_STRIP)}else G.isPoints?fe.setMode(U.POINTS):G.isSprite&&fe.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ji("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))fe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Vt=G._multiDrawStarts,ve=G._multiDrawCounts,ne=G._multiDrawCount,Je=Mt?D.get(Mt).bytesPerElement:1,Ai=At.get(Y).currentProgram.getUniforms();for(let Ke=0;Ke<ne;Ke++)Ai.setValue(U,"_gl_DrawID",Ke),fe.render(Vt[Ke]/Je,ve[Ke])}else if(G.isInstancedMesh)fe.renderInstances(te,Se,G.count);else if(Z.isInstancedBufferGeometry){let Vt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,ve=Math.min(Z.instanceCount,Vt);fe.renderInstances(te,Se,ve)}else fe.render(te,Se)};function ie(M,k,Z){M.transparent===!0&&M.side===wn&&M.forceSinglePass===!1?(M.side=Le,M.needsUpdate=!0,q(M,k,Z),M.side=Un,M.needsUpdate=!0,q(M,k,Z),M.side=wn):q(M,k,Z)}this.compile=function(M,k,Z=null){Z===null&&(Z=M),d=Lt.get(Z),d.init(k),E.push(d),Z.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),M!==Z&&M.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();let Y=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let ot=G.material;if(ot)if(Array.isArray(ot))for(let mt=0;mt<ot.length;mt++){let bt=ot[mt];ie(bt,Z,G),Y.add(bt)}else ie(ot,Z,G),Y.add(ot)}),d=E.pop(),Y},this.compileAsync=function(M,k,Z=null){let Y=this.compile(M,k,Z);return new Promise(G=>{function ot(){if(Y.forEach(function(mt){At.get(mt).currentProgram.isReady()&&Y.delete(mt)}),Y.size===0){G(M);return}setTimeout(ot,10)}Xt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let jt=null;function en(M){jt&&jt(M)}function $e(){xn.stop()}function lr(){xn.start()}let xn=new Fh;xn.setAnimationLoop(en),typeof self<"u"&&xn.setContext(self),this.setAnimationLoop=function(M){jt=M,ct.setAnimationLoop(M),M===null?xn.stop():xn.start()},ct.addEventListener("sessionstart",$e),ct.addEventListener("sessionend",lr),this.render=function(M,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(k),k=ct.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,k,S),d=Lt.get(M,E.length),d.init(k),E.push(d),Q.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Et.setFromProjectionMatrix(Q,dn,k.reversedDepth),$=this.localClippingEnabled,yt=ut.init(this.clippingPlanes,$),m=J.get(M,A.length),m.init(),A.push(m),ct.enabled===!0&&ct.isPresenting===!0){let ot=v.xr.getDepthSensingMesh();ot!==null&&zn(ot,k,-1/0,v.sortObjects)}zn(M,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(W,j),wt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,wt&&Rt.addToRenderList(m,M),this.info.render.frame++,yt===!0&&ut.beginShadows();let Z=d.state.shadowsArray;Pt.render(Z,M,k),yt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();let Y=m.opaque,G=m.transmissive;if(d.setupLights(),k.isArrayCamera){let ot=k.cameras;if(G.length>0)for(let mt=0,bt=ot.length;mt<bt;mt++){let Mt=ot[mt];vs(Y,G,M,Mt)}wt&&Rt.render(M);for(let mt=0,bt=ot.length;mt<bt;mt++){let Mt=ot[mt];kn(m,M,Mt,Mt.viewport)}}else G.length>0&&vs(Y,G,M,k),wt&&Rt.render(M),kn(m,M,k);S!==null&&T===0&&(Gt.updateMultisampleRenderTarget(S),Gt.updateRenderTargetMipmap(S)),M.isScene===!0&&M.onAfterRender(v,M,k),_t.resetDefaultState(),_=-1,y=null,E.pop(),E.length>0?(d=E[E.length-1],yt===!0&&ut.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function zn(M,k,Z,Y){if(M.visible===!1)return;if(M.layers.test(k.layers)){if(M.isGroup)Z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(k);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Et.intersectsSprite(M)){Y&&dt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Q);let mt=X.update(M),bt=M.material;bt.visible&&m.push(M,mt,bt,Z,dt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Et.intersectsObject(M))){let mt=X.update(M),bt=M.material;if(Y&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),dt.copy(M.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),dt.copy(mt.boundingSphere.center)),dt.applyMatrix4(M.matrixWorld).applyMatrix4(Q)),Array.isArray(bt)){let Mt=mt.groups;for(let Ot=0,Wt=Mt.length;Ot<Wt;Ot++){let Ft=Mt[Ot],te=bt[Ft.materialIndex];te&&te.visible&&m.push(M,mt,te,Z,dt.z,Ft)}}else bt.visible&&m.push(M,mt,bt,Z,dt.z,null)}}let ot=M.children;for(let mt=0,bt=ot.length;mt<bt;mt++)zn(ot[mt],k,Z,Y)}function kn(M,k,Z,Y){let G=M.opaque,ot=M.transmissive,mt=M.transparent;d.setupLightsView(Z),yt===!0&&ut.setGlobalState(v.clippingPlanes,Z),Y&&ft.viewport(R.copy(Y)),G.length>0&&yn(G,k,Z),ot.length>0&&yn(ot,k,Z),mt.length>0&&yn(mt,k,Z),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function vs(M,k,Z,Y){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Y.id]===void 0&&(d.state.transmissionRenderTarget[Y.id]=new Mn(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?as:gn,minFilter:ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));let ot=d.state.transmissionRenderTarget[Y.id],mt=Y.viewport||R;ot.setSize(mt.z*v.transmissionResolutionScale,mt.w*v.transmissionResolutionScale);let bt=v.getRenderTarget(),Mt=v.getActiveCubeFace(),Ot=v.getActiveMipmapLevel();v.setRenderTarget(ot),v.getClearColor(L),O=v.getClearAlpha(),O<1&&v.setClearColor(16777215,.5),v.clear(),wt&&Rt.render(Z);let Wt=v.toneMapping;v.toneMapping=On;let Ft=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),d.setupLightsView(Y),yt===!0&&ut.setGlobalState(v.clippingPlanes,Y),yn(M,Z,Y),Gt.updateMultisampleRenderTarget(ot),Gt.updateRenderTargetMipmap(ot),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let ce=0,Se=k.length;ce<Se;ce++){let ge=k[ce],fe=ge.object,Vt=ge.geometry,ve=ge.material,ne=ge.group;if(ve.side===wn&&fe.layers.test(Y.layers)){let Je=ve.side;ve.side=Le,ve.needsUpdate=!0,B(fe,Z,Y,Vt,ve,ne),ve.side=Je,ve.needsUpdate=!0,te=!0}}te===!0&&(Gt.updateMultisampleRenderTarget(ot),Gt.updateRenderTargetMipmap(ot))}v.setRenderTarget(bt,Mt,Ot),v.setClearColor(L,O),Ft!==void 0&&(Y.viewport=Ft),v.toneMapping=Wt}function yn(M,k,Z){let Y=k.isScene===!0?k.overrideMaterial:null;for(let G=0,ot=M.length;G<ot;G++){let mt=M[G],bt=mt.object,Mt=mt.geometry,Ot=mt.group,Wt=mt.material;Wt.allowOverride===!0&&Y!==null&&(Wt=Y),bt.layers.test(Z.layers)&&B(bt,k,Z,Mt,Wt,Ot)}}function B(M,k,Z,Y,G,ot){M.onBeforeRender(v,k,Z,Y,G,ot),M.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(v,k,Z,Y,M,ot),G.transparent===!0&&G.side===wn&&G.forceSinglePass===!1?(G.side=Le,G.needsUpdate=!0,v.renderBufferDirect(Z,k,Y,G,M,ot),G.side=Un,G.needsUpdate=!0,v.renderBufferDirect(Z,k,Y,G,M,ot),G.side=wn):v.renderBufferDirect(Z,k,Y,G,M,ot),M.onAfterRender(v,k,Z,Y,G,ot)}function q(M,k,Z){k.isScene!==!0&&(k=lt);let Y=At.get(M),G=d.state.lights,ot=d.state.shadowsArray,mt=G.state.version,bt=K.getParameters(M,G.state,ot,k,Z),Mt=K.getProgramCacheKey(bt),Ot=Y.programs;Y.environment=M.isMeshStandardMaterial?k.environment:null,Y.fog=k.fog,Y.envMap=(M.isMeshStandardMaterial?xe:de).get(M.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&M.envMap===null?k.environmentRotation:M.envMapRotation,Ot===void 0&&(M.addEventListener("dispose",tt),Ot=new Map,Y.programs=Ot);let Wt=Ot.get(Mt);if(Wt!==void 0){if(Y.currentProgram===Wt&&Y.lightsStateVersion===mt)return Tt(M,bt),Wt}else bt.uniforms=K.getUniforms(M),M.onBeforeCompile(bt,v),Wt=K.acquireProgram(bt,Mt),Ot.set(Mt,Wt),Y.uniforms=bt.uniforms;let Ft=Y.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ft.clippingPlanes=ut.uniform),Tt(M,bt),Y.needsLights=Ht(M),Y.lightsStateVersion=mt,Y.needsLights&&(Ft.ambientLightColor.value=G.state.ambient,Ft.lightProbe.value=G.state.probe,Ft.directionalLights.value=G.state.directional,Ft.directionalLightShadows.value=G.state.directionalShadow,Ft.spotLights.value=G.state.spot,Ft.spotLightShadows.value=G.state.spotShadow,Ft.rectAreaLights.value=G.state.rectArea,Ft.ltc_1.value=G.state.rectAreaLTC1,Ft.ltc_2.value=G.state.rectAreaLTC2,Ft.pointLights.value=G.state.point,Ft.pointLightShadows.value=G.state.pointShadow,Ft.hemisphereLights.value=G.state.hemi,Ft.directionalShadowMap.value=G.state.directionalShadowMap,Ft.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ft.spotShadowMap.value=G.state.spotShadowMap,Ft.spotLightMatrix.value=G.state.spotLightMatrix,Ft.spotLightMap.value=G.state.spotLightMap,Ft.pointShadowMap.value=G.state.pointShadowMap,Ft.pointShadowMatrix.value=G.state.pointShadowMatrix),Y.currentProgram=Wt,Y.uniformsList=null,Wt}function et(M){if(M.uniformsList===null){let k=M.currentProgram.getUniforms();M.uniformsList=fs.seqWithValue(k.seq,M.uniforms)}return M.uniformsList}function Tt(M,k){let Z=At.get(M);Z.outputColorSpace=k.outputColorSpace,Z.batching=k.batching,Z.batchingColor=k.batchingColor,Z.instancing=k.instancing,Z.instancingColor=k.instancingColor,Z.instancingMorph=k.instancingMorph,Z.skinning=k.skinning,Z.morphTargets=k.morphTargets,Z.morphNormals=k.morphNormals,Z.morphColors=k.morphColors,Z.morphTargetsCount=k.morphTargetsCount,Z.numClippingPlanes=k.numClippingPlanes,Z.numIntersection=k.numClipIntersection,Z.vertexAlphas=k.vertexAlphas,Z.vertexTangents=k.vertexTangents,Z.toneMapping=k.toneMapping}function Dt(M,k,Z,Y,G){k.isScene!==!0&&(k=lt),Gt.resetTextureUnits();let ot=k.fog,mt=Y.isMeshStandardMaterial?k.environment:null,bt=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:di,Mt=(Y.isMeshStandardMaterial?xe:de).get(Y.envMap||mt),Ot=Y.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Wt=!!Z.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ft=!!Z.morphAttributes.position,te=!!Z.morphAttributes.normal,ce=!!Z.morphAttributes.color,Se=On;Y.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(Se=v.toneMapping);let ge=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,fe=ge!==void 0?ge.length:0,Vt=At.get(Y),ve=d.state.lights;if(yt===!0&&($===!0||M!==y)){let Be=M===y&&Y.id===_;ut.setState(Y,M,Be)}let ne=!1;Y.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==ve.state.version||Vt.outputColorSpace!==bt||G.isBatchedMesh&&Vt.batching===!1||!G.isBatchedMesh&&Vt.batching===!0||G.isBatchedMesh&&Vt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Vt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Vt.instancing===!1||!G.isInstancedMesh&&Vt.instancing===!0||G.isSkinnedMesh&&Vt.skinning===!1||!G.isSkinnedMesh&&Vt.skinning===!0||G.isInstancedMesh&&Vt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Vt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Vt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Vt.instancingMorph===!1&&G.morphTexture!==null||Vt.envMap!==Mt||Y.fog===!0&&Vt.fog!==ot||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==ut.numPlanes||Vt.numIntersection!==ut.numIntersection)||Vt.vertexAlphas!==Ot||Vt.vertexTangents!==Wt||Vt.morphTargets!==Ft||Vt.morphNormals!==te||Vt.morphColors!==ce||Vt.toneMapping!==Se||Vt.morphTargetsCount!==fe)&&(ne=!0):(ne=!0,Vt.__version=Y.version);let Je=Vt.currentProgram;ne===!0&&(Je=q(Y,k,G));let Ai=!1,Ke=!1,Ms=!1,Me=Je.getUniforms(),nn=Vt.uniforms;if(ft.useProgram(Je.program)&&(Ai=!0,Ke=!0,Ms=!0),Y.id!==_&&(_=Y.id,Ke=!0),Ai||y!==M){ft.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Me.setValue(U,"projectionMatrix",M.projectionMatrix),Me.setValue(U,"viewMatrix",M.matrixWorldInverse);let He=Me.map.cameraPosition;He!==void 0&&He.setValue(U,st.setFromMatrixPosition(M.matrixWorld)),Nt.logarithmicDepthBuffer&&Me.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Me.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Ke=!0,Ms=!0)}if(G.isSkinnedMesh){Me.setOptional(U,G,"bindMatrix"),Me.setOptional(U,G,"bindMatrixInverse");let Be=G.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),Me.setValue(U,"boneTexture",Be.boneTexture,Gt))}G.isBatchedMesh&&(Me.setOptional(U,G,"batchingTexture"),Me.setValue(U,"batchingTexture",G._matricesTexture,Gt),Me.setOptional(U,G,"batchingIdTexture"),Me.setValue(U,"batchingIdTexture",G._indirectTexture,Gt),Me.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&Me.setValue(U,"batchingColorTexture",G._colorsTexture,Gt));let sn=Z.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&ht.update(G,Z,Je),(Ke||Vt.receiveShadow!==G.receiveShadow)&&(Vt.receiveShadow=G.receiveShadow,Me.setValue(U,"receiveShadow",G.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(nn.envMap.value=Mt,nn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&k.environment!==null&&(nn.envMapIntensity.value=k.environmentIntensity),Ke&&(Me.setValue(U,"toneMappingExposure",v.toneMappingExposure),Vt.needsLights&&Ut(nn,Ms),ot&&Y.fog===!0&&rt.refreshFogUniforms(nn,ot),rt.refreshMaterialUniforms(nn,Y,V,H,d.state.transmissionRenderTarget[M.id]),fs.upload(U,et(Vt),nn,Gt)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(fs.upload(U,et(Vt),nn,Gt),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Me.setValue(U,"center",G.center),Me.setValue(U,"modelViewMatrix",G.modelViewMatrix),Me.setValue(U,"normalMatrix",G.normalMatrix),Me.setValue(U,"modelMatrix",G.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let Be=Y.uniformsGroups;for(let He=0,ma=Be.length;He<ma;He++){let si=Be[He];kt.update(si,Je),kt.bind(si,Je)}}return Je}function Ut(M,k){M.ambientLightColor.needsUpdate=k,M.lightProbe.needsUpdate=k,M.directionalLights.needsUpdate=k,M.directionalLightShadows.needsUpdate=k,M.pointLights.needsUpdate=k,M.pointLightShadows.needsUpdate=k,M.spotLights.needsUpdate=k,M.spotLightShadows.needsUpdate=k,M.rectAreaLights.needsUpdate=k,M.hemisphereLights.needsUpdate=k}function Ht(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(M,k,Z){let Y=At.get(M);Y.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),At.get(M.texture).__webglTexture=k,At.get(M.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:Z,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,k){let Z=At.get(M);Z.__webglFramebuffer=k,Z.__useDefaultFramebuffer=k===void 0};let Qt=U.createFramebuffer();this.setRenderTarget=function(M,k=0,Z=0){S=M,w=k,T=Z;let Y=!0,G=null,ot=!1,mt=!1;if(M){let Mt=At.get(M);if(Mt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(U.FRAMEBUFFER,null),Y=!1;else if(Mt.__webglFramebuffer===void 0)Gt.setupRenderTarget(M);else if(Mt.__hasExternalTextures)Gt.rebindTextures(M,At.get(M.texture).__webglTexture,At.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Ft=M.depthTexture;if(Mt.__boundDepthTexture!==Ft){if(Ft!==null&&At.has(Ft)&&(M.width!==Ft.image.width||M.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Gt.setupDepthRenderbuffer(M)}}let Ot=M.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(mt=!0);let Wt=At.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Wt[k])?G=Wt[k][Z]:G=Wt[k],ot=!0):M.samples>0&&Gt.useMultisampledRTT(M)===!1?G=At.get(M).__webglMultisampledFramebuffer:Array.isArray(Wt)?G=Wt[Z]:G=Wt,R.copy(M.viewport),C.copy(M.scissor),I=M.scissorTest}else R.copy(nt).multiplyScalar(V).floor(),C.copy(it).multiplyScalar(V).floor(),I=vt;if(Z!==0&&(G=Qt),ft.bindFramebuffer(U.FRAMEBUFFER,G)&&Y&&ft.drawBuffers(M,G),ft.viewport(R),ft.scissor(C),ft.setScissorTest(I),ot){let Mt=At.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,Mt.__webglTexture,Z)}else if(mt){let Mt=k;for(let Ot=0;Ot<M.textures.length;Ot++){let Wt=At.get(M.textures[Ot]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ot,Wt.__webglTexture,Z,Mt)}}else if(M!==null&&Z!==0){let Mt=At.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Mt.__webglTexture,Z)}_=-1},this.readRenderTargetPixels=function(M,k,Z,Y,G,ot,mt,bt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=At.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&mt!==void 0&&(Mt=Mt[mt]),Mt){ft.bindFramebuffer(U.FRAMEBUFFER,Mt);try{let Ot=M.textures[bt],Wt=Ot.format,Ft=Ot.type;if(!Nt.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=M.width-Y&&Z>=0&&Z<=M.height-G&&(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+bt),U.readPixels(k,Z,Y,G,It.convert(Wt),It.convert(Ft),ot))}finally{let Ot=S!==null?At.get(S).__webglFramebuffer:null;ft.bindFramebuffer(U.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(M,k,Z,Y,G,ot,mt,bt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=At.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&mt!==void 0&&(Mt=Mt[mt]),Mt)if(k>=0&&k<=M.width-Y&&Z>=0&&Z<=M.height-G){ft.bindFramebuffer(U.FRAMEBUFFER,Mt);let Ot=M.textures[bt],Wt=Ot.format,Ft=Ot.type;if(!Nt.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,te),U.bufferData(U.PIXEL_PACK_BUFFER,ot.byteLength,U.STREAM_READ),M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+bt),U.readPixels(k,Z,Y,G,It.convert(Wt),It.convert(Ft),0);let ce=S!==null?At.get(S).__webglFramebuffer:null;ft.bindFramebuffer(U.FRAMEBUFFER,ce);let Se=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ch(U,Se,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,te),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ot),U.deleteBuffer(te),U.deleteSync(Se),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,k=null,Z=0){let Y=Math.pow(2,-Z),G=Math.floor(M.image.width*Y),ot=Math.floor(M.image.height*Y),mt=k!==null?k.x:0,bt=k!==null?k.y:0;Gt.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,mt,bt,G,ot),ft.unbindTexture()};let pe=U.createFramebuffer(),me=U.createFramebuffer();this.copyTextureToTexture=function(M,k,Z=null,Y=null,G=0,ot=null){ot===null&&(G!==0?(Ji("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ot=G,G=0):ot=0);let mt,bt,Mt,Ot,Wt,Ft,te,ce,Se,ge=M.isCompressedTexture?M.mipmaps[ot]:M.image;if(Z!==null)mt=Z.max.x-Z.min.x,bt=Z.max.y-Z.min.y,Mt=Z.isBox3?Z.max.z-Z.min.z:1,Ot=Z.min.x,Wt=Z.min.y,Ft=Z.isBox3?Z.min.z:0;else{let sn=Math.pow(2,-G);mt=Math.floor(ge.width*sn),bt=Math.floor(ge.height*sn),M.isDataArrayTexture?Mt=ge.depth:M.isData3DTexture?Mt=Math.floor(ge.depth*sn):Mt=1,Ot=0,Wt=0,Ft=0}Y!==null?(te=Y.x,ce=Y.y,Se=Y.z):(te=0,ce=0,Se=0);let fe=It.convert(k.format),Vt=It.convert(k.type),ve;k.isData3DTexture?(Gt.setTexture3D(k,0),ve=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Gt.setTexture2DArray(k,0),ve=U.TEXTURE_2D_ARRAY):(Gt.setTexture2D(k,0),ve=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let ne=U.getParameter(U.UNPACK_ROW_LENGTH),Je=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Ai=U.getParameter(U.UNPACK_SKIP_PIXELS),Ke=U.getParameter(U.UNPACK_SKIP_ROWS),Ms=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ge.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ge.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ot),U.pixelStorei(U.UNPACK_SKIP_ROWS,Wt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ft);let Me=M.isDataArrayTexture||M.isData3DTexture,nn=k.isDataArrayTexture||k.isData3DTexture;if(M.isDepthTexture){let sn=At.get(M),Be=At.get(k),He=At.get(sn.__renderTarget),ma=At.get(Be.__renderTarget);ft.bindFramebuffer(U.READ_FRAMEBUFFER,He.__webglFramebuffer),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,ma.__webglFramebuffer);for(let si=0;si<Mt;si++)Me&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(M).__webglTexture,G,Ft+si),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(k).__webglTexture,ot,Se+si)),U.blitFramebuffer(Ot,Wt,mt,bt,te,ce,mt,bt,U.DEPTH_BUFFER_BIT,U.NEAREST);ft.bindFramebuffer(U.READ_FRAMEBUFFER,null),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||At.has(M)){let sn=At.get(M),Be=At.get(k);ft.bindFramebuffer(U.READ_FRAMEBUFFER,pe),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,me);for(let He=0;He<Mt;He++)Me?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,sn.__webglTexture,G,Ft+He):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,sn.__webglTexture,G),nn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.__webglTexture,ot,Se+He):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Be.__webglTexture,ot),G!==0?U.blitFramebuffer(Ot,Wt,mt,bt,te,ce,mt,bt,U.COLOR_BUFFER_BIT,U.NEAREST):nn?U.copyTexSubImage3D(ve,ot,te,ce,Se+He,Ot,Wt,mt,bt):U.copyTexSubImage2D(ve,ot,te,ce,Ot,Wt,mt,bt);ft.bindFramebuffer(U.READ_FRAMEBUFFER,null),ft.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else nn?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(ve,ot,te,ce,Se,mt,bt,Mt,fe,Vt,ge.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(ve,ot,te,ce,Se,mt,bt,Mt,fe,ge.data):U.texSubImage3D(ve,ot,te,ce,Se,mt,bt,Mt,fe,Vt,ge):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ot,te,ce,mt,bt,fe,Vt,ge.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ot,te,ce,ge.width,ge.height,fe,ge.data):U.texSubImage2D(U.TEXTURE_2D,ot,te,ce,mt,bt,fe,Vt,ge);U.pixelStorei(U.UNPACK_ROW_LENGTH,ne),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Je),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ai),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ke),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ms),ot===0&&k.generateMipmaps&&U.generateMipmap(ve),ft.unbindTexture()},this.initRenderTarget=function(M){At.get(M).__webglFramebuffer===void 0&&Gt.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Gt.setTextureCube(M,0):M.isData3DTexture?Gt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Gt.setTexture2DArray(M,0):Gt.setTexture2D(M,0),ft.unbindTexture()},this.resetState=function(){w=0,T=0,S=null,ft.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var Hh={type:"change"},zl={type:"start"},Wh={type:"end"},ua=new bn,Gh=new ke,Ug=Math.cos(70*_l.DEG2RAD),Re=new N,Ze=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bl=1e-6,da=class extends js{constructor(t,e=null){super(t,e),this.state=ue.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qn.ROTATE,MIDDLE:Qn.DOLLY,RIGHT:Qn.PAN},this.touches={ONE:ti.ROTATE,TWO:ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Xe,this._lastTargetPosition=new N,this._quat=new Xe().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new rs,this._sphericalDelta=new rs,this._scale=1,this._panOffset=new N,this._rotateStart=new Bt,this._rotateEnd=new Bt,this._rotateDelta=new Bt,this._panStart=new Bt,this._panEnd=new Bt,this._panDelta=new Bt,this._dollyStart=new Bt,this._dollyEnd=new Bt,this._dollyDelta=new Bt,this._dollyDirection=new N,this._mouse=new Bt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Fg.bind(this),this._onPointerDown=Ng.bind(this),this._onPointerUp=Og.bind(this),this._onContextMenu=Wg.bind(this),this._onMouseWheel=kg.bind(this),this._onKeyDown=Vg.bind(this),this._onTouchStart=Hg.bind(this),this._onTouchMove=Gg.bind(this),this._onMouseDown=Bg.bind(this),this._onMouseMove=zg.bind(this),this._interceptControlDown=Xg.bind(this),this._interceptControlUp=qg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hh),this.update(),this.state=ue.NONE}update(t=null){let e=this.object.position;Re.copy(e).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ze:n>Math.PI&&(n-=Ze),s<-Math.PI?s+=Ze:s>Math.PI&&(s-=Ze),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),e.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Re.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ua.origin.copy(this.object.position),ua.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ua.direction))<Ug?this.object.lookAt(this.target):(Gh.setFromNormalAndCoplanarPoint(this.object.up,this.target),ua.intersectPlane(Gh,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Bl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bl||this._lastTargetPosition.distanceToSquared(this.target)>Bl?(this.dispatchEvent(Hh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ze/60*this.autoRotateSpeed*t:Ze/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Re.setFromMatrixColumn(e,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,e){this.screenSpacePanning===!0?Re.setFromMatrixColumn(e,1):(Re.setFromMatrixColumn(e,0),Re.crossVectors(this.object.up,Re)),Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Re.copy(s).sub(this.target);let r=Re.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Bt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ng(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Fg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Og(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Wh),this.state=ue.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Bg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ue.DOLLY;break;case Qn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}break;case Qn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(zl)}function zg(i){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function kg(i){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(i.preventDefault(),this.dispatchEvent(zl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Wh))}function Vg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Hg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ue.TOUCH_ROTATE;break;case ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ue.TOUCH_DOLLY_PAN;break;case ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(zl)}function Gg(i){switch(this._trackPointer(i),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ue.NONE}}function Wg(i){this.enabled!==!1&&i.preventDefault()}function Xg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var fa=class extends mi{constructor(){super();let t=new an;t.deleteAttribute("uv");let e=new mn({side:Le}),n=new mn,s=new Zs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new he(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Jn(t,n,6),a=new Ee;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new he(t,gs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new he(t,gs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new he(t,gs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new he(t,gs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new he(t,gs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let p=new he(t,gs(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function gs(i){return new ye({color:0,emissive:16777215,emissiveIntensity:i})}var Xh=new Map,qh=()=>new Map,Yh=4,Zh=i=>{Yh=Math.min(8,i||4)},Vl=i=>()=>(i=i*16807%2147483647)/2147483647,kl=i=>[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)],$h=(i,t)=>`rgb(${i.map(e=>Math.max(0,Math.min(255,Math.round(e*t)))).join(",")})`;function _s(i){let t=document.createElement("canvas");return t.width=t.height=i,t}function Jh(i,t=2){let e=i.width,n=i.getContext("2d").getImageData(0,0,e,e).data,s=_s(e),r=s.getContext("2d"),o=r.createImageData(e,e),a=o.data,c=(l,h)=>n[((h+e)%e*e+(l+e)%e)*4]/255;for(let l=0;l<e;l++)for(let h=0;h<e;h++){let f=(c(h+1,l)-c(h-1,l))*t,u=(c(h,l+1)-c(h,l-1))*t,p=Math.hypot(f,u,1),g=(l*e+h)*4;a[g]=(-f/p*.5+.5)*255,a[g+1]=(u/p*.5+.5)*255,a[g+2]=(1/p*.5+.5)*255,a[g+3]=255}return r.putImageData(o,0,0),s}function or(i,t){let e=new gi(i);return e.wrapS=e.wrapT=$n,e.anisotropy=Yh,t&&(e.colorSpace=we),e}function Yg(i,t=512){let s=_s(t),r=_s(t),o=s.getContext("2d"),a=r.getContext("2d"),c=Vl(Hl(i.base)||7),l=kl(i.base),h=kl(i.grain||i.base);a.fillStyle="#808080",a.fillRect(0,0,t,t);let f=t/7;for(let u=0;u<7;u++){let p=c()*t,g=[[-t+p,p],[p,p+t]];for(let[x,m]of g){let d=1+(c()-.5)*2*(i.var??.05);o.fillStyle=$h(l,d),o.fillRect(u*f,x,f,m-x);for(let A=0;A<26;A++){let E=u*f+c()*f,v=.4+c()*1.4;o.strokeStyle=`rgba(${h.join(",")},${.06+c()*.16})`,o.lineWidth=v,o.beginPath(),o.moveTo(E,x);for(let P=x;P<=m;P+=16)o.lineTo(E+Math.sin(P*.02+A)*1.6+(c()-.5),P);o.stroke(),a.strokeStyle=`rgba(150,150,150,${.15+c()*.2})`,a.lineWidth=v,a.stroke()}if(c()<.25){let A=u*f+f*(.2+c()*.6),E=x+(m-x)*c();o.fillStyle=`rgba(${h.join(",")},.35)`,o.beginPath(),o.ellipse(A,E,2+c()*3,5+c()*6,0,0,7),o.fill()}o.fillStyle="rgba(40,28,18,.55)",o.fillRect(u*f,x-1,f,2),a.fillStyle="#303030",a.fillRect(u*f,x-1,f,2)}o.fillStyle="rgba(40,28,18,.5)",o.fillRect(u*f-1,0,1.5,t),a.fillStyle="#303030",a.fillRect(u*f-1,0,1.5,t)}return{map:or(s,!0),normalMap:or(Jh(r,1.6)),size:[1.22,1.22],roughness:.55}}function Zg(i,t=512){let[e,n]=i.tile,s=Math.max(1,Math.round(1.2/e)),r=Math.max(1,Math.round(1.2/n)),o=[s*e,r*n],a=_s(t),c=_s(t),l=a.getContext("2d"),h=c.getContext("2d"),f=Vl(Hl(i.base+i.tone)||11),u=kl(i.base),p=Math.max(1.5,.003/o[0]*t);l.fillStyle=i.grout,l.fillRect(0,0,t,t),h.fillStyle="#404040",h.fillRect(0,0,t,t);let g=t/s,x=t/r;for(let m=0;m<r;m++)for(let d=-1;d<=s;d++){let A=i.pattern==="brick"&&m%2?g/2:0,E=d*g+A,v=m*x;if(l.fillStyle=$h(u,1+(f()-.5)*.05),l.fillRect(E+p/2,v+p/2,g-p,x-p),h.fillStyle="#b0b0b0",h.fillRect(E+p/2,v+p/2,g-p,x-p),i.speck)for(let P=0;P<260*i.speck;P++)l.fillStyle=`rgba(${f()<.5?"255,255,255":"0,0,0"},${.04+f()*.06})`,l.fillRect(E+f()*g,v+f()*x,1+f()*2,1+f()*2);if(i.vein){l.save(),l.beginPath(),l.rect(E,v,g,x),l.clip();for(let P=0;P<3;P++){l.strokeStyle=i.vein+"55",l.lineWidth=.6+f()*1.6,l.beginPath();let w=E+f()*g,T=v;for(l.moveTo(w,T);T<v+x;)w+=(f()-.5)*18,T+=8+f()*10,l.lineTo(w,T);l.stroke()}l.restore()}}return{map:or(a,!0),normalMap:or(Jh(c,2.4)),size:o,roughness:i.gloss??.4}}function $g(i,t=512){let e=_s(t),n=e.getContext("2d"),s=Vl(Hl(i.base)||5);n.fillStyle=i.base,n.fillRect(0,0,t,t);for(let r=0;r<9e3*(i.speck||.3);r++)n.fillStyle=`rgba(${s()<.5?"255,255,255":"0,0,0"},${.05+s()*.08})`,n.fillRect(s()*t,s()*t,1+s()*1.5,1+s()*1.5);return{map:or(e,!0),size:[.8,.8],roughness:i.gloss??.3}}function Hl(i){let t=0;for(let e of i)t=(t*31+e.charCodeAt(0))%2147483647;return t}function Jg(i,t,e=Xh){let n=i+JSON.stringify(t);if(!e.has(n)){let s=matchMedia("(max-width: 700px)").matches?256:512,r=i==="wood"?Yg(t,s):i==="tile"?Zg(t,s):$g(t,s);for(let o of[r.map,r.normalMap])o?.repeat.set(1/r.size[0],1/r.size[1]);e.set(n,r)}return e.get(n)}function Kh(i,t,e,n=Xh){if(t==="paint")i.map=null,i.normalMap=null,i.color.set(e.base),i.roughness=.9,i.metalness=0;else if(t==="metal")i.map=null,i.normalMap=null,i.color.set(e.metal),i.metalness=1,i.roughness=e.rough;else if(t==="carpentry"&&e.lacquer)i.map=null,i.normalMap=null,i.color.set(e.base),i.roughness=.35,i.metalness=0;else{let s=Jg(t==="carpentry"?"wood":t,t==="carpentry"?{...e,var:.02}:e,n);i.map=s.map,i.normalMap=s.normalMap||null,i.color.set("#ffffff"),i.roughness=s.roughness,i.metalness=0,i.userData.texSize=s.size}i.needsUpdate=!0}var Kg=matchMedia("(prefers-reduced-motion: reduce)").matches,xs=matchMedia("(max-width: 700px)").matches,eu=/[?&]debug/.test(location.search),nu=[],ar=(i,t)=>{eu&&nu.push([i,Math.round(performance.now()-t)])},Ei=class{constructor(){this.b=new Map}bucket(t){return this.b.has(t)||this.b.set(t,{p:[],n:[],u:[],i:[]}),this.b.get(t)}quad(t,e,n,s,r,o,a){let c=this.bucket(t),l=c.p.length/3;for(let h of[e,n,s,r])c.p.push(...h);for(let h=0;h<4;h++)c.n.push(...o);c.u.push(...a),c.i.push(l,l+1,l+2,l,l+2,l+3)}box(t,e,n,s,r,o,a,c=63){n<e&&([e,n]=[n,e]),a<o&&([o,a]=[a,o]),!(n-e<1e-4||r<=s||a-o<1e-4)&&(c&1&&this.quad(t,[e,r,o],[e,r,a],[n,r,a],[n,r,o],[0,1,0],[e,o,e,a,n,a,n,o]),c&2&&this.quad(t,[e,s,o],[n,s,o],[n,s,a],[e,s,a],[0,-1,0],[e,o,n,o,n,a,e,a]),c&4&&this.quad(t,[e,s,a],[n,s,a],[n,r,a],[e,r,a],[0,0,1],[e,s,n,s,n,r,e,r]),c&8&&this.quad(t,[n,s,o],[e,s,o],[e,r,o],[n,r,o],[0,0,-1],[-n,s,-e,s,-e,r,-n,r]),c&16&&this.quad(t,[n,s,a],[n,s,o],[n,r,o],[n,r,a],[1,0,0],[-a,s,-o,s,-o,r,-a,r]),c&32&&this.quad(t,[e,s,o],[e,s,a],[e,r,a],[e,r,o],[-1,0,0],[o,s,a,s,a,r,o,r]))}meshes(t,{shadows:e=!0}={}){let n=[];for(let[s,r]of this.b){if(!r.i.length)continue;let o=new Ye;o.setAttribute("position",new be(r.p,3)),o.setAttribute("normal",new be(r.n,3)),o.setAttribute("uv",new be(r.u,2)),o.setIndex(r.p.length/3>65535?new pi(r.i,1):new fi(r.i,1)),o.computeBoundingSphere();let a=new he(o,t[s]||t.paint);a.name=s,a.castShadow=e&&!["glass","rail"].includes(s),a.receiveShadow=e,n.push(a)}return n}};function iu(i){let t=new Uint16Array(i.w*i.h),e=0;for(let n of i.grid.split(",")){let[s,r]=n.split(":").map(Number);t.fill(s,e,e+r),e+=r}return t}function jh(i,t,e){let n=i.slice(),s=[];for(let r=0;r<e;r++)for(let o=0;o<t;){if(!n[r*t+o]){o++;continue}let a=o;for(;a<t&&n[r*t+a];)a++;let c=r+1;t:for(;c<e;c++)for(let l=o;l<a;l++)if(!n[c*t+l])break t;for(let l=r;l<c;l++)n.fill(0,l*t+o,l*t+a);s.push([o,r,a-o,c-r]),o=a}return s}function jg(){let i=document.createElement("canvas");i.width=64,i.height=8;let t=i.getContext("2d");t.fillStyle="#3e4246",t.fillRect(0,0,64,8),t.fillStyle="#7b8086";for(let n=0;n<64;n+=8)t.fillRect(n,0,5,8);let e=new gi(i);return e.wrapS=e.wrapT=$n,e.repeat.set(.6,1),e.colorSpace=we,e}function su(){let i=(t,e={})=>new mn({color:t,roughness:.85,envMapIntensity:.9,...e});return{paint:i("#eeebe4",{roughness:.92,envMapIntensity:1.1}),ceiling:i("#f5f4f0",{envMapIntensity:1}),floor:i("#cfb38f"),kitchenFloor:i("#cfb38f"),bathFloor:i("#9f9c96"),bathWall:i("#f0eee9"),kitchenWall:i("#efede7"),terrace:i("#bdb5a8"),facade:i("#f3f2ee"),slab:i("#dedcd6"),cladding:i("#a9a59c",{roughness:.6}),frameDark:i("#55585a",{roughness:.45,metalness:.3}),carpentry:i("#f1efe9",{roughness:.35}),skirting:i("#f3f2ee",{roughness:.4}),cabinets:i("#eeede8",{roughness:.4}),worktop:i("#ecebe7",{roughness:.25}),metal:i("#d9dcdf",{metalness:1,roughness:.12,envMapIntensity:1}),sanitary:i("#fbfbf9",{roughness:.12,envMapIntensity:.9}),resin:i("#efeeea",{roughness:.55}),frame:i("#f4f4f2",{roughness:.4}),hob:i("#121214",{roughness:.08,envMapIntensity:1}),fabric:i("#d9d4ca",{roughness:1}),linen:i("#f2f0eb",{roughness:1}),accent:i("#8f9b8f",{roughness:1}),wood:i("#a88563",{roughness:.55}),lacquer:i("#ece9e2",{roughness:.35}),rug:i("#c9c1b2",{roughness:1}),outdoor:i("#8c8b86",{roughness:.7}),plant:i("#6e7d62",{roughness:1}),glass:new mn({color:"#a9c1c4",roughness:.04,metalness:.1,transparent:!0,opacity:.28,envMapIntensity:1,depthWrite:!1}),rail:new mn({color:"#7f9195",roughness:.05,metalness:.1,transparent:!0,opacity:.55,depthWrite:!1}),ground:i("#b9bfae",{roughness:1}),street:new ye({color:"#8d8f8c"}),plaster:new ye({color:"#f4f3f0"}),cladSide:new ye({color:"#a7a49d"}),roof:new ye({color:"#d5d6d2"}),cap:new ye({color:"#fbfaf8"}),pavement:new ye({color:"#cfcac1"}),lineWhite:new qe({color:"#e8e8e4"}),lawn:new ye({color:"#7fa24a"}),paving:new ye({color:"#d6d2ca"}),poolEdge:new ye({color:"#e8e4dc"}),water:new qe({color:"#59b9d2",transparent:!0,opacity:.9}),fenceWall:new ye({color:"#eceae5"}),poolWall:new ye({color:"#7fc2d4"}),grass:new ye({color:"#6f9a3f"}),lounger:new ye({color:"#f1efea"}),glassFence:new mn({color:"#cfe0e2",roughness:.05,transparent:!0,opacity:.3,depthWrite:!1}),ramp:new ye({color:"#7d7f80"}),tunnel:new qe({color:"#1d1f21"}),planter:new ye({color:"#e9e6df"}),slats:new ye({map:jg(),color:"#ffffff"}),trunk:new ye({color:"#7b6a55"}),canopy:new ye({color:"#89a85a",flatShading:!0}),plan:new qe({transparent:!0,opacity:.92,depthWrite:!1,toneMapped:!1}),hit:new qe({color:"#7f9c86",transparent:!0,opacity:0,depthWrite:!1})}}var ru=i=>i==="exterior"||i==="laundry"?"exterior":i;function Qg(i,{kitchenTile:t="wall",notes:e={}}={}){let n=i.cell,s=i.w,r=i.h,o=iu(i),a=s*n/2,c=r*n/2,l=C=>C*n-a,h=C=>C*n-c,f=cr.clear,u=new Ei,p=C=>C>=3?ru(i.rooms[C-3]?.type):null,g=(C,I)=>C<0||I<0||C>=r||I>=s?0:o[C*s+I],x=new Uint8Array(s*r),m=(C,I,L,O,F)=>{let H=Math.max(0,Math.floor((Math.min(C,I)+a)/n)),V=Math.min(s,Math.ceil((Math.max(C,I)+a)/n)),W=Math.max(0,Math.floor((Math.min(L,O)+c)/n)),j=Math.min(r,Math.ceil((Math.max(L,O)+c)/n));for(let nt=W;nt<j;nt++)for(let it=H;it<V;it++)if(F(nt,it)===!1)return!1;return!0};for(let[C,I,L,O]of jh(Uint8Array.from(o,F=>F===1),s,r))u.box("paint",l(C),l(C+L),0,f,h(I),h(I+O));let d=C=>C==="bath"?"bathFloor":C==="kitchen"?t==="all"?"kitchenFloor":"floor":C==="exterior"?"terrace":"floor",A=new Set(o);A.delete(0),A.delete(1);for(let C of A){let I=C===2?"floor":d(p(C));for(let[L,O,F,H]of jh(Uint8Array.from(o,V=>V===C),s,r))u.box(I,l(L),l(L+F),-.02,0,h(O),h(O+H),1)}let E=[],v=C=>C==="bath"?"bathWall":C==="kitchen"?"kitchenWall":C==="exterior"?"facade":null,P=.004;for(let[C,I,L]of[[-1,0,"N"],[1,0,"S"],[0,-1,"W"],[0,1,"E"]]){let O=C!==0,F=O?r:s,H=O?s:r;for(let V=0;V<F;V++){let W=0;for(;W<H;){let j=O?V:W,nt=O?W:V,it=g(j,nt);if(it>=3&&g(j+C,nt+I)===1){let vt=W;for(;vt<H;){let lt=O?V:vt,wt=O?vt:V;if(g(lt,wt)!==it||g(lt+C,wt+I)!==1)break;vt++}let Et=p(it),yt=v(Et),$=(vt-W)*n,Q=O?C<0?h(V):h(V+1):I<0?l(V):l(V+1),st=O?l(W):h(W),dt=O?l(vt):h(vt);if(E.push({v:it,t:Et,dir:L,wallPos:Q,s0:st,s1:dt,len:$}),yt){let lt=Et==="exterior"?1.05:f;if(O){let wt=Q-C*P;C<0?u.quad(yt,[st,0,wt],[dt,0,wt],[dt,lt,wt],[st,lt,wt],[0,0,1],[st,0,dt,0,dt,lt,st,lt]):u.quad(yt,[dt,0,wt],[st,0,wt],[st,lt,wt],[dt,lt,wt],[0,0,-1],[-dt,0,-st,0,-st,lt,-dt,lt])}else{let wt=Q-I*P;I<0?u.quad(yt,[wt,0,dt],[wt,0,st],[wt,lt,st],[wt,lt,dt],[1,0,0],[-dt,0,-st,0,-st,lt,-dt,lt]):u.quad(yt,[wt,0,st],[wt,0,dt],[wt,lt,dt],[wt,lt,st],[-1,0,0],[st,0,dt,0,dt,lt,st,lt])}}W=vt}else W++}}}if(e.skirting){let C=e.skirting.heightMm/1e3,I=(e.skirting.thicknessMm||10)/1e3;for(let L of E){if(L.t==="bath"||L.t==="exterior"||L.t==="kitchen")continue;let O={N:[0,1],S:[0,-1],W:[1,0],E:[-1,0]}[L.dir];L.dir==="N"||L.dir==="S"?u.box("skirting",L.s0,L.s1,0,C,L.wallPos,L.wallPos+O[1]*I):u.box("skirting",L.wallPos,L.wallPos+O[0]*I,0,C,L.s0,L.s1)}}for(let C of i.openings){let I=l(C.x),L=l(C.x+C.w),O=h(C.y),F=h(C.y+C.h),H=C.w>=C.h,V=W=>{Math.min(L-I,F-O)<=.45&&u.box("paint",I,L,W,f,O,F)};if(C.kind==="door"||C.kind==="entrance"){V(Math.max(2.1,(e.doorHeight||2.03)+.07));let W=H?L-I:F-O,j=.04,nt=(e.doorHeight||2.03)-.02,it=C.between?.[0],Et=it&&!["circulation","void"].includes(it)?-1:1,yt=Math.min(W-.1,.9);if(H){let dt=I+.05,lt=(O+F)/2;u.box("carpentry",dt,dt+j,0,nt,lt,lt+Et*yt)}else{let dt=O+.05,lt=(I+L)/2;u.box("carpentry",lt,lt+Et*yt,0,nt,dt,dt+j)}H?(u.box("carpentry",I,I+.06,0,2.15,O-.01,F+.01),u.box("carpentry",L-.06,L,0,2.15,O-.01,F+.01),u.box("carpentry",I,L,2.09,2.15,O-.01,F+.01)):(u.box("carpentry",I-.01,L+.01,0,2.15,O,O+.06),u.box("carpentry",I-.01,L+.01,0,2.15,F-.06,F),u.box("carpentry",I-.01,L+.01,2.09,2.15,O,F));let $=(I+L)/2,Q=(O+F)/2,st=Math.max(.9,W/2+.3);m($-st,$+st,Q-st,Q+st,(dt,lt)=>{x[dt*s+lt]||(x[dt*s+lt]=2)})}else{let W=C.kind==="window"?cr.sill:0,j=cr.head;W&&u.box("paint",I,L,0,W,O,F),V(j);let nt=(I+L)/2,it=(O+F)/2;H?(u.box("glass",I,L,W,j,it-.006,it+.006),u.box("frameDark",I,L,W,W+.06,it-.035,it+.035),u.box("frameDark",I,L,j-.06,j,it-.035,it+.035),u.box("frameDark",nt-.03,nt+.03,W,j,it-.035,it+.035)):(u.box("glass",nt-.006,nt+.006,W,j,O,F),u.box("frameDark",nt-.035,nt+.035,W,W+.06,O,F),u.box("frameDark",nt-.035,nt+.035,j-.06,j,O,F),u.box("frameDark",nt-.035,nt+.035,W,j,it-.03,it+.03))}}let w=[],T={};for(let C of E)(T[C.v]||=[]).push(C);let S=C=>({N:[0,1],S:[0,-1],W:[1,0],E:[-1,0]})[C.dir],_=(C,I,L,O,F,H,V,W,j,nt=!0)=>{let it=S(I),vt,Et,yt,$;return I.dir==="N"||I.dir==="S"?(vt=L,Et=O,yt=I.wallPos+it[1]*F,$=I.wallPos+it[1]*H):(yt=L,$=O,vt=I.wallPos+it[0]*F,Et=I.wallPos+it[0]*H),C.box(j,vt,Et,V,W,yt,$),nt&&m(vt,Et,yt,$,(Q,st)=>{x[Q*s+st]=1}),[vt,Et,yt,$]};for(let[C,I]of Object.entries(T)){let L=Number(C),O=i.rooms[L-3],F=O?.type;if(I.sort((H,V)=>V.len-H.len),(F==="kitchen"||F==="living_kitchen")&&I[0]?.len>=1.2){let H=I[0];if(i.hob){let it=l(i.hob[0]),vt=h(i.hob[1]);H=I.filter(Et=>Et.len>=1.2).sort((Et,yt)=>Qh(Et,it,vt)-Qh(yt,it,vt))[0]||H}let V=Math.min(H.len,F==="kitchen"?4.2:3.6),W=H.s0+(H.len-V)/2,j=W+V;_(u,H,W,j,0,.58,.1,.87,"cabinets"),_(u,H,W,j,0,.6,0,.1,"paint"),_(u,H,W,j,0,.62,.87,.9,"worktop"),_(u,H,W,j,0,.35,1.45,2.15,"cabinets"),F==="living_kitchen"&&_(u,H,W,j,0,.006,.9,1.45,"kitchenWall",!1);let nt=(W+j)/2;_(u,H,nt-.9,nt-.3,0,.5,.9,.905,"hob",!1),_(u,H,nt+.3,nt+.8,0,.45,.9,.91,"metal",!1),w.push({room:O.name,item:"Cocina",placement:i.hob?"pared de la placa trazada":"pared m\xE1s larga (inferida)"})}if(F==="bath"&&I[0]?.len>=1.5){let H=I[0],V=H.len;_(u,H,H.s0+.05,H.s0+.85,0,.45,.45,.85,"cabinets"),_(u,H,H.s0+.1,H.s0+.8,0,.44,.85,.9,"sanitary",!1),_(u,H,H.s0+.95,H.s0+1.35,0,.65,0,.42,"sanitary"),_(u,H,H.s0+.3,H.s0+.6,0,.1,1.05,1.1,"metal",!1);let W=Math.min(1.4,V-1.45);W>=.7&&(_(u,H,H.s1-W,H.s1,0,.8,0,.04,"resin"),_(u,H,H.s1-W,H.s1-W+.01,0,.8,.04,2,"glass",!1)),w.push({room:O.name,item:"Lavabo, inodoro, plato de ducha",placement:"pared m\xE1s larga (inferida)"})}}let y=t_(i,o,{X:l,Z:h,c:n,W:s,H:r,at:g,occ:x,cellsOf:m,byRoom:T,along:_,nrm:S,ox:a,oz:c}),R=new Ie;return R.userData={unit:i,fixtures:w,size:[s*n,r*n],furniture:y},{group:R,builder:u,rooms:e_(i,o,l,h),furniture:y}}var Qh=(i,t,e)=>i.dir==="N"||i.dir==="S"?Math.hypot(Math.max(i.s0,Math.min(i.s1,t))-t,i.wallPos-e):Math.hypot(i.wallPos-t,Math.max(i.s0,Math.min(i.s1,e))-e);function t_(i,t,e){let{X:n,Z:s,c:r,W:o,H:a,occ:c,cellsOf:l,byRoom:h,along:f,nrm:u}=e,p={},g=(w,T,S,_,y,R=!1)=>l(T,S,_,y,(C,I)=>t[C*o+I]===w&&(c[C*o+I]===0||R&&c[C*o+I]===2)?void 0:!1),x=(w,T,S,_)=>l(w,T,S,_,(y,R)=>{c[y*o+R]=1}),m=new Float32Array(o*a);for(let w=0;w<a;w++)for(let T=0;T<o;T++)m[w*o+T]=t[w*o+T]>=3?1e4:0;for(let w=0;w<a;w++)for(let T=0;T<o;T++){let S=w*o+T;if(!m[S])continue;let _=t[S];w&&(m[S]=Math.min(m[S],t[S-o]===_?m[S-o]+1:1)),T&&(m[S]=Math.min(m[S],t[S-1]===_?m[S-1]+1:1))}for(let w=a-1;w>=0;w--)for(let T=o-1;T>=0;T--){let S=w*o+T;if(!m[S])continue;let _=t[S];w<a-1&&(m[S]=Math.min(m[S],t[S+o]===_?m[S+o]+1:1)),T<o-1&&(m[S]=Math.min(m[S],t[S+1]===_?m[S+1]+1:1))}let d=(w,T)=>{let S=null;for(let _=0;_<o*a;_++)t[_]===w&&!c[_]&&m[_]*r>=T&&(!S||m[_]>m[S])&&(S=_);return S==null?null:[n(S%o+.5),s(Math.floor(S/o)+.5)]},A=(w,T,S,_,y,R)=>{let C=Math.abs(S-T),I=Math.abs(y-_);w.box("wood",T,S,0,.28,_,y),w.box("linen",T+.03,S-.03,.28,.5,_+.03,y-.03);let L=R==="N"||R==="S"?"z":"x",O=L==="z"?C:I,F=O>1.2?2:1;for(let H=0;H<F;H++){let V=(H+.5)/F;if(L==="z"){let W=R==="N"?_+.08:y-.43,j=T+C*V;w.box("fabric",j-.3*(O/F/.75),j+.3*(O/F/.75),.5,.62,W,W+.35)}else{let W=R==="W"?T+.08:S-.43,j=_+I*V;w.box("fabric",W,W+.35,.5,.62,j-.3*(O/F/.75),j+.3*(O/F/.75))}}if(L==="z"){let H=R==="N"?_:y;w.box("wood",T-.02,S+.02,0,1.05,H-.04,H+.04),w.box("accent",T+.02,S-.02,.5,.53,R==="N"?y-.55:_+.05,R==="N"?y-.05:_+.55)}else{let H=R==="W"?T:S;w.box("wood",H-.04,H+.04,0,1.05,_-.02,y+.02),w.box("accent",R==="W"?S-.55:T+.05,R==="W"?S-.05:T+.55,.5,.53,_+.02,y-.02)}},E=w=>i.rooms.map((T,S)=>[T,S+3]).filter(([T])=>w(T)),v=w=>p[w-3]||={builder:new Ei,items:[]},P=new Set;for(let[w,T,S,_,y]of i.beds||[]){let R=y+3,C=v(R).builder,I=n(w),L=n(w+S),O=s(T),F=s(T+_),H=_>=S,V=H?[["N",T-2,w+S/2],["S",T+_+1,w+S/2]]:[["W",w-2,T+_/2],["E",w+S+1,T+_/2]],W=V[0][0],j=1e9;for(let[it]of V){let vt=0;for(let Et=1;Et<30;Et++){let yt=it==="N"?T-Et:it==="S"?T+_+Et:Math.round(T+_/2),$=it==="W"?w-Et:it==="E"?w+S+Et:Math.round(w+S/2);if(yt<0||$<0||yt>=a||$>=o||t[yt*o+$]===1||t[yt*o+$]===0){vt=Et;break}}vt&&vt<j&&(j=vt,W=it)}{let it=W==="N"||W==="S",vt=it?L-I:F-O,Et=vt>1.15,yt=Et?1.5:.9,$=Et?2:1.9;if(it){let Q=(I+L)/2;I=Q-yt/2,L=Q+yt/2,W==="N"?F=O+$:O=F-$}else{let Q=(O+F)/2;O=Q-yt/2,F=Q+yt/2,W==="W"?L=I+$:I=L-$}}A(C,I,L,O,F,W),x(I,L,O,F),P.add(R),v(R).items.push("cama (posici\xF3n del plano)");let nt=(it,vt,Et,yt)=>{g(R,it,vt,Et,yt)&&(C.box("lacquer",it,vt,0,.5,Et,yt),x(it,vt,Et,yt))};W==="N"&&(nt(I-.5,I-.05,O,O+.4),nt(L+.05,L+.5,O,O+.4)),W==="S"&&(nt(I-.5,I-.05,F-.4,F),nt(L+.05,L+.5,F-.4,F)),W==="W"&&(nt(I,I+.4,O-.5,O-.05),nt(I,I+.4,F+.05,F+.5)),W==="E"&&(nt(L-.4,L,O-.5,O-.05),nt(L-.4,L,F+.05,F+.5))}for(let[w,T]of E(S=>S.type==="bedroom")){if(P.has(T))continue;let S=(h[T]||[]).slice().sort((C,I)=>I.len-C.len),_=w.area>=11,y=_?1.5:.9,R=_?2:1.9;for(let C of S){if(C.len<y+.2)continue;let I=(C.s0+C.s1)/2,L=u(C),O,F,H,V;if(C.dir==="N"||C.dir==="S"?(O=I-y/2,F=I+y/2,H=C.wallPos,V=C.wallPos+L[1]*R):(H=I-y/2,V=I+y/2,O=C.wallPos,F=C.wallPos+L[0]*R),!g(T,O,F,H,V))continue;let W=v(T).builder;A(W,Math.min(O,F),Math.max(O,F),Math.min(H,V),Math.max(H,V),C.dir==="N"?"N":C.dir==="S"?"S":C.dir==="W"?"W":"E"),x(O,F,H,V),v(T).items.push("cama (posici\xF3n indicativa)");break}}for(let[w,T]of E(S=>S.type==="living"||S.type==="living_kitchen")){let S=v(T).builder,_=(h[T]||[]).slice().sort((R,C)=>C.len-R.len);for(let R of _){if(R.len<2.4)continue;let C=(R.s0+R.s1)/2,I=u(R),L=2.2,O=(dt,lt,wt,se)=>R.dir==="N"||R.dir==="S"?[wt,se,R.wallPos+I[1]*dt,R.wallPos+I[1]*lt]:[R.wallPos+I[0]*dt,R.wallPos+I[0]*lt,wt,se],F=O(.02,.92,C-L/2,C+L/2),H=O(.02,1.95,C-L/2,C+L/2);if(!g(T,...H))continue;let[V,W,j,nt]=F;S.box("fabric",V,W,0,.42,j,nt);let it=O(.02,.22,C-L/2,C+L/2);S.box("fabric",it[0],it[1],.42,.82,it[2],it[3]);let vt=O(.22,.92,C-L/2,C-L/2+.18),Et=O(.22,.92,C+L/2-.18,C+L/2);S.box("fabric",vt[0],vt[1],.42,.62,vt[2],vt[3]),S.box("fabric",Et[0],Et[1],.42,.62,Et[2],Et[3]);let yt=O(1.35,1.9,C-.5,C+.5);S.box("wood",yt[0],yt[1],.36,.4,yt[2],yt[3]);let $=O(1,2.3,C-1.1,C+1.1);g(T,...$,!0)&&S.box("rug",$[0],$[1],0,.012,$[2],$[3]),x(...H),v(T).items.push("sof\xE1 y mesa de centro");let Q={N:"S",S:"N",W:"E",E:"W"}[R.dir],st=_.find(dt=>dt.dir===Q&&dt.len>=1.6&&dt.s0<C&&dt.s1>C);if(st){let dt=Math.max(st.s0,C-.8),lt=Math.min(st.s1,C+.8),wt=u(st),se=st.dir==="N"||st.dir==="S"?[dt,lt,st.wallPos,st.wallPos+wt[1]*.4]:[st.wallPos,st.wallPos+wt[0]*.4,dt,lt];g(T,...se)&&(S.box("lacquer",se[0],se[1],.1,.5,se[2],se[3]),x(...se),v(T).items.push("mueble TV"))}break}let y=d(T,.95);if(y){let[R,C]=y,I=w.area>20,L=1.6,O=.9,F=I?L/2:O/2,H=I?O/2:L/2;if(g(T,R-F-.55,R+F+.55,C-H-.55,C+H+.55,!0)){S.box("wood",R-F,R+F,.72,.76,C-H,C+H);for(let[W,j]of[[-1,-1],[1,-1],[-1,1],[1,1]])S.box("frameDark",R+W*(F-.06)-.025,R+W*(F-.06)+.025,0,.72,C+j*(H-.06)-.025,C+j*(H-.06)+.025);let V=I?[[-.4,-1],[.4,-1],[-.4,1],[.4,1]]:[[-1,-.4],[-1,.4],[1,-.4],[1,.4]];for(let[W,j]of V){let nt=I?R+W:R+W*(F+.3),it=I?C+j*(H+.3):C+j;S.box("fabric",nt-.22,nt+.22,.42,.47,it-.22,it+.22),I?S.box("fabric",nt-.22,nt+.22,.47,.9,it+j*.2-.02,it+j*.2+.02):S.box("fabric",nt+W*.2-.02,nt+W*.2+.02,.47,.9,it-.22,it+.22)}x(R-F-.55,R+F+.55,C-H-.55,C+H+.55),v(T).items.push("mesa de comedor y sillas")}}}for(let[w,T]of E(S=>S.type==="exterior"&&S.area>=3)){let S=v(T).builder,_=d(T,.75);if(_){let[R,C]=_;S.box("outdoor",R-.4,R+.4,.7,.74,C-.4,C+.4),S.box("outdoor",R-.04,R+.04,0,.7,C-.04,C+.04);for(let[I,L]of[[-.7,0],[.7,0]])S.box("outdoor",R+I-.23,R+I+.23,.42,.46,C+L-.23,C+L+.23),S.box("outdoor",R+I+Math.sign(I)*.21-.02,R+I+Math.sign(I)*.21+.02,.46,.85,C-.23,C+.23);x(R-1,R+1,C-.5,C+.5),v(T).items.push("mesa exterior")}if(w.area>=15){for(let R=0;R<2;R++){let C=d(T,.6);if(!C)break;let[I,L]=C;if(!g(T,I-.35,I+.35,L-1,L+1))break;S.box("outdoor",I-.35,I+.35,.25,.35,L-.95,L+.95),S.box("outdoor",I-.35,I+.35,.35,.7,L-.95,L-.55),x(I-.45,I+.45,L-1.05,L+1.05)}v(T).items.push("tumbonas")}let y=d(T,.4);y&&S.box("plant",y[0]-.25,y[0]+.25,0,.9,y[1]-.25,y[1]+.25)}return p}function e_(i,t,e,n){let s=[];return i.rooms.forEach((r,o)=>{let a=o+3,c=0,l=0,h=0,f=1e9,u=-1e9,p=1e9,g=-1e9;for(let d=0;d<i.h;d++)for(let A=0;A<i.w;A++)t[d*i.w+A]===a&&(c++,l+=A,h+=d,f=Math.min(f,A),u=Math.max(u,A),p=Math.min(p,d),g=Math.max(g,d));if(!c)return;let x=r.label?r.label[0]:l/c,m=r.label?r.label[1]:h/c;s.push({...r,index:o,center:[e(l/c),n(h/c)],labelAt:[e(x),n(m)],bbox:[e(f),e(u+1),n(p),n(g+1)]})}),s}function ou(i,{shadows:t=!0}={}){let e=new mi;e.background=new Zt("#d9dcd6");let n=new ca({antialias:!xs,alpha:!1,powerPreference:"high-performance"});n.setPixelRatio(Math.min(devicePixelRatio,xs?1.25:1.6)),n.shadowMap.enabled=!0,n.shadowMap.type=ho,n.shadowMap.autoUpdate=!1,n.outputColorSpace=we,n.toneMapping=vo,n.toneMappingExposure=.78,Zh(n.capabilities.getMaxAnisotropy()),i.prepend(n.domElement),n.domElement.setAttribute("role","img"),n.domElement.setAttribute("aria-label","Modelo 3D generado a partir de los planos publicados. Usa los botones de plantas, viviendas, estancias y c\xE1mara como alternativa accesible.");let s=new ps(n);e.environment=s.fromScene(new fa,.04).texture,s.dispose();let r=new De(40,1,.05,600),o=new da(r,n.domElement);o.enableDamping=!0,o.dampingFactor=.09,o.maxPolarAngle=Math.PI*.495,o.enablePan=!0,o.screenSpacePanning=!1,e.add(new Ys("#fffaf2","#a8a69e",1.5));let a=new Js("#fff1dc",1.8);a.position.set(-18,30,14),a.castShadow=!0,a.shadow.mapSize.set(xs?1024:2048,xs?1024:2048),a.shadow.normalBias=.03,a.shadow.bias=-3e-4,e.add(a,a.target);let c=document.createElement("div");c.className="scene-labels",i.append(c);let l=!0,h=!0,f=null,u=null,p=0,g=null,x=()=>{p=30,!f&&h&&l&&(f=requestAnimationFrame(m))};function m(T){if(f=null,!(!l||!h)){if(u){let S=Math.min(1,(T-u.time)/u.duration),_=1-Math.pow(1-S,3);r.position.lerpVectors(u.from,u.to,_),o.target.lerpVectors(u.tf,u.tt,_),u.fov&&(r.fov=u.fov[0]+(u.fov[1]-u.fov[0])*_,r.updateProjectionMatrix()),p=20,S===1&&(u=null)}o.update(),n.render(e,r),g?.(),(p-- >0||u)&&(f=requestAnimationFrame(m))}}o.addEventListener("change",x),o.addEventListener("start",()=>{u=null,x()});let d=()=>{let T=i.clientWidth,S=i.clientHeight;T&&S&&(n.setSize(T,S,!1),r.aspect=T/S,r.updateProjectionMatrix(),x())},A=new ResizeObserver(d);A.observe(i);let E=new IntersectionObserver(([T])=>{h=T.isIntersecting,h&&x()},{rootMargin:"100px"});E.observe(i);let v=(T,S,_)=>{let y=new N(...T),R=new N(...S);Kg?(r.position.copy(y),o.target.copy(R),_&&(r.fov=_,r.updateProjectionMatrix())):u={from:r.position.clone(),to:y,tf:o.target.clone(),tt:R,time:performance.now(),duration:900,fov:_?[r.fov,_]:null},x()},P=T=>{let S=T.getSize(new N),_=T.getCenter(new N),y=Math.max(S.x,S.z)*.62+1;Object.assign(a.shadow.camera,{left:-y,right:y,top:y,bottom:-y,near:.5,far:200}),a.shadow.camera.updateProjectionMatrix(),a.target.position.copy(_),a.position.copy(_).add(new N(-22,38,16)),n.shadowMap.needsUpdate=!0},w=()=>{l=!1,f&&cancelAnimationFrame(f),A.disconnect(),E.disconnect(),o.dispose(),e.traverse(T=>{T.geometry?.dispose()}),e.environment?.dispose(),n.dispose(),n.domElement.remove(),c.remove()};return d(),/[?&]debug/.test(location.search)&&(globalThis.__bamaireViewers||=[]).push({scene:e,renderer:n,camera:r}),{scene:e,renderer:n,camera:r,controls:o,move:v,invalidate:x,resize:d,dispose:w,labels:c,fitShadow:P,sun:a,set onFrame(T){g=T}}}function n_(i,t){let[e,n,s,r]=t.bbox,o=n-e,a=r-s,c=t.center[0],l=t.center[1],h=o>a?[1,0]:[0,1];i.controls.minDistance=.05,i.controls.maxDistance=.15,i.controls.rotateSpeed=-.45,i.controls.enablePan=!1,i.controls.maxPolarAngle=Math.PI*.8,i.controls.minPolarAngle=Math.PI*.2,i.move([c-h[0]*.1,1.5,l-h[1]*.1],[c,1.485,l],xs?70:62)}function ys(i,t=.3,e=40,n=40){return Object.assign(i.controls,{minDistance:t,maxDistance:e,rotateSpeed:1,enablePan:!0,minPolarAngle:0,maxPolarAngle:Math.PI*.495}),n}function ii(i){i.traverse(t=>t.geometry?.dispose()),i.clear()}function au(i,t){let e=ga(i),n=_a(i),s=qh(),r=(c,l,h)=>Kh(c,l,h,s),o={slots:e,notes:n,chosen:{},concept:{worktop:0,cabinets:0,taps:0}};return{state:o,apply:()=>{for(let l of e){if(!l.surface||!l.variants)continue;let h=l.variants[(o.chosen[l.idx]??0)%l.variants.length];l.surface==="floor"&&(r(t.floor,"wood",h),n.floorWetKitchen&&r(t.kitchenFloor,"wood",h)),(l.surface==="kitchenWall"||l.surface==="kitchenAll")&&(r(t.kitchenWall,"tile",h),l.surface==="kitchenAll"&&r(t.kitchenFloor,"tile",{...h,tile:[.6,.6],pattern:"grid"})),l.surface==="bath"&&(r(t.bathWall,"tile",h.wall),r(t.bathFloor,"tile",h.floor)),l.surface==="carpentry"&&r(t.carpentry,"carpentry",h),l.surface==="paint"&&r(t.paint,"paint",h),l.surface==="cabinets"&&r(t.cabinets,"carpentry",h)}/PVC$/.test(n.skirting?.finish||"")&&r(t.skirting,"paint",{base:"#e9e5dc"}),e.some(l=>l.surface==="floor")||r(t.floor,"wood",n.defaultFloor||{base:"#c9ad88",grain:"#9b7b55",var:.04}),e.some(l=>l.surface==="bath")||(r(t.bathWall,"tile",{tile:[.6,.3],base:"#f0eee9",grout:"#dcd8cf",gloss:.18}),r(t.bathFloor,"tile",{tile:[.6,.6],base:"#a9a6a0",grout:"#94918b",gloss:.5,speck:.6})),e.some(l=>/kitchen/.test(l.surface||""))||r(t.kitchenWall,"tile",{tile:[.6,.3],base:"#efede7",grout:"#d8d4cb",gloss:.2,pattern:"grid"}),e.some(l=>l.surface==="cabinets")||r(t.cabinets,"carpentry",bs.cabinets.options[o.concept.cabinets]);let c=bs.worktop.options[o.concept.worktop];r(t.worktop,c.kind==="wood"?"wood":"stone",c),r(t.metal,"metal",bs.taps.options[o.concept.taps]),r(t.terrace,"tile",{tile:[.33,.33],base:"#bdb4a6",grout:"#a59c8e",gloss:.75,speck:.9}),r(t.facade,"tile",{tile:[.24,.07],base:"#f4f3ef",grout:"#e0ded8",gloss:.7,pattern:"brick"}),r(t.cladding,"tile",{tile:[1.2,.15],base:"#aaa69d",grout:"#8f8b83",gloss:.55,pattern:"brick",speck:.3})}}}function lu(i,t,e){let n=Qg(i,e);for(let r of n.builder.meshes(t))n.group.add(r);let s={};for(let[r,o]of Object.entries(n.furniture)){let a=new Ie;a.name="furniture-"+r;for(let c of o.builder.meshes(t))a.add(c);n.group.add(a),s[r]=a}return n.furnitureGroups=s,n}function cu(i,t){let e=new is().load(xa(`/models/${i.promotion||"mykonos"}/plans/${i.code}.jpg`));e.colorSpace=we;let n=t.plan.clone();n.map=e;let s=new he(new _i(i.w*i.cell,i.h*i.cell),n);return s.rotation.x=-Math.PI/2,s.position.y=.012,s.visible=!1,s.renderOrder=2,s.name="plan-overlay",s}function pa(i,t){i.labels.innerHTML=t.map((s,r)=>`<span class="scene-label pin" data-i="${r}"><button class="pin-dot" type="button" aria-expanded="false" aria-label="${s.name}${s.text?" \xB7 "+s.text:""}">+</button><span class="pin-body"><b>${s.name}</b>${s.text?`<small>${s.text}</small>`:""}</span></span>`).join(""),i.labels.querySelectorAll(".pin-dot").forEach(s=>s.onclick=r=>{r.stopPropagation();let o=s.parentElement,a=!o.classList.contains("open");o.classList.toggle("open",a),s.setAttribute("aria-expanded",a),s.textContent=a?"\u2212":"+"});let e=[...i.labels.children],n=new N;i.onFrame=()=>{let s=i.renderer.domElement.clientWidth,r=i.renderer.domElement.clientHeight;t.forEach((o,a)=>{n.set(o.pos[0],o.pos[1],o.pos[2]).applyMatrix4(o.obj.matrixWorld).project(i.camera);let c=e[a];if(!c)return;let l=n.z<1&&Math.abs(n.x)<1.05&&Math.abs(n.y)<1.05;c.style.display=l?"":"none",l&&(c.style.transform=`translate(-50%,-50%) translate(${(n.x*.5+.5)*s}px,${(-n.y*.5+.5)*r}px)`)})}}var i_=i=>({name:i.name,text:`${Ss(i.area)} m\xB2`});function s_(i,t){let e=new Ei,n=i.length,s=i.depth,r=i.top,o=n/2,a=(p,g,x,m,d,A,E)=>e.quad(p,g,x,m,d,A,E),c=(p,g,x,m,d,A,E,v)=>{let P=T=>p.zOfU[1]>0?(T-p.zOfU[0])/n:(p.zOfU[0]-T)/n,w=T=>T/r;v>0?a(g,[x,A,d],[x,A,m],[x,E,m],[x,E,d],[1,0,0],[P(d),w(A),P(m),w(A),P(m),w(E),P(d),w(E)]):a(g,[x,A,m],[x,A,d],[x,E,d],[x,E,m],[-1,0,0],[P(m),w(A),P(d),w(A),P(d),w(E),P(m),w(E)])},l=(p,g,x,m,d,A,E,v,P,w)=>{let T=Math.min(m,d),S=Math.max(m,d),_=w>0?S:T;c(p,g,_,A,E,v,P,w),e.box(x,T,S,v,P,A,E,15)},h=(p,g)=>p.zOfU[0]+p.zOfU[1]*g;for(let[p,g]of Object.entries(i.faces)){let x="tex_"+p,m=g.x,d=g.normal,A=.45,E=.35,[v,P,w,T]=g.frame,[S,_]=g.bayV,y=(L,O)=>{let F=h(g,L),H=h(g,O);return[Math.min(F,H),Math.max(F,H)]};c(g,x,m,...y(0,v),0,r,d),c(g,x,m,...y(P,n),0,r,d),c(g,x,m,...y(v,P),0,w,d);let R=m+d*A;l(g,x,"plaster",m,R,...y(v,P),_,r,d),l(g,x,"plaster",m,R,...y(v,P),w,S,d);let C=[v,...g.bays.flat(),P];for(let L=0;L<C.length;L+=2)C[L+1]-C[L]>.05&&l(g,x,"plaster",m,R,...y(C[L],C[L+1]),S,_,d);for(let[L,O]of g.bays){let[F,H]=y(L,O),V=m-d*E;c(g,x,V,F,H,S,_,d),e.box("cladSide",Math.min(V,R),Math.max(V,R),S,_,F-.02,F,4),e.box("cladSide",Math.min(V,R),Math.max(V,R),S,_,H,H+.02,8)}let I={};for(let[L,O,F]of g.balconies)(I[F]||=[]).push([L,O]);for(let[L,O]of Object.entries(I)){O.sort((V,W)=>V[0]-W[0]);let F=[];for(let V of O){let W=F.at(-1);W&&V[0]-W[1]<.7?W[1]=Math.max(W[1],V[1]):F.push([...V])}let H=i.levels[L];for(let[V,W]of F){if(W-V<1)continue;let[j,nt]=y(V,W),it=m-d*E,vt=m+d*(A+.75);l(g,x,"cladSide",it,vt,j,nt,H-.26,H,d),c(g,x,vt+d*.005,j,nt,H,H+1.05,d),e.box("cladSide",Math.min(it,vt),Math.max(it,vt),H-.26,H+1.05,j,j+.12,63),e.box("cladSide",Math.min(it,vt),Math.max(it,vt),H-.26,H+1.05,nt-.12,nt,63)}}}for(let[p,g]of Object.entries(i.ends)){let x="tex_"+p,m=g.z;g.normal>0?a(x,[0,0,m],[s,0,m],[s,r,m],[0,r,m],[0,0,1],[0,0,1,0,1,1,0,1]):a(x,[s,0,m],[0,0,m],[0,r,m],[s,r,m],[0,0,-1],[0,0,1,0,1,1,0,1])}let f=i.levels.roof+.35,u=.3;e.box("roof",0,s,f-.05,f,-o,o,1),e.box("plaster",0,u,f,r,-o,o,16),e.box("plaster",s-u,s,f,r,-o,o,32),e.box("plaster",0,s,f,r,-o,-o+u,4),e.box("plaster",0,s,f,r,o-u,o,8);for(let[p,g,x,m]of[[-.45,u,-o,o],[s-u,s+.45,-o,o],[0,s,-o,-o+u],[0,s,o-u,o]])e.box("cap",p,g,r,r+.04,x,m,1);for(let p of i.overruns)e.box("plaster",p.x[0],p.x[1],f,r+p.h,p.z[0],p.z[1]);return e}var tu=(i,t)=>{let e=[...new Set([i[0],i[1],...t.flatMap(r=>[r[0],r[1]]).filter(r=>r>i[0]&&r<i[1])])].sort((r,o)=>r-o),n=[...new Set([i[2],i[3],...t.flatMap(r=>[r[2],r[3]]).filter(r=>r>i[2]&&r<i[3])])].sort((r,o)=>r-o),s=[];for(let r=0;r<e.length-1;r++)for(let o=0;o<n.length-1;o++){let a=(e[r]+e[r+1])/2,c=(n[o]+n[o+1])/2;t.some(l=>a>l[0]&&a<l[1]&&c>l[2]&&c<l[3])||s.push([e[r],e[r+1],n[o],n[o+1]])}return s};function r_(i,t,e){let n=new Ei,s=i.length/2,r=i.site||{},[o,a]=r.plotZ||[-s-2,s+7.5],c=r.patioX?.[1]??i.depth+6.5,l=-8,h=.7,f=r.pool||{x:[-6.4,-2],z:[-32,-16]},u=.4,p=r.solarium||{x:[-7.6,-.9],z:[-15,-9]},g=r.ramp||{z:[38.1,41.7],x:[2,c],top:24.5,bottom:4,depth:-3.2};n.box("pavement",-40,70,-.32,-.3,o-30,a+30,1),n.box("street",c+4,c+14,-.31,-.295,o-30,a+30,1);for(let S=o;S<a;S+=5)n.box("lineWhite",c+4.1,c+6.2,-.294,-.29,S,S+.12,1);n.box("lineWhite",c+8.95,c+9.05,-.294,-.29,o-30,a+30,1),n.box("lawn",-40,l-1,-.3,-.28,o-30,a+30,1);let x=(S,_,y,R)=>n.box("paving",S,_,-.3,h,y,R,1),m=[f.x[0]-u,f.x[1]+u,f.z[0]-u,f.z[1]+u];for(let S of tu([l,0,o,s],[m,[p.x[0],p.x[1],p.z[0],p.z[1]]]))x(...S);x(i.depth,c,o,s),x(l,c,o,-s),x(l,c,s,g.z[0]-.2),x(l,g.x[0],g.z[0]-.2,a),n.box("paving",l,g.x[0],-.3,h,g.z[0],g.z[1],16);for(let S of tu(m,[[f.x[0],f.x[1],f.z[0],f.z[1]]]))n.box("poolEdge",S[0],S[1],h,h+.04,S[2],S[3],1);n.box("poolWall",f.x[0],f.x[1],h-1.4,h+.02,f.z[0],f.z[1],62),n.box("water",f.x[0],f.x[1],h-.3,h-.12,f.z[0],f.z[1],1),n.box("grass",p.x[0],p.x[1],h,h+.03,p.z[0],p.z[1],1);for(let S=0;S<4;S++){let _=p.z[0]+1+S*1.3;n.box("lounger",p.x[0]+.6,p.x[0]+2.5,h+.03,h+.38,_,_+.7)}for(let[S,_,y,R]of[[m[1]+.05,m[1]+.09,m[2],p.z[1]],[m[0],m[1]+.09,m[2]-.04,m[2]]])n.box("glassFence",S,_,h,h+1.1,y,R);let[d,A]=g.z,E=-.3,v=g.depth;n.quad("ramp",[g.x[1],E,d],[g.x[1],E,A],[g.top,E,A],[g.top,E,d],[0,1,0],[0,0,0,1,1,1,1,0]),n.quad("ramp",[g.top,E,d],[g.top,E,A],[g.bottom,v,A],[g.bottom,v,d],[.14,.99,0],[0,0,0,1,1,1,1,0]),n.quad("ramp",[g.bottom,v,d],[g.bottom,v,A],[l,v,A],[l,v,d],[0,1,0],[0,0,0,1,1,1,1,0]);for(let[S,_]of[[d,1],[A,-1]]){let y=[[g.x[1],E],[g.top,E],[g.bottom,v],[g.x[0]-.2,v]];for(let R=0;R<y.length-1;R++){let[C,I]=y[R],[L,O]=y[R+1];n.quad("fenceWall",[C,I,S],[L,O,S],[L,1,S],[C,1,S],[0,0,_],[C,I,L,O,L,1,C,1])}n.box("fenceWall",g.x[0],g.x[1],1,1.06,S-(_>0?.2:0),S+(_<0?.2:0),1)}n.quad("tunnel",[g.x[0],v,A],[g.x[0],v,d],[g.x[0],h-.3,d],[g.x[0],h-.3,A],[1,0,0],[0,0,1,0,1,1,0,1]),n.box("fenceWall",g.x[0]-.3,g.x[0],h-.3,h,d,A,16),n.box("planter",l+.6,l+3.2,h,h+.6,d+.5,A-.5);let P=(S,_,y,R)=>{n.box("fenceWall",S,_,-.3,1,y,R),n.box("slats",S+(_-S)*.25,_-(_-S)*.25,1,1.95,y+(R-y>1?0:.07),R-(R-y>1?0:.07))};P(c-.15,c+.15,o,d),P(c-.15,c+.15,A,a),P(l-.15,l+.15,o,a),P(l,c,a-.15,a+.15),P(l,c,o-.15,o+.15);let w=t.levels.B;for(let S of w?.units||[]){let _=S.cell||t.cell;for(let[y,R,C,I]of S.rail||[]){let L=S.x+y*_,O=S.x+C*_,F=S.y+R*_,H=S.y+I*_;for(let V of[1,-1])F===H?n.box("fenceWall",Math.min(L,O),Math.max(L,O),.7,1.75,V*F-.1,V*F+.1):n.box("fenceWall",L-.1,L+.1,.7,1.75,Math.min(V*F,V*H),Math.max(V*F,V*H))}}let T=[];for(let S=o+4;S<a;S+=9)T.push([c+2,S]);for(let S=-s+20;S<s;S+=12)T.push([l-3,S]);return n.trees=T,n}function Iy(i,t,{project:e,promotion:n="mykonos",status:s={},unitsInfo:r={}}={}){let o=performance.now(),a=ou(i,{shadows:!1});ar("setup",o);let c=su(),l=null,h={chosen:{},concept:{}},f=()=>(l||(l=au(e,c),Object.assign(l.state.chosen,h.chosen),Object.assign(l.state.concept,h.concept),l.apply()),l),u=new Ie,p=new Ie,g=new Ie,x=new Ie,m=new Ie;a.scene.add(u),u.add(p,g,x,m);let d=`/models/${n}`,A=null,E=null,v="building",P=null,w=null,T=null,S=!1,_=null,y=[],R=null,C=1,I=ql(i),L=B=>{let q=i.querySelector("#viewer-hint");q&&(q.textContent=B)};function O(B){let q=new is().load(xa(`${d}/tex/${B}`),()=>a.invalidate());return q.colorSpace=we,q.anisotropy=8,new qe({map:q,toneMapped:!1})}async function F(){[A,E]=await Promise.all([Ci(`${d}/building.json`),Ci(`${d}/exterior.json`)]),ar("json",o);let B={...c};for(let[Dt,Ut]of Object.entries(E.faces))B["tex_"+Dt]=O(Ut.texture.file);for(let[Dt,Ut]of Object.entries(E.ends))B["tex_"+Dt]=O(Ut.texture.file);let q=new Ie;for(let Dt of s_(E,B).meshes(B,{shadows:!1}))q.add(Dt);let et=r_(E,A,B),Tt=new Ie;for(let Dt of et.meshes(B,{shadows:!1}))Tt.add(Dt);{let Dt=et.trees.length,Ut=new Jn(new Gs(.11,.15,2.6,6),c.trunk,Dt),Ht=new Jn(new Xs(1.6,1),c.canopy,Dt),Qt=new ae,pe=new Xe,me=new N;et.trees.forEach(([M,k],Z)=>{let Y=.85+Z*37%10/30;Qt.compose(new N(M,1,k),pe,me.set(1,1,1)),Ut.setMatrixAt(Z,Qt),Qt.compose(new N(M,3.3*Y,k),pe,me.set(Y,Y*1.15,Y)),Ht.setMatrixAt(Z,Qt)}),Tt.add(Ut,Ht)}if(p.add(q,Tt),p.position.set(-E.depth/2,0,0),g.position.copy(p.position),m.position.copy(p.position),y=H(A),ar("exterior",o),nt(!0),I.setCrumbs([["Edificio",null]]),I.floors(Object.keys(A.levels),Dt=>yt(Dt),Dt=>Et(Dt)),a.invalidate(),eu){let Dt=performance.now();a.renderer.render(a.scene,a.camera),a.renderer.getContext().finish(),ar("firstRender("+Math.round(performance.now()-Dt)+"ms)",o),globalThis.__bamaireMarks=nu}}let H=B=>Wl(B).map(q=>({...q,box:new Ve(new N(...q.min),new N(...q.max))})),V=(B,q)=>ya[va(s,B,q)]?.color,W=B=>r[B]||{},j=B=>Xl(B,r,s);function nt(B){let q=1/Math.pow(Math.min(1.25,Math.max(.45,a.camera.aspect||1.2))/1.25,.85),et=[(E.depth*3.2+30)*q,34*Math.sqrt(q),E.length*.85*q];ys(a,12,260),B?(a.camera.position.set(...et),a.controls.target.set(0,9,0),a.camera.fov=40,a.camera.updateProjectionMatrix(),a.invalidate()):a.move(et,[0,9,0],40)}function it(){ii(m),R=null,I.tip(null),a.invalidate()}function vt(B,q,et=.32){let Tt=new an(...B.getSize(new N).toArray().map((Ht,Qt)=>Ht+(Qt===1?0:.9))),Dt=new he(Tt,new qe({color:q,transparent:!0,opacity:et,depthWrite:!1,depthTest:!1}));Dt.renderOrder=10,Dt.position.copy(B.getCenter(new N)),m.add(Dt);let Ut=new ks(new Ws(Tt),new es({color:q,transparent:!0,opacity:.95,depthTest:!1}));Ut.position.copy(Dt.position),Ut.renderOrder=11,m.add(Ut)}function Et(B){v==="building"&&(ii(m),B&&vt(new Ve(new N(-.6,Ri(B),-E.length/2-.6),new N(E.depth+.6,Ri(B)+Gl(B),E.length/2+.6)),"#2f6f86",.22),a.invalidate())}function yt(B){if(!A)return;P=B,v="floor",it(),ii(g),x.visible=!1,p.visible=!0,g.visible=!0,Lt();let q=A.levels[B],et=Ri(B),Tt=new Ei,Dt=A.cell;for(let[M,k,Z,Y]of q.slab){let G=q.slabCell,[ot,mt]=q.offset||[0,0];for(let bt of[1,-1]){let Mt=bt*(mt+k*G),Ot=bt*(mt+(k+Y)*G);Tt.box("slab",ot+M*G,ot+(M+Z)*G,et-.3,et,Math.min(Mt,Ot),Math.max(Mt,Ot))}}for(let M of q.units){let k=M.cell||Dt;for(let Z of[1,-1])for(let[Y,G,ot,mt]of M.walls){let bt=Z*(M.y+G*k),Mt=Z*(M.y+(G+mt)*k);Tt.box("plaster",M.x+Y*k,M.x+(Y+ot)*k,et,et+1.2,Math.min(bt,Mt),Math.max(bt,Mt))}}for(let M of Tt.meshes(c,{shadows:!1}))g.add(M);let Ut=[];for(let M of y.filter(k=>k.lv===B)){let k=va(s,M.code,M.portal),Z=M.box.getSize(new N),Y=M.box.getCenter(new N),G=new he(new an(Z.x-.3,.06,Z.z-.3),new qe({color:V(M.code,M.portal)||"#7f9c86",transparent:!0,opacity:.28,depthWrite:!1}));G.position.set(Y.x,et+.05,Y.z),G.userData.apartment=M,g.add(G);let ot=W(M.code);Ut.push({name:(M.portal===2?"P2 \xB7 ":"")+M.code,text:[ot.bedrooms!=null?ot.bedrooms+" dorm.":"",ot.util?Ss(ot.util)+" m\xB2":"",k?ya[k].label:""].filter(Boolean).join(" \xB7 "),pos:[Y.x,et+.4,Y.z],obj:g})}pa(a,Ut),Q(et+1.25);let Ht=a.camera.aspect||1.3,Qt=Math.max(E.length+6,(E.depth+14)*Ht),pe=2*Math.atan(Math.tan(20*Math.PI/180)*Ht),me=Qt/2/Math.tan(pe/2)*1.02;a.move([-me*.18,et+me,.01],[0,et,0],ys(a,6,260)),I.setCrumbs([["Edificio",()=>$()],[hr(B),null]]),I.activeFloor(B),L(`${hr(B)} \xB7 pulsa una vivienda`),t.floor?.(B==="B"?0:Number(B),!0)}function $(){t.building?.(),v="building",P=null,it(),ii(g),Q(null),x.visible=!1,p.visible=!0,wt(),T=null,Lt(),pa(a,[]),nt(),I.setCrumbs([["Edificio",null]]),I.activeFloor(null),L("Pasa el cursor por la fachada \xB7 pulsa una vivienda o elige una planta")}function Q(B){a.renderer.clippingPlanes=B==null?[]:[new ke(new N(0,-1,0),B)],a.renderer.shadowMap.needsUpdate=!0,a.invalidate()}let st=new Map,dt=B=>B.state.slots.some(q=>q.surface==="kitchenAll")?"all":"wall";async function lt(B){let q=await Ci(`${d}/units/${B}.json`).catch(()=>null);if(!q)return null;let et=f(),Tt=B+"|"+dt(et);if(!st.has(Tt)&&(st.set(Tt,lu(q,c,{kitchenTile:dt(et),notes:et.state.notes})),st.size>8)){let[Dt,Ut]=st.entries().next().value;Ut!==T&&(ii(Ut.group),st.delete(Dt))}return{u:q,built:st.get(Tt)}}function wt(){T?.group.parent===x&&x.remove(T.group),ii(x)}function se(B="perspective"){let[q,et]=T.group.userData.size,Tt=Math.hypot(q,et)/2+.4,Dt=40*Math.PI/180,Ut=2*Math.atan(Math.tan(Dt/2)*(a.camera.aspect||1)),Ht=Tt/Math.sin(Math.min(Dt,Ut)/2)*.9,Qt=B==="top"?new N(0,1,.002):new N(.42,.86,.5).normalize();a.move(Qt.multiplyScalar(Ht).toArray(),[0,0,0],ys(a,.3,60))}async function U(B,q=1){let et=await Ci(`${d}/units/${B}.json`).catch(()=>null);if(!et){L(`${B}: modelo no disponible. Consulta el plano PDF original.`),t.unitMissing?.(B);return}w=et,w.promotion=n,C=q;let Tt=performance.now();t.home?.(B,!0,q);let Dt=f();v="home",it(),Q(null),wt(),ii(g),p.visible=!1,x.visible=!0,x.scale.z=q===2?-1:1,x.updateMatrixWorld(!0),a.renderer.shadowMap.enabled=!0,T=(await lt(B)).built;for(let Ht of Object.values(T.furnitureGroups))Ht.visible=!0;x.add(T.group),_=cu(w,c),x.add(_),ar("unitBuild "+B+" "+Math.round(performance.now()-Tt)+"ms",o),le(),T.rooms.forEach(Ht=>{let[Qt,pe,me,M]=Ht.bbox,k=new he(new an(pe-Qt,.02,M-me),c.hit);k.position.set((Qt+pe)/2,.01,(me+M)/2),k.userData.room=Ht,x.add(k)}),pa(a,T.rooms.map(Ht=>({...i_(Ht),pos:[Ht.labelAt[0],.2,Ht.labelAt[1]],obj:x}))),a.fitShadow(new Ve().setFromObject(T.group)),Jt=!1,se();let Ut=B.startsWith("B")?"B":B[0];P=Ut,I.setCrumbs([["Edificio",()=>$()],[hr(Ut),()=>yt(Ut)],[(q===2?"Portal 2 \xB7 ":"")+B,null]]),I.activeFloor(Ut),L(`${B} \xB7 pulsa una estancia o un punto del plano para recorrerla`),J(),t.unitLoaded?.(w,T)}function le(){T&&Q(S?1.2:null)}function Xt(B){let q=C===2?-1:1,[et,Tt,Dt,Ut]=B.bbox,Ht=Tt-et>Math.abs(Ut-Dt)?[1,0]:[0,q];Rt(B.center[0],q*B.center[1],Ht,B)}let Nt=document.createElement("div");Nt.className="v-rooms",Nt.hidden=!0;let ft=document.createElement("canvas");ft.className="v-minimap",ft.hidden=!0,ft.setAttribute("role","img"),ft.setAttribute("aria-label","Plano de la vivienda con tu posici\xF3n: pulsa un punto para ir all\xED"),i.append(Nt,ft);let Jt=!1,At=null,Gt=null,de=null,xe={bedroom:[217,211,234],bath:[207,227,234],kitchen:[240,220,196],living_kitchen:[239,226,200],living:[242,232,207],circulation:[230,228,221],exterior:[219,232,208],laundry:[216,230,222],other:[232,230,224]},D=()=>C===2?-1:1,b=(B,q)=>[Math.floor((D()*q+w.h*w.cell/2)/w.cell),Math.floor((B+w.w*w.cell/2)/w.cell)],X=(B,q)=>{let[et,Tt]=b(B,q);return et<0||Tt<0||et>=w.h||Tt>=w.w?0:At[et*w.w+Tt]},K=(B,q)=>{let et=X(B,q);return et===2||et>=3},rt=(B,q)=>{let et=X(B,q);return et>=3&&T.rooms.find(Tt=>Tt.index===et-3)||null};function J(){At=iu(w);let B=T.rooms.filter(Ut=>Ut.area==null||Ut.area>.9);Nt.innerHTML='<button data-r="all">Vista general</button>'+B.map(Ut=>`<button data-r="${Ut.index}">${Ut.name}</button>`).join("")+'<span class="v-walk-help">\u2191 \u2193 avanzar \xB7 \u2190 \u2192 girar \xB7 pulsa el suelo para ir</span>',Nt.querySelectorAll("button").forEach(Ut=>Ut.onclick=()=>Ut.dataset.r==="all"?Pt():Xt(T.rooms.find(Ht=>Ht.index===Number(Ut.dataset.r))));let q=w.w,et=w.h;Gt=document.createElement("canvas"),Gt.width=q,Gt.height=et;let Tt=Gt.getContext("2d"),Dt=Tt.createImageData(q,et);for(let Ut=0;Ut<et;Ut++)for(let Ht=0;Ht<q;Ht++){let Qt=At[Ut*q+Ht],pe=D()>0?Ut:et-1-Ut,me=(pe*q+Ht)*4,M=Qt===1?[70,74,77]:Qt===2?[250,250,248]:Qt>=3?xe[ru(w.rooms[Qt-3]?.type)]||xe.other:null;M&&(Dt.data[me]=M[0],Dt.data[me+1]=M[1],Dt.data[me+2]=M[2],Dt.data[me+3]=255)}Tt.putImageData(Dt,0,0),Nt.hidden=!1,ft.hidden=!1,ut(),ie()}function Lt(){Jt=!1,kt.clear(),de=null,Nt.hidden=!0,ft.hidden=!0}function ut(){Nt.querySelectorAll("button").forEach(B=>B.classList.toggle("active",B.dataset.r===(Jt&&de?String(de.index):Jt?"":"all")))}function Pt(){Jt=!1,de=null,ut(),se(),L(`${w.code} \xB7 pulsa una estancia o un punto del plano para recorrerla`),t.overview?.()}function Rt(B,q,et,Tt){S=!1,le(),Jt=!0,Object.assign(a.controls,{minDistance:.05,maxDistance:.15,rotateSpeed:-.45,enablePan:!1,maxPolarAngle:Math.PI*.8,minPolarAngle:Math.PI*.2}),a.move([B-et[0]*.1,1.5,q-et[1]*.1],[B,1.485,q],xs?70:62),ht(Tt||rt(B,q))}function ht(B){B!==de&&(de=B,ut(),B&&(L(`${B.name} \xB7 ${Ss(B.area)} m\xB2 \xB7 arrastra para mirar \xB7 \u2191 \u2193 para avanzar`),t.room?.(B)))}let gt=()=>{let B=a.controls.target.clone().sub(a.camera.position);return B.y=0,B.lengthSq()?B.normalize():new N(1,0,0)};function zt(B,q){if(!K(B,q))return!1;let et=gt();return Rt(B,q,[et.x,et.z]),!0}function It(B){let q=a.controls.target,et=gt().multiplyScalar(B),Tt=Math.sign(B)*.28,Dt=gt().multiplyScalar(Tt),Ut=(Qt,pe)=>K(Qt,pe)&&K(Qt+Dt.x,pe+Dt.z),Ht=null;Ut(q.x+et.x,q.z+et.z)?Ht=et:Ut(q.x+et.x,q.z)?Ht=new N(et.x,0,0):Ut(q.x,q.z+et.z)&&(Ht=new N(0,0,et.z)),Ht&&(a.camera.position.add(Ht),q.add(Ht),a.controls.update(),a.invalidate(),ht(rt(q.x,q.z)||de),ie())}function _t(B){let q=a.controls.target,et=a.camera.position.clone().sub(q).applyAxisAngle(new N(0,1,0),B);a.camera.position.copy(q).add(et),a.controls.update(),a.invalidate(),ie()}let kt=new Set,z=0,ct=0,pt={ArrowUp:"f",KeyW:"f",ArrowDown:"b",KeyS:"b",ArrowLeft:"l",KeyA:"l",ArrowRight:"r",KeyD:"r"};function St(B,q){let et=pt[B.code];if(et){if(!q){kt.delete(et);return}v!=="home"||!Jt||!i.isConnected||!i.matches(":hover")&&document.activeElement?.closest("#viewer")!==i||B.target.closest?.("input, select, textarea")||(B.preventDefault(),kt.add(et),z||(ct=performance.now(),z=requestAnimationFrame(at)))}}function at(B){z=0;let q=Math.min(.05,(B-ct)/1e3);if(ct=B,!kt.size||v!=="home"||!Jt)return;(kt.has("l")||kt.has("r"))&&_t((kt.has("l")?1:-1)*1.5*q);let et=(kt.has("f")?1:0)-(kt.has("b")?1:0);et&&It(et*1.5*q),z=requestAnimationFrame(at)}let tt=B=>St(B,!0),Ct=B=>St(B,!1);addEventListener("keydown",tt),addEventListener("keyup",Ct),a.renderer.domElement.addEventListener("wheel",B=>{v==="home"&&Jt&&(B.preventDefault(),It(-Math.sign(B.deltaY)*.45))},{passive:!1}),a.controls.addEventListener("change",()=>{v==="home"&&ie()});function qt(){let B=ft.getBoundingClientRect(),q=Math.min(devicePixelRatio,2),et=w.w,Tt=w.h;ft.width!==Math.round(B.width*q)&&(ft.width=Math.round(B.width*q),ft.height=Math.round(B.height*q));let Dt=Math.min((ft.width-12)/et,(ft.height-12)/Tt);return{k:Dt,ox:(ft.width-et*Dt)/2,oy:(ft.height-Tt*Dt)/2}}function ie(){if(ft.hidden||!Gt||!w)return;let B=ft.getContext("2d"),{k:q,ox:et,oy:Tt}=qt(),Dt=w.cell;B.clearRect(0,0,ft.width,ft.height),B.imageSmoothingEnabled=!1,B.drawImage(Gt,et,Tt,w.w*q,w.h*q);let Ut=(Z,Y)=>[et+(Z+w.w*Dt/2)/Dt*q,Tt+(Y+w.h*Dt/2)/Dt*q],Ht=Jt?a.controls.target:a.camera.position,Qt=gt(),[pe,me]=Ut(Ht.x,Ht.z),M=Math.max(18,q*7),k=Math.atan2(Qt.z,Qt.x);B.fillStyle="rgba(59,89,104,.28)",B.beginPath(),B.moveTo(pe,me),B.arc(pe,me,M,k-.55,k+.55),B.closePath(),B.fill(),B.fillStyle="#3b5968",B.strokeStyle="#fff",B.lineWidth=2,B.beginPath(),B.arc(pe,me,Math.max(4,q*1.6),0,7),B.fill(),B.stroke()}ft.addEventListener("click",B=>{if(!w)return;let q=ft.getBoundingClientRect(),et=ft.width/q.width,{k:Tt,ox:Dt,oy:Ut}=qt(),Ht=w.cell,Qt=((B.clientX-q.left)*et-Dt)/Tt*Ht-w.w*Ht/2,pe=((B.clientY-q.top)*et-Ut)/Tt*Ht-w.h*Ht/2;if(K(Qt,pe))if(Jt)zt(Qt,pe);else{let me=new N(-Qt,0,-pe);me.y=0,me.lengthSq()<.01?me.set(1,0,0):me.normalize(),Rt(Qt,pe,[me.x,me.z])}});let jt=new Ks,en=new Bt,$e=B=>{let q=a.renderer.domElement.getBoundingClientRect();en.set((B.clientX-q.left)/q.width*2-1,-(B.clientY-q.top)/q.height*2+1),jt.setFromCamera(en,a.camera)};function lr(){let B=jt.ray.origin.clone().sub(p.position),q=jt.ray.direction,et=new bn(B,q),Tt=null,Dt=new N;for(let Ut of y){let Ht=et.intersectBox(Ut.box,Dt);if(Ht){let Qt=Ht.distanceTo(B);(!Tt||Qt<Tt.d)&&(Tt={a:Ut,d:Qt})}}return Tt?.a||null}function xn(B){if($e(B),v==="building")return{apartment:lr()};let q=v==="floor"?g.children.filter(Tt=>Tt.userData.apartment):x.children.filter(Tt=>Tt.userData.room),et=jt.intersectObjects(q,!1)[0]?.object;return et?{apartment:et.userData.apartment,room:et.userData.room}:{}}let zn=null,kn=a.renderer.domElement;kn.addEventListener("pointerdown",B=>{zn=[B.clientX,B.clientY]}),kn.addEventListener("pointermove",B=>{if(B.pointerType==="touch"||B.buttons)return;let q=xn(B),et=q.apartment;v==="building"&&et!==R&&(ii(m),R=et,et&&vt(et.box,V(et.code,et.portal)||"#2f6f86",.3),a.invalidate()),et&&v!=="home"?I.tip(j(et),B):I.tip(null),kn.style.cursor=et||q.room?"pointer":"grab"}),kn.addEventListener("pointerleave",()=>{v==="building"&&it(),I.tip(null)}),kn.addEventListener("pointerup",B=>{if(!zn||Math.hypot(B.clientX-zn[0],B.clientY-zn[1])>6)return;if(v==="home"&&Jt){$e(B);let et=jt.intersectObjects(x.children.filter(Tt=>Tt.userData.room),!1)[0];et&&zt(et.point.x,et.point.z);return}let q=xn(B);q.apartment?(I.tip(null),U(q.apartment.code,q.apartment.portal)):q.room&&Xt(q.room)});let vs=B=>{if(!i.isConnected||!i.matches(":hover")&&document.activeElement?.closest("#viewer")!==i)return;let q=Object.keys(A?.levels||{}).sort((et,Tt)=>Ri(et)-Ri(Tt));if(B.key==="Escape"&&(v==="home"?yt(P):v==="floor"&&$()),(B.key==="ArrowUp"||B.key==="ArrowDown")&&v==="floor"){let et=q.indexOf(P)+(B.key==="ArrowUp"?1:-1);q[et]&&(B.preventDefault(),yt(q[et]))}};addEventListener("keydown",vs);let yn=F().catch(B=>{throw t.error?.(B),B});return{ready:yn,selectFloor:B=>yn.then(()=>yt(B===0?"B":String(B))),selectHome:(B,q=1)=>yn.then(()=>U(B,q)),prefetch:B=>yn.then(()=>new Promise(q=>(globalThis.requestIdleCallback||setTimeout)(()=>q(lt(B)),{timeout:800}))),building:()=>yn.then($),renderView(B){let q=Yl.find(Tt=>Tt.id===B);if(!q||!E)return;v!=="building"&&$();let et=new N(-E.depth/2,0,0);if(q.cam){let Tt=new N(...q.cam.pos).add(et),Dt=Tt.clone().add(new N(...q.cam.fwd).normalize().multiplyScalar(70));a.move(Tt.toArray(),Dt.toArray(),q.cam.fov),Object.assign(a.controls,{minDistance:1,maxDistance:400,maxPolarAngle:Math.PI*.6})}else{let Tt=new N(...q.fit.dir).normalize(),Dt=q.fit.el*Math.PI/180,Ut=420,Ht=q.fit.centerY??E.top*.5,Qt=2*Math.atan(q.fit.width/Math.max(a.camera.aspect,.5)/2/Ut)*180/Math.PI,pe=Tt.clone().multiplyScalar(Math.cos(Dt)*Ut);pe.y=Ht+Math.sin(Dt)*Ut,a.move(pe.toArray(),[0,Ht,0],Qt),Object.assign(a.controls,{minDistance:8,maxDistance:600})}return q},enterRoom:B=>{let q=T?.rooms.find(et=>et.index===B);q&&Xt(q)},setFurniture(B,q){let et=T?.furnitureGroups[B];et&&(et.visible=q,a.renderer.shadowMap.needsUpdate=!0,a.invalidate())},setAllFurniture(B){for(let q of Object.values(T?.furnitureGroups||{}))q.visible=B;a.renderer.shadowMap.needsUpdate=!0,a.invalidate()},furnitureRooms:()=>Object.keys(T?.furnitureGroups||{}).map(Number),toggleOverlay(B){return _?(_.visible=B??!_.visible,a.invalidate(),_.visible):!1},toggleCut(B){return S=B??!S,le(),S},setFinish(B,q){if(!l){h.chosen[B]=q;return}l.state.chosen[B]=q,l.apply(),a.renderer.shadowMap.needsUpdate=!0,a.invalidate()},setConcept(B,q){if(!l){h.concept[B]=q;return}l.state.concept[B]=q,l.apply(),a.invalidate()},view(B){v==="home"&&T?(Jt=!1,de=null,ut(),se(B)):v==="floor"?yt(P):E&&(B==="top"?a.move([0,150,.1],[0,0,0],ys(a,12,260)):nt())},camera(B){if(B==="reset")return this.view("perspective");let q=a.camera.position.clone().sub(a.controls.target);B==="left"||B==="right"?q.applyAxisAngle(new N(0,1,0),B==="left"?-.35:.35):q.multiplyScalar(B==="in"?.78:1.28),a.move(q.add(a.controls.target).toArray(),a.controls.target.toArray())},resize:a.resize,dispose:()=>{removeEventListener("keydown",vs),removeEventListener("keydown",tt),removeEventListener("keyup",Ct),Nt.remove(),ft.remove(),a.dispose()}}}function Dy(i,{project:t,unitURL:e,promotion:n}){let s=ou(i),r=su(),o=au(t,r);o.apply();let a=new Ie;s.scene.add(a);let c=null,l=null,h=u=>{s.renderer.clippingPlanes=u?[new ke(new N(0,-1,0),1.25)]:[],s.renderer.shadowMap.needsUpdate=!0,s.invalidate()};return{ready:Ci(e).then(u=>{u.promotion=n,c=lu(u,r,{kitchenTile:o.state.slots.some(x=>x.surface==="kitchenAll")?"all":"wall",notes:o.state.notes}),a.add(c.group),l=cu(u,r),a.add(l),h(!0);let[p,g]=c.group.userData.size;return s.fitShadow(new Ve().setFromObject(c.group)),ys(s,.05,40),s.camera.position.set(p*.5,Math.max(p,g)*.95,g*.9),s.controls.target.set(0,0,0),pa(s,c.rooms.map(x=>({name:x.name,text:`${Ss(x.area)} m\xB2`,pos:[x.labelAt[0],.2,x.labelAt[1]],obj:a}))),s.renderer.shadowMap.needsUpdate=!0,s.invalidate(),{unit:u,rooms:c.rooms,fixtures:c.group.userData.fixtures,furnitureRooms:Object.keys(c.furnitureGroups).map(Number)}}),setFinish(u,p){o.state.chosen[u]=p,o.apply(),s.renderer.shadowMap.needsUpdate=!0,s.invalidate()},setConcept(u,p){o.state.concept[u]=p,o.apply(),s.invalidate()},finishes:o.state,enterRoom:u=>{let p=c?.rooms.find(g=>g.index===u);p&&(h(!1),n_(s,p))},overview(){if(!c)return;h(!0);let[u,p]=c.group.userData.size;s.move([u*.5,Math.max(u,p)*.95,p*.9],[0,0,0],ys(s,.05,40))},setFurniture(u,p){let g=c?.furnitureGroups[u];g&&(g.visible=p,s.renderer.shadowMap.needsUpdate=!0,s.invalidate())},setAllFurniture(u){for(let p of Object.values(c?.furnitureGroups||{}))p.visible=u;s.renderer.shadowMap.needsUpdate=!0,s.invalidate()},toggleOverlay(u){if(l)return l.visible=u??!l.visible,s.invalidate(),l.visible},dispose:s.dispose,resize:s.resize}}export{cr as HEIGHTS,Yl as RENDER_VIEWS,s_ as buildExterior,r_ as buildSite,Qg as buildUnit,Iy as createExplorer,Dy as createInterior,iu as decodeGrid,xa as fileURL,Ci as getJSON,nu as marks};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
