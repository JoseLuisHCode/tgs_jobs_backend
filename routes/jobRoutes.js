const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// Obtener todas las vacantes

router.get('/jobs', async (req, res) => {
  try {
    const vacancies = await Job.find();
    res.json(vacancies);
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
    res.json({ message: error.message });
  }
});

module.exports = router;
