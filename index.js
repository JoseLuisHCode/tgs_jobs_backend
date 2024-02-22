require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const jobRoutes = require('./routes/jobRoutes'); // Rutas de la API pública
const backofficeRoutes = require('./routes/backofficeRoutes'); // Rutas del backoffice
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS
app.use(cors({
  exposedHeaders: ['Authorization'], // Permite que el encabezado Authorization sea accesible desde el cliente
}));

const corsOptions = {
  origin: '*',
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
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Rutas de la API
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TGS Jobs');
});

// Rutas protegidas
app.use('/api/', userRoutes);
app.use('/api/', protectedRoutes);
app.use('/api/', applicationRoutes)

// Rutas de la API pública
app.use('/api', jobRoutes);

// Rutas del backoffice
app.use('/api/backoffice', backofficeRoutes);

// Manejar las rutas que no han sido definidas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
