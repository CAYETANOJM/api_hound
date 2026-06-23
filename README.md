# API REST - Veterinaria Hound Hub

Backend profesional con Node.js, Express, MongoDB Atlas y autenticación Bearer Token para que la skill de Alexa de **Hound Hub** consuma información dinámica en lugar de datos estáticos. Todas las entidades que Alexa puede consultar incluyen una URL de `imagen` para APL, tarjetas visuales o interfaces web.

## 1. Estructura de carpetas

```text
api_hound/
├── app.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── config/
│   └── db.js
├── controllers/
│   ├── buscar.controller.js
│   ├── citas.controller.js
│   ├── consejos.controller.js
│   ├── health.controller.js
│   ├── mascotas.controller.js
│   ├── promociones.controller.js
│   ├── servicios.controller.js
│   └── veterinarios.controller.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Cita.js
│   ├── Consejo.js
│   ├── Mascota.js
│   ├── Promocion.js
│   ├── Servicio.js
│   └── Veterinario.js
├── routes/
│   ├── buscar.routes.js
│   ├── citas.routes.js
│   ├── consejos.routes.js
│   ├── health.routes.js
│   ├── mascotas.routes.js
│   ├── promociones.routes.js
│   ├── servicios.routes.js
│   └── veterinarios.routes.js
├── seed/
│   └── seed.js
├── utils/
│   └── normalize.js
└── examples/
    └── alexa/
        ├── houndHubApiClient.js
        └── index.example.js
```

## 2. Instalación local

### Requisitos

- Node.js 18 o superior
- Cuenta de MongoDB Atlas
- Base de datos accesible desde tu IP o desde Render

### Pasos

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo `.env` tomando como base `.env.example`.

3. Inserta los datos iniciales:

```bash
npm run seed
```

4. Inicia el servidor:

```bash
npm start
```

La API levantará en `http://localhost:3000` o en el puerto definido por `process.env.PORT`.

