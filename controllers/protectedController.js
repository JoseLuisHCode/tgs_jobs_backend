// protectedController.js

const protectedController = {
    getProtectedRoute: (req, res) => {
      // Lógica para la ruta protegida
      res.json({ message: 'Ruta protegida (procon).', userId: req.userId, rol: req.rol });
    },
  };
  
  
  module.exports = protectedController;