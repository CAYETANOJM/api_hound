const Consejo = require('../models/Consejo');
const { normalizeText } = require('../utils/normalize');

async function getConsejos(req, res, next) {
  try {
    const consejos = await Consejo.find().sort({ mascotaRelacionada: 1, titulo: 1 }).lean();

    return res.json({
      ok: true,
      total: consejos.length,
      data: consejos
    });
  } catch (error) {
    return next(error);
  }
}

async function getConsejosByMascota(req, res, next) {
  try {
    const mascota = normalizeText(req.params.mascota);
    const consejos = await Consejo.find({
      normalizedMascotaRelacionada: mascota
    })
      .sort({ titulo: 1 })
      .lean();

    if (consejos.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No se encontraron consejos para esa mascota.'
      });
    }

    return res.json({
      ok: true,
      total: consejos.length,
      data: consejos
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getConsejos,
  getConsejosByMascota
};
