const mongoose = require('mongoose');
const { normalizeText, buildSearchText } = require('../utils/normalize');

const consejoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio.'],
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
    imagen: {
      type: String,
      required: [true, 'La imagen del consejo es obligatoria.'],
      trim: true
    },
    recomendacion: {
      type: String,
      required: [true, 'La recomendación es obligatoria.'],
      trim: true
    },
    nivelImportancia: {
      type: String,
      required: [true, 'El nivel de importancia es obligatorio.'],
      trim: true
    },
    mascotaRelacionada: {
      type: String,
      required: [true, 'La mascota relacionada es obligatoria.'],
      trim: true
    },
    normalizedMascotaRelacionada: {
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
    collection: 'consejos'
  }
);

consejoSchema.pre('validate', function setNormalizedFields(next) {
  this.normalizedMascotaRelacionada = normalizeText(this.mascotaRelacionada);
  this.searchText = buildSearchText([
    this.titulo,
    this.categoria,
    this.descripcion,
    this.imagen,
    this.recomendacion,
    this.nivelImportancia,
    this.mascotaRelacionada
  ]);
  next();
});

module.exports = mongoose.model('Consejo', consejoSchema);
