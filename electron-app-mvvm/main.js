const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { guardarUsuario } = require('./database'); // Importa la función
const FormularioViewModel = require('./viewModels/formularioViewModel');

let mainWindow;
const viewModel = new FormularioViewModel(); // Instancia del ViewModel

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle('guardar-usuario', async (event, usuario) => {
    try {
      const id = await viewModel.guardarUsuario(usuario.nombre, usuario.email, usuario.edad);
      return id;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});