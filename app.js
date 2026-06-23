const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const veterinariosRoutes = require('./routes/veterinarios.routes');
const mascotasRoutes = require('./routes/mascotas.routes');
const promocionesRoutes = require('./routes/promociones.routes');
const consejosRoutes = require('./routes/consejos.routes');
const citasRoutes = require('./routes/citas.routes');
const buscarRoutes = require('./routes/buscar.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API de Veterinaria Hound Hub activa',
    documentation: '/api/health'
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/veterinarios', veterinariosRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/promociones', promocionesRoutes);
app.use('/api/consejos', consejosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/buscar', buscarRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