## 3. Archivo .env

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/veterinaria_hound_hub?retryWrites=true&w=majority
DB_NAME=veterinaria_hound_hub
API_TOKEN=token-seguro-veterinaria
```

## 4. Endpoints disponibles

### Salud

- `GET /api/health`

### Servicios

- `GET /api/servicios`
- `GET /api/servicios/:nombre`

### Veterinarios

- `GET /api/veterinarios`

### Mascotas

- `GET /api/mascotas`

### Promociones

- `GET /api/promociones`
  Devuelve promociones activas con su `imagen`

### Consejos

- `GET /api/consejos`
- `GET /api/consejos/:mascota`
  Devuelven consejos con su `imagen`

### Búsqueda global

- `GET /api/buscar?q=vacuna`

### Citas

- `POST /api/citas`
- `GET /api/citas`
  Requiere header `Authorization: Bearer TOKEN`

## 5. Ejemplos JSON por endpoint

### `GET /api/health`

```json
{
  "ok": true,
  "service": "Veterinaria Hound Hub API",
  "status": "active",
  "timestamp": "2026-06-23T18:00:00.000Z"
}
```

### `GET /api/servicios`

```json
{
  "ok": true,
  "total": 12,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f641",
      "nombre": "Consulta general",
      "categoria": "Medicina preventiva",
      "descripcion": "Valoración médica completa para detectar síntomas tempranos...",
      "precio": 350,
      "duracionEstimada": "30 minutos",
      "disponibilidad": true,
      "imagen": "https://placehold.co/600x400?text=Consulta+general",
      "recomendaciones": [
        "Llevar cartilla de vacunación",
        "Acudir con ayuno solo si el veterinario lo indicó"
      ],
      "beneficios": [
        "Detección oportuna de enfermedades",
        "Seguimiento personalizado del paciente"
      ],
      "normalizedNombre": "consulta general",
      "searchText": "consulta general medicina preventiva valoracion medica completa...",
      "createdAt": "2026-06-23T18:00:00.000Z",
      "updatedAt": "2026-06-23T18:00:00.000Z"
    }
  ]
}
```

### `GET /api/servicios/Vacunación`

```json
{
  "ok": true,
  "data": {
    "_id": "6858e2d3b0c09e72ca20f642",
    "nombre": "Vacunación",
    "categoria": "Prevención",
    "descripcion": "Aplicación de esquemas de vacunación para cachorros y mascotas adultas...",
    "precio": 280,
    "duracionEstimada": "20 minutos",
    "disponibilidad": true,
    "imagen": "https://placehold.co/600x400?text=Vacunacion",
    "recomendaciones": [
      "Presentar historial clínico",
      "Evitar baño 24 horas antes y después"
    ],
    "beneficios": [
      "Protección contra enfermedades infecciosas",
      "Refuerzo del sistema inmune"
    ]
  }
}
```

### `GET /api/veterinarios`

```json
{
  "ok": true,
  "total": 4,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f650",
      "nombre": "Dra. Sofía Ramírez",
      "especialidad": "Medicina interna",
      "experiencia": "9 años de experiencia en diagnóstico clínico...",
      "horario": "Lunes a viernes de 9:00 a 17:00",
      "disponibilidad": true,
      "imagen": "https://placehold.co/600x400?text=Dra+Sofia+Ramirez",
      "descripcionProfesional": "Especialista en medicina interna con enfoque en prevención..."
    }
  ]
}
```

### `GET /api/mascotas`

```json
{
  "ok": true,
  "total": 5,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f660",
      "nombre": "Perros",
      "descripcion": "Mascotas sociables y activas...",
      "cuidadosRecomendados": [
        "Vacunación y desparasitación periódicas",
        "Paseos diarios",
        "Cepillado y revisión de piel"
      ],
      "serviciosSugeridos": [
        "Consulta general",
        "Vacunación",
        "Estética canina",
        "Paseo de mascotas",
        "Entrenamiento básico"
      ],
      "imagen": "https://placehold.co/600x400?text=Perros"
    }
  ]
}
```

### `GET /api/promociones`

```json
{
  "ok": true,
  "total": 3,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f670",
      "titulo": "Paquete cachorro sano",
      "descripcion": "Incluye consulta general, desparasitación y primera vacuna...",
      "descuento": "15%",
      "imagen": "https://placehold.co/600x400?text=Promo+Cachorro+Sano",
      "vigencia": "2028-12-31T23:59:59.000Z",
      "servicioRelacionado": "Vacunación",
      "activo": true
    }
  ]
}
```

### `GET /api/consejos`

```json
{
  "ok": true,
  "total": 6,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f680",
      "titulo": "Vacunas al día en perros",
      "categoria": "Prevención",
      "descripcion": "Mantener el esquema de vacunación completo ayuda...",
      "imagen": "https://placehold.co/600x400?text=Consejo+Perros+Vacunas",
      "recomendacion": "Agenda revisiones semestrales y conserva la cartilla...",
      "nivelImportancia": "Alta",
      "mascotaRelacionada": "Perros"
    }
  ]
}
```

### `GET /api/consejos/Perros`

```json
{
  "ok": true,
  "total": 2,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f680",
      "titulo": "Vacunas al día en perros",
      "categoria": "Prevención",
      "descripcion": "Mantener el esquema de vacunación completo ayuda...",
      "imagen": "https://placehold.co/600x400?text=Consejo+Perros+Vacunas",
      "recomendacion": "Agenda revisiones semestrales y conserva la cartilla...",
      "nivelImportancia": "Alta",
      "mascotaRelacionada": "Perros"
    }
  ]
}
```

### `GET /api/buscar?q=vacuna`

```json
{
  "ok": true,
  "query": "vacuna",
  "totals": {
    "servicios": 1,
    "mascotas": 1,
    "promociones": 1,
    "consejos": 1
  },
  "data": {
    "servicios": [
      {
        "nombre": "Vacunación",
        "precio": 280
      }
    ],
    "mascotas": [
      {
        "nombre": "Perros"
      }
    ],
    "promociones": [
      {
        "titulo": "Paquete cachorro sano"
      }
    ],
    "consejos": [
      {
        "titulo": "Vacunas al día en perros"
      }
    ]
  }
}
```

### `POST /api/citas`

Request:

```json
{
  "nombreCliente": "María López",
  "nombreMascota": "Nala",
  "tipoMascota": "Perros",
  "servicioSolicitado": "Consulta general",
  "fechaDeseada": "2026-07-02",
  "horaDeseada": "16:30",
  "telefono": "5512345678",
  "observaciones": "Tiene alergia en la piel"
}
```

Response:

```json
{
  "ok": true,
  "message": "Solicitud de cita registrada correctamente.",
  "data": {
    "_id": "6858e2d3b0c09e72ca20f690",
    "nombreCliente": "María López",
    "nombreMascota": "Nala",
    "tipoMascota": "Perros",
    "servicioSolicitado": "Consulta general",
    "fechaDeseada": "2026-07-02",
    "horaDeseada": "16:30",
    "telefono": "5512345678",
    "observaciones": "Tiene alergia en la piel",
    "estado": "pendiente",
    "createdAt": "2026-06-23T18:00:00.000Z",
    "updatedAt": "2026-06-23T18:00:00.000Z"
  }
}
```

### `GET /api/citas`

Header:

```http
Authorization: Bearer token-seguro-veterinaria
```

Response:

```json
{
  "ok": true,
  "total": 1,
  "data": [
    {
      "_id": "6858e2d3b0c09e72ca20f690",
      "nombreCliente": "María López",
      "nombreMascota": "Nala",
      "tipoMascota": "Perros",
      "servicioSolicitado": "Consulta general",
      "fechaDeseada": "2026-07-02",
      "horaDeseada": "16:30",
      "telefono": "5512345678",
      "observaciones": "Tiene alergia en la piel",
      "estado": "pendiente"
    }
  ]
}
```

## 6. Cómo probar en navegador o Postman

### En navegador

Puedes abrir directamente:

- `http://localhost:3000/api/health`
- `http://localhost:3000/api/servicios`
- `http://localhost:3000/api/promociones`
- `http://localhost:3000/api/consejos/Perros`
- `http://localhost:3000/api/buscar?q=vacuna`

