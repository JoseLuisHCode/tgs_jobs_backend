const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Obtener todas las vacantes
router.get('/jobs', async (req, res) => {
  try {
    const vacancies = await Job.find();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una vacante por su ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva vacante
router.post('/jobs', async (req, res) => {
  const job = new Job(req.body);

  try {
    const savedJob = await job.save();
    res.json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una vacante
router.put('/jobs/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una vacante
router.delete('/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }
    res.json({ message: 'Vacante eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
