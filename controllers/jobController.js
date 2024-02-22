// jobController.js
const Job = require('../models/Job');

const jobController = {
  createJob: async (req, res) => {
    try {
      const newJob = new Job(req.body);
      await newJob.save();
      res.status(201).json({ message: 'Trabajo creado con éxito.', job: newJob });
    } catch (error) {
      console.error('Error al crear el trabajo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error al obtener trabajos:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getJobById: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Trabajo no encontrado.' });
      }
      res.status(200).json(job);
    } catch (error) {
      console.error('Error al obtener trabajo por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  updateJob: async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!job) {
        return res.status(404).json({ message: 'Trabajo no encontrado.' });
      }
      res.status(200).json({ message: 'Trabajo actualizado con éxito.', job });
    } catch (error) {
      console.error('Error al actualizar trabajo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const job = await Job.findByIdAndDelete(req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Trabajo no encontrado.' });
      }
      res.status(200).json({ message: 'Trabajo eliminado con éxito.', job });
    } catch (error) {
      console.error('Error al eliminar trabajo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
};

module.exports = jobController;