const Cita = require('../models/Cita');

const requiredFields = [
  'nombreCliente',
  'nombreMascota',
  'tipoMascota',
  'servicioSolicitado',
  'fechaDeseada',
  'horaDeseada',
  'telefono'
];

async function createCita(req, res, next) {
  try {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        message: `Faltan campos obligatorios: ${missingFields.join(', ')}`
      });
    }

    const cita = await Cita.create({
      nombreCliente: req.body.nombreCliente,
      nombreMascota: req.body.nombreMascota,
      tipoMascota: req.body.tipoMascota,
      servicioSolicitado: req.body.servicioSolicitado,
      fechaDeseada: req.body.fechaDeseada,
      horaDeseada: req.body.horaDeseada,
      telefono: req.body.telefono,
      observaciones: req.body.observaciones || ''
    });

    return res.status(201).json({
      ok: true,
      message: 'Solicitud de cita registrada correctamente.',
      data: cita
    });
  } catch (error) {
    return next(error);
  }
}

async function getCitas(req, res, next) {
  try {
    const citas = await Cita.find().sort({ createdAt: -1 }).lean();

    return res.json({
      ok: true,
      total: citas.length,
      data: citas
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createCita,
  getCitas
};
