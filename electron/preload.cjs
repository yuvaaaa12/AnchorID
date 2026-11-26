const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('anchorAPI', {
  // Window Controls
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  // Native File Dialogs
  openFileDialog: (options) => ipcRenderer.invoke('dialog:openFile', options),
  saveFileDialog: (options) => ipcRenderer.invoke('dialog:saveFile', options),
  
  // File operations
  readFileBuffer: (filePath) => ipcRenderer.invoke('file:readBuffer', filePath),
  saveFileBuffer: (filePath, buffer) => ipcRenderer.invoke('file:saveBuffer', filePath, buffer),

  // Open external links safely
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),

  // System notifications
  showNotification: (title, body) => ipcRenderer.send('app:notification', { title, body }),

  // App metadata
  getAppVersion: () => ipcRenderer.invoke('app:version'),
  getPlatform: () => process.platform,
});
