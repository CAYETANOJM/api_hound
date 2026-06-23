const mongoose = require('mongoose');
const { buildSearchText } = require('../utils/normalize');

const promocionSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio.'],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria.'],
      trim: true
    },
    descuento: {
      type: String,
      required: [true, 'El descuento es obligatorio.'],
      trim: true
    },
    imagen: {
      type: String,
      required: [true, 'La imagen de la promoción es obligatoria.'],
      trim: true
    },
    vigencia: {
      type: Date,
      required: [true, 'La vigencia es obligatoria.']
    },
    servicioRelacionado: {
      type: String,
      required: [true, 'El servicio relacionado es obligatorio.'],
      trim: true
    },
    activo: {
      type: Boolean,
      default: true
    },
    searchText: {
      type: String,
      index: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'promociones'
  }
);

promocionSchema.pre('validate', function setSearchText(next) {
  this.searchText = buildSearchText([
    this.titulo,
    this.descripcion,
    this.descuento,
    this.imagen,
    this.servicioRelacionado
  ]);
  next();
});

module.exports = mongoose.model('Promocion', promocionSchema);