`GET /api/citas` no conviene probarlo en navegador porque necesita el header `Authorization`.

### En Postman

1. Crea una colección llamada `Hound Hub API`.
2. Agrega una request `GET http://localhost:3000/api/health`.
3. Agrega una request `POST http://localhost:3000/api/citas` con body `raw -> JSON`.
4. Agrega una request `GET http://localhost:3000/api/citas`.
5. En la pestaña `Headers` de esa request protegida agrega:

```http
Authorization: Bearer token-seguro-veterinaria
```

6. Para buscar por palabra usa:

```http
GET http://localhost:3000/api/buscar?q=perro
```

## 7. Cómo conectar la API con Alexa Skill

Tu skill actual hoy usa datos persistidos en DynamoDB y funciones internas. Para migrarla a esta API:

1. Despliega la API en Render.
2. Guarda en la Lambda o Alexa Hosted Skill estas variables:
   - `HOUND_HUB_API_URL=https://tu-api.onrender.com`
   - `HOUND_HUB_API_TOKEN=token-seguro-veterinaria`
3. Copia el cliente del archivo `examples/alexa/houndHubApiClient.js`.
4. Importa sus funciones en `lambda/index.js`.
5. Reemplaza las lecturas locales por llamadas HTTP.

### Ejemplo simple usando `fetch`

```js
const response = await fetch(`${process.env.HOUND_HUB_API_URL}/api/promociones`);
const data = await response.json();
```

### Ejemplo protegido con Bearer Token

```js
const response = await fetch(`${process.env.HOUND_HUB_API_URL}/api/citas`, {
  headers: {
    Authorization: `Bearer ${process.env.HOUND_HUB_API_TOKEN}`
  }
});
const data = await response.json();
```

## 8. Funciones de Alexa incluidas

En `examples/alexa/index.example.js` ya vienen handlers de ejemplo para:

- Consultar servicios
- Consultar precio de un servicio
- Consultar promociones
- Consultar consejos de cuidado
- Consultar información de una mascota
- Registrar solicitud de cita

Estas funciones están pensadas para integrarse con `ask-sdk-core` y adaptarse a tu `lambda/index.js`. En los ejemplos ya se guarda `currentImage` en sesión para que puedas mostrar la imagen que regresa la API en APL dependiendo de lo que el usuario pida.

## 9. Preparado para Render

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Variables de entorno en Render

Configura estas variables en el panel de tu servicio:

- `PORT`
- `MONGODB_URI`
- `DB_NAME`
- `API_TOKEN`

### Buenas prácticas ya aplicadas para Render

- El servidor usa `process.env.PORT`
- No hay URLs hardcodeadas con `localhost` para producción
- MongoDB Atlas se conecta con variables de entorno
- El proyecto queda listo para desplegar como Web Service en Render

## 10. Buenas prácticas implementadas

- Código modular por rutas, controladores y modelos
- Manejo de errores con `try/catch`
- Middleware de autenticación Bearer Token
- CORS habilitado
- Validación de campos obligatorios en citas
- Respuestas claras en JSON
- Búsqueda normalizada sin problemas por acentos o mayúsculas
- Compatible con español de México
- Seed inicial para proyecto universitario con estilo profesional

## 11. Sugerencia para integrar con tu skill actual

Tu skill compartida hoy maneja servicios como `dog walking`, `dog training` y `veterinary care`. Si quieres que Alexa consuma esta nueva API sin romper tanto tu proyecto actual, el siguiente paso ideal es:

1. Traducir los intents y slots al catálogo real en español.
2. Sustituir `util.getCatalogByService()` por llamadas a `/api/servicios`.
3. Sustituir `util.getServiceFromDatabase()` por `/api/servicios/:nombre`.
4. Crear un intent nuevo para promociones usando `/api/promociones`.
5. Crear un intent nuevo para consejos usando `/api/consejos/:mascota`.
6. Crear un intent de solicitud de cita usando `POST /api/citas`.

Si quieres, en el siguiente paso puedo tomar tu `lambda/index.js` actual y dejártelo ya adaptado para consumir esta API nueva.
