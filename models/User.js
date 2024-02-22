const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  correo: {
    type: String,
    unique: true,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  rol: { type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario' },
});

// Antes de guardar, hashea la contraseña
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('contrasena')) return next();

  const hash = await bcrypt.hash(user.contrasena, 10);
  user.contrasena = hash;
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
