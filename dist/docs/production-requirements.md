# Bamaire — requisitos para producción

Consulta documental: 4 de noviembre de 2026. Este sitio es una propuesta privada y funcional, no un canal de comercialización autorizado.

## Lo que se entrega

- Sitio público en español: portada, colección filtrable, ocho fichas de promoción, cinco proyectos de trayectoria, acabados por promoción, contacto y postventa.
- Renders y marca originales de Bamaire, conservando atribución y condiciones orientativas.
- Explorador Mykonos: edificio 3D ilustrativo, selección de planta, plano tridimensional representativo, interior amueblado, cámara superior/perspectiva, giro, zoom y reinicio.
- Alternativa accesible mediante botones y lista de planos PDF originales. Cada código de vivienda de Portal 1 proviene de un enlace publicado; no implica disponibilidad.
- Configurador de familias documentadas con muestras ilustrativas. Las selecciones se conservan durante la sesión y se incluyen en la consulta.
- Formulario con validación, resumen descargable y borrador de correo al canal comercial publicado. No envía ni almacena datos personales en un servidor. Postventa dirige a correo corporativo.
- Integraciones Google Maps mediante iframes originales, con atribución gestionada por Google y enlaces de apertura.

## Bloqueos concretos para publicar como web oficial

| Área | Entregable requerido | Uso previsto |
| --- | --- | --- |
| Autoridad y marca | Aprobación del diseño, licencia de uso de imágenes, revisión editorial de Bamaire | Confirmar que la propuesta puede representar oficialmente a la empresa |
| Inventario | Registro fechado por promoción, fase, portal, planta, puerta y referencia comercial | Distinguir disponible, reservado, vendido y retirado; fuente única para fichas y formularios |
| Precios | Precio vigente, impuestos y condiciones autorizadas, si se desea publicarlo | Evitar cualquier precio inferido |
| Fichas de viviendas | Dormitorios, superficie útil y construida por separado, exteriores, orientación y anexos, validados por la propiedad | Sustituir los campos «Ver plano original» / «Por confirmar» |
| Identidad espacial | Correspondencia aprobada entre cada PDF, portal, planta, vivienda y objeto 3D | Verificar que seleccionar una unidad señala exactamente su geometría |
| Edificios | IFC/RVT/GLB aprobado por arquitecto, dimensiones y transformaciones, terreno y parcelario | Reemplazar el edificio representativo; generar GLB con niveles de detalle |
| Interiores | Plantas DWG/DXF/PDF vectoriales aprobadas, alturas, huecos y distribución por tipología | Reemplazar todas las habitaciones ilustrativas; el mobiliario seguirá siendo decorativo |
| Entorno | Levantamiento, cota de terreno, norte, accesos y licencia de contexto geográfico | Modelar pendientes y vecinos de forma autorizada, sin inferir interiores a partir de fotos |
| Acabados | Catálogo vigente por promoción con ID, marca, referencia, dimensión y muestras físicas/fotográficas calibradas | Vincular opciones reales a superficies reales |
| Texturas | Mapas base-color, normal y roughness con escala física y permisos de reproducción | Representación físicamente coherente y reproducible |
| Reglas del programa | Plazo, etapa de obra permitida, elegibilidad de vivienda, precios de extras y aprobaciones | Habilitar únicamente elecciones disponibles; Puerta La Pilara requiere distinguir régimen general/especial |
| Obra | Diario fechado y aprobado; confirmación de entrega y fin de obra | Evitar confundir una actualización antigua con el estado actual |
| CRM / correo | Endpoint autorizado, destinatario, validación servidor, protección antispam, consentimientos, almacenamiento y retención | Sustituir la preparación local por envío efectivo y confirmación verificable |
| Postventa | Canal y proceso oficial, campos de incidencia, adjuntos y seguimiento | Sustituir la derivación al correo corporativo por gestión real |
| Legal | Responsable correcto y denominación social unificada; textos actualizados de privacidad/aviso; revisión de Google Maps/fuentes externas | Resolver discrepancias documentadas en el inventario |

## Supuestos y limitaciones de la representación

El edificio tridimensional es una maqueta procedimental de demostración. No se obtuvo un modelo arquitectónico aprobado. Tampoco se trazaron interiores a partir de fotografías. Todas las viviendas 3D usan una distribución representativa, sin medidas y sin afirmaciones sobre dormitorios reales. El número y código de botones viene de los PDF publicados; Portal 2 no se habilita sin correspondencia documental verificada.

Las fichas enlazan mapas originales de cada promoción. No se verificaron mediante levantamiento la topografía, altura de edificios vecinos, vegetación, accesos ni orientación de cada hogar. No se representan ni se afirman esas características. En producción, Google Maps/Street View puede informar el contexto exterior respetando sus condiciones y atribuciones; nunca sustituye al proyecto arquitectónico.

Los colores de las muestras son demostrativos y no constituyen productos aprobados. Los recuentos y familias son documentales. Las elecciones atribuidas a Dirección Facultativa no se ofrecen como decisiones del comprador. Los programas dependen de obra y plazo; las condiciones originales siguen siendo la referencia. No hay opciones de acabados nuevas inventadas como oferta contractual.

## Arquitectura y actualización

- `dist/data.json`: contenido, proyectos, documentos, mapas y programas por desarrollo; fuente de la interfaz.
- `src/app.js`: navegación, fichas, selección y formulario.
- `src/explorer.js`: modelos y controles Three.js. Sustituir aquí la geometría procedimental por carga GLB y mapeo de IDs aprobados.
- `dist/assets/`: originales derivados de Bamaire, redimensionados para web. El índice completo mantiene sus URLs de origen.
- `dist/style.css`: sistema visual y reglas adaptativas.
- `dist/docs/`: auditoría, inventario de fuentes y requisitos.
- `build.mjs`: compilación ES2022 con esbuild. `npm run build` genera módulos; `npm run dev` sirve la web local.

El módulo 3D se carga de forma diferida solo en páginas que lo requieren. Renderizado limitado a cambios y animaciones, pausado fuera del viewport. Densidad de píxeles limitada; sombras y texturas procedimentales de tamaño acotado. El scroll no depende del bucle 3D. La cámara permite arrastrar con ratón/táctil; botones ofrecen alternativa de teclado, incluido el zoom. `prefers-reduced-motion` suprime interpolación y transiciones. Si WebGL falla se ofrece la lista y los planos originales.

## Validación realizada

- Compilación de producción correcta.
- Prueba real en Chrome: selección Mykonos → planta 2 → vivienda 2B → pavimento muestra 3 → formulario → resumen conserva vivienda y preferencia.
- Validación de campos obligatorios, consentimiento y correo desde controles HTML; preparación local sin envío externo.
- Revisión visual de portada y controles del explorador a 390 × 844; sin desbordamiento horizontal del documento. Navegación secundaria permite desplazamiento horizontal propio.
- Comprobaciones de rutas, filtros, descargas y galerías documentadas en `QA.md`.

Pendiente antes de producción: pruebas con lectores de pantalla y dispositivos reales iOS/Android; carga y seguridad del backend futuro; revisión jurídica y comercial; aprobación técnica de cada modelo y producto. No se ha enviado ninguna consulta a Bamaire durante la prueba.
