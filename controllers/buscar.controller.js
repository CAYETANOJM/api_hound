const Servicio = require('../models/Servicio');
const Mascota = require('../models/Mascota');
const Promocion = require('../models/Promocion');
const Consejo = require('../models/Consejo');
const { normalizeText, escapeRegex } = require('../utils/normalize');

async function searchAll(req, res, next) {
  try {
    const rawQuery = req.query.q;

    if (!rawQuery) {
      return res.status(400).json({
        ok: false,
        message: 'Debes enviar un término de búsqueda usando ?q='
      });
    }

    const normalizedQuery = normalizeText(rawQuery);
    const searchRegex = new RegExp(escapeRegex(normalizedQuery), 'i');

    const [servicios, mascotas, promociones, consejos] = await Promise.all([
      Servicio.find({ searchText: searchRegex }).sort({ nombre: 1 }).lean(),
      Mascota.find({ searchText: searchRegex }).sort({ nombre: 1 }).lean(),
      Promocion.find({ searchText: searchRegex, activo: true }).sort({ vigencia: 1 }).lean(),
      Consejo.find({ searchText: searchRegex }).sort({ titulo: 1 }).lean()
    ]);

    return res.json({
      ok: true,
      query: rawQuery,
      totals: {
        servicios: servicios.length,
        mascotas: mascotas.length,
        promociones: promociones.length,
        consejos: consejos.length
      },
      data: {
        servicios,
        mascotas,
        promociones,
        consejos
      }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  searchAll
};
