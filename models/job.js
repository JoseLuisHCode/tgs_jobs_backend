// models/Job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  cargo: {
    type: String,
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  pago: {
    type: Number,
    required: true,
  },
 tipoDeTrabajo: {
    type: String,
    required: true,
  },
  // Nuevas propiedades agregadas
  descripcion: {
    type: String,
    required: true,
  },
  requisitos: {
    type: String,
    required: true,
  },
  experienciaRequerida: {
    type: Number,
    required: true,
  },
  habilidadesNecesarias: {
    type: [String],
    required: true,
  },
  fechaPublicacion: {
    type: Date,
    required: true,
  },
  fechaLimite: {
    type: Date,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;