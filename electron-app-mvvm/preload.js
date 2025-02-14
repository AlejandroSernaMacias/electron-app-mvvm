const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  guardarUsuario: (usuario) => ipcRenderer.invoke('guardar-usuario', usuario),
});