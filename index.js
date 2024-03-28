require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS
app.use(cors({
  exposedHeaders: ['Authorization'], // Permite que el encabezado Authorization sea accesible desde el cliente
}));

const corsOptions = {
  origin: '*', // Reemplaza con el dominio de tu aplicación frontend " origin: 'https://tusitio.com', "
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/tgs_jobs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verificar la conexión a la base de datos
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error.message);
  // process.exit(1); // Detener la ejecución de la aplicación en caso de error de conexión
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Rutas de la API
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TGS Jobs');
});


app.use(routes);

app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada.');
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
