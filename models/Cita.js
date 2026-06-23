const mongoose = require('mongoose');
const { normalizeText, buildSearchText } = require('../utils/normalize');

const citaSchema = new mongoose.Schema(
  {
    nombreCliente: {
      type: String,
      required: [true, 'El nombre del cliente es obligatorio.'],
      trim: true
    },
    nombreMascota: {
      type: String,
      required: [true, 'El nombre de la mascota es obligatorio.'],
      trim: true
    },
    tipoMascota: {
      type: String,
      required: [true, 'El tipo de mascota es obligatorio.'],
      trim: true
    },
    servicioSolicitado: {
      type: String,
      required: [true, 'El servicio solicitado es obligatorio.'],
      trim: true
    },
    fechaDeseada: {
      type: String,
      required: [true, 'La fecha deseada es obligatoria.'],
      trim: true
    },
    horaDeseada: {
      type: String,
      required: [true, 'La hora deseada es obligatoria.'],
      trim: true
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio.'],
      trim: true
    },
    observaciones: {
      type: String,
      default: '',
      trim: true
    },
    estado: {
      type: String,
      default: 'pendiente',
      trim: true
    },
    searchText: {
      type: String,
      index: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'citas'
  }
);

citaSchema.pre('validate', function setSearchText(next) {
  this.searchText = buildSearchText([
    this.nombreCliente,
    this.nombreMascota,
    this.tipoMascota,
    this.servicioSolicitado,
    this.observaciones,
    normalizeText(this.telefono)
  ]);
  next();
});

module.exports = mongoose.model('Cita', citaSchema);
