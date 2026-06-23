const mongoose = require('mongoose');
const { normalizeText, buildSearchText } = require('../utils/normalize');

const servicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del servicio es obligatorio.'],
      trim: true
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria.'],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria.'],
      trim: true
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio.'],
      min: 0
    },
    duracionEstimada: {
      type: String,
      required: [true, 'La duración estimada es obligatoria.'],
      trim: true
    },
    disponibilidad: {
      type: Boolean,
      default: true
    },
    imagen: {
      type: String,
      required: [true, 'La imagen es obligatoria.'],
      trim: true
    },
    recomendaciones: {
      type: [String],
      default: []
    },
    beneficios: {
      type: [String],
      default: []
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
    collection: 'servicios'
  }
);

servicioSchema.pre('validate', function setNormalizedFields(next) {
  this.normalizedNombre = normalizeText(this.nombre);
  this.searchText = buildSearchText([
    this.nombre,
    this.categoria,
    this.descripcion,
    this.recomendaciones,
    this.beneficios
  ]);
  next();
});

module.exports = mongoose.model('Servicio', servicioSchema);
