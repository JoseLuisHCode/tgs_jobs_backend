//models/UserCV.js
const mongoose = require('mongoose');

const userCVSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  objetivoProfesional: {
    type: String,
    required: false,
  },
  experienciaLaboral: [{
    empresa: {
      type: String,
      required: false,
    },
    puesto: {
      type: String,
      required: false,
    },
    fechaInicio: {
      type: Date,
      required: false,
    },
    fechaFin: {
      type: Date,
      default: null,
    },
    actualmenteTrabajando: {
      type: Boolean,
      default: false,
    },
    responsabilidades: {
      type: [String],
      required: false,
    },
    descripcion: {
      type: String,
      required: false,
    },
  }],

  educacion: [{
    nivelEducacion: {
      type: String,
      required: false,
    },
    disiplina: {
      type: String,
      required: false,
    },
    institucion: {
      type: String,
      required: false,
    },
    titulo: {
      type: String,
      required: false,
    },
    fechaInicio: {
      type: Date,
      required: false,
    },
    fechaFin: {
      type: Date,
      default: null,
    },
    actualmenteEstudiando: {
      type: Boolean,
      default: false,
    },
  }],

  cursosFormacion: [{
    nombre: {
      type: String,
      required: false,
    },
    institucion: {
      type: String,
      required: false,
    },
    fechaInicio: {
      type: Date,
      required: false,
    },
    fechaFin: {
      type: Date,
      default: null,
    },
    enCurso: {
      type: Boolean,
      default: false,
    },
  }],

  habilidades: {
    type: [String],
    required: false,
  },
  certificaciones: {
    type: [String],
    required: false,
  },
  idiomas: [{
    idioma: {
      type: String,
      required: false,
    },
    fluidez: {
      type: String,
      enum: ['Nativo', 'Fluido', 'Avanzado', 'Intermedio', 'Básico'],
      required: false,
    },
  }],

  referencias: [{
    nombre: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      enum: ['Laboral', 'Académica', 'Personal'],
      required: false,
    },
    empresa: {
      type: String,
      required: false,
    },
    contacto: {
      type: String,
      required: true,
    },
  }],

  portafolio: {
    type: String,
    required: false,
  },
  proyectosRelevantes: [{
    nombre: {
      type: String,
      required: false,
    },
    descripcion: {
      type: String,
      required: false,
    },
    resultado: {
      type: String,
      required: false,
    },
  }],
  
});

const UserCV = mongoose.model('UserCV', userCVSchema);

module.exports = UserCV;