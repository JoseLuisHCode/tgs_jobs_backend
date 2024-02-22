// controllers/backofficeController.js

const Job = require('../models/Job');

const backofficeController = {
  createJob: async (req, res) => {
    try {
      const {
        cargo,
        empresa,
        ciudad,
        pago,
        tipoDeTrabajo,
        descripcion,
        requisitos,
        experienciaRequerida,
        habilidadesNecesarias,
        fechaPublicacion,
        fechaLimite,
      } = req.body;

      const newJob = new Job({
        cargo,
        empresa,
        ciudad,
        pago,
        tipoDeTrabajo,
        descripcion,
        requisitos,
        experienciaRequerida,
        habilidadesNecesarias,
        fechaPublicacion,
        fechaLimite,
      });

      await newJob.save();
      res.status(201).json({ message: 'Oferta de trabajo creada con éxito.' });
    } catch (error) {
      console.error('Error al crear oferta de trabajo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error al obtener ofertas de trabajo:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
};

module.exports = backofficeController;