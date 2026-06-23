const Servicio = require('../models/Servicio');
const { normalizeText } = require('../utils/normalize');

async function getServicios(req, res, next) {
  try {
    const servicios = await Servicio.find().sort({ nombre: 1 }).lean();

    return res.json({
      ok: true,
      total: servicios.length,
      data: servicios
    });
  } catch (error) {
    return next(error);
  }
}

async function getServicioByNombre(req, res, next) {
  try {
    const nombre = normalizeText(req.params.nombre);
    const servicio = await Servicio.findOne({ normalizedNombre: nombre }).lean();

    if (!servicio) {
      return res.status(404).json({
        ok: false,
        message: 'Servicio no encontrado.'
      });
    }

    return res.json({
      ok: true,
      data: servicio
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getServicios,
  getServicioByNombre
};
