/**
 * //index.js
 * Archivo principal de la aplicación.
 * Configura y inicializa el servidor Express y la conexión a MongoDB.
 */

// Importar dependencias
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

// Crear instancia de Express
const app = express();

// Configurar puerto
const PORT = process.env.PORT || 3001;

/**
 * Configuración de CORS (Cross-Origin Resource Sharing)
 * Permite que el encabezado Authorization sea accesible desde el cliente.
 */
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || '*', // Reemplaza con el dominio de tu aplicación frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  exposedHeaders: ['Authorization'], // Agregar el encabezado Authorization
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

/**
 * Conexión a MongoDB
 */
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verificar la conexión a la base de datos
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error.message);
  // process.exit(1); // Detener la ejecución de la aplicación en caso de error de conexión (opcional)
});
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

/**
 * Rutas de la API
 */
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TGS Jobs');
});
app.use(routes);

/**
 * Middleware para manejar rutas no encontradas
 */
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada.');
});

/**
 * Middleware global de manejo de errores
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

/**
 * Iniciar el servidor
 */
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

/**
 * Utiliza el middleware de manejo de errores para capturar y manejar
 * los errores personalizados y otros errores genéricos.
 * Este middleware debe estar ubicado después de las rutas y otros middlewares.
 */
app.use(errorHandlerMiddleware);