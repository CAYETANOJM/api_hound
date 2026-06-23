const Veterinario = require('../models/Veterinario');

async function getVeterinarios(req, res, next) {
  try {
    const veterinarios = await Veterinario.find().sort({ nombre: 1 }).lean();

    return res.json({
      ok: true,
      total: veterinarios.length,
      data: veterinarios
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getVeterinarios
};
