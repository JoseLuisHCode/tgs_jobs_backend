const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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

// Rutas de la API
const jobRoutes = require('./routes/jobRoutes');
app.use('/api', jobRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
