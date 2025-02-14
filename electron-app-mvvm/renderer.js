document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('miFormulario');
  
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const edad = document.getElementById('edad').value;
 




      
      try {
        const id = await window.electronAPI.guardarUsuario({ nombre, email, edad: parseInt(edad) });    
        console.log('Usuario guardado con ID:', id); 
        alert('Usuario guardado exitosamente.');
        formulario.reset();
      } catch (error) {
        console.error('Error al guardar usuario:', error);
        alert('Error al guardar usuario. Inténtalo de nuevo.');
      }
    });
  });