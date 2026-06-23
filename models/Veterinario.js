const mongoose = require('mongoose');
const { normalizeText, buildSearchText } = require('../utils/normalize');

const veterinarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del veterinario es obligatorio.'],
      trim: true
    },
    especialidad: {
      type: String,
      required: [true, 'La especialidad es obligatoria.'],
      trim: true
    },
    experiencia: {
      type: String,
      required: [true, 'La experiencia es obligatoria.'],
      trim: true
    },
    horario: {
      type: String,
      required: [true, 'El horario es obligatorio.'],
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
    descripcionProfesional: {
      type: String,
      required: [true, 'La descripción profesional es obligatoria.'],
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
    collection: 'veterinarios'
  }
);

veterinarioSchema.pre('validate', function setNormalizedFields(next) {
  this.normalizedNombre = normalizeText(this.nombre);
  this.searchText = buildSearchText([
    this.nombre,
    this.especialidad,
    this.experiencia,
    this.horario,
    this.descripcionProfesional
  ]);
  next();
});

module.exports = mongoose.model('Veterinario', veterinarioSchema);
