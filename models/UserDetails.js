// models/UserDetails.js

const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Detalles personales
  nombres: {
    type: String,
    required: false,
  },
  apellidos: {
    type: String,
    required: false,
  },
  identificacion: {
    type: String,
    required: false,
    
  },
  // Detalles de información de contacto
  telefono: {
    type: String,
    required: false,
  },
  direccion: {
    type: String,
    required: false,
  },
  pais: {
    type: String,
    required: false,
  },
  ciudad: {
    type: String,
    required: false,
  },
  codigoPostal: {
    type: String,
    required: false,
  },
  
  // Disponibilidad para trabajar
  
  disponibilidad: {
    type: Boolean,
    required: false,
    default: false,
  },
  fechaDisponibilidad: {
    type: Date,
    required: false,
  },
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;