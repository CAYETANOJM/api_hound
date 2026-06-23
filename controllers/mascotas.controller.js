const Mascota = require('../models/Mascota');

async function getMascotas(req, res, next) {
  try {
    const mascotas = await Mascota.find().sort({ nombre: 1 }).lean();

    return res.json({
      ok: true,
      total: mascotas.length,
      data: mascotas
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMascotas
};
