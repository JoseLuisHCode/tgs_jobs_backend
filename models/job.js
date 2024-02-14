const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  cargo: String,
  empresa: String,
  ciudad: String,
  pago: String,
  tiempoDeTrabajo: String,
  palabrasClave: [String],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
