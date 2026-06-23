const Promocion = require('../models/Promocion');

async function getPromocionesActivas(req, res, next) {
  try {
    const today = new Date();
    const promociones = await Promocion.find({
      activo: true,
      vigencia: { $gte: today }
    })
      .sort({ vigencia: 1 })
      .lean();

    return res.json({
      ok: true,
      total: promociones.length,
      data: promociones
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPromocionesActivas
};
