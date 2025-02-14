const { guardarUsuario } = require('../database'); // Importa la función de la base de datos
const Usuario = require('../models/usuario');

class FormularioViewModel {
  async guardarUsuario(nombre, email, edad) {
    const usuario = new Usuario(nombre, email, edad);
    try {
      const id = await guardarUsuario(usuario);
      console.error('id:', id);
      return id;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  }
}

module.exports = FormularioViewModel;