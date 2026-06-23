const mongoose = require('mongoose');
const { normalizeText, buildSearchText } = require('../utils/normalize');

const mascotaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la mascota es obligatorio.'],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria.'],
      trim: true
    },
    cuidadosRecomendados: {
      type: [String],
      default: []
    },
    serviciosSugeridos: {
      type: [String],
      default: []
    },
    imagen: {
      type: String,
      required: [true, 'La imagen es obligatoria.'],
      trim: true
    },
    normalizedNombre: {
      type: String,
      index: true
    },
    searchText: {
      type: String,
      index: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'mascotas'
  }
);

mascotaSchema.pre('validate', function setNormalizedFields(next) {
  this.normalizedNombre = normalizeText(this.nombre);
  this.searchText = buildSearchText([
    this.nombre,
    this.descripcion,
    this.cuidadosRecomendados,
    this.serviciosSugeridos
  ]);
  next();
});

module.exports = mongoose.model('Mascota', mascotaSchema);
