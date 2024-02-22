// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const authMiddleware = require('../middleware/authMiddleware');

// Crear una nueva aplicación
router.post('/applications', async (req, res) => {
  const { jobId, userId, resume } = req.body;

  try {
    const application = new Application({ jobId, userId, resume });
    const savedApplication = await application.save();
    res.json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las aplicaciones
router.get('/applications', authMiddleware.authenticate, authMiddleware.isAdmin, async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aprobar o rechazar una aplicación específica
router.put('/applications/:id/:status', async (req, res) => {
  const validStatuses = ['approved', 'rejected'];
  const { id, status } = req.params;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Estado de aplicación no válido' });
  }

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Aplicación no encontrada' });
    }

    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
