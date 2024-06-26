// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  vacancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vacancy',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  resume: {
    type: String,  // Puedes ajustar este campo según la estructura de los currículums en tu aplicación
    
  },
  // Agrega cualquier otra información relevante para la aplicación
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;