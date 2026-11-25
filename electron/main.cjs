const { app, BrowserWindow, ipcMain, dialog, shell, Notification } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    title: 'AnchorID — Blockchain Credential Verification Platform',
    backgroundColor: '#F5F6F8',
    frame: false, // Custom sleek desktop titlebar
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    },
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Prevent opening links inside electron window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC: Window Controls
ipcMain.on('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window:close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window:isMaximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// IPC: File Dialogs
ipcMain.handle('dialog:openFile', async (event, options = {}) => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: options.filters || [
      { name: 'Certificates & Documents', extensions: ['pdf', 'png', 'jpg', 'jpeg'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    title: options.title || 'Select Certificate Document'
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  const fileStat = fs.statSync(filePath);
  const fileExt = path.extname(filePath).toLowerCase();

  return {
    path: filePath,
    name: path.basename(filePath),
    size: fileStat.size,
    extension: fileExt,
  };
});

ipcMain.handle('dialog:saveFile', async (event, options = {}) => {
  if (!mainWindow) return null;
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: options.defaultPath || 'AnchorID_Verification_Report.pdf',
    filters: options.filters || [
      { name: 'PDF Document', extensions: ['pdf'] }
    ],
    title: options.title || 'Save Verification Report'
  });

  return result.canceled ? null : result.filePath;
});

// IPC: Safe File reading & writing
ipcMain.handle('file:readBuffer', async (event, filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    return {
      success: true,
      data: Array.from(buffer), // Send as byte array
      size: buffer.length,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('file:saveBuffer', async (event, filePath, bufferArray) => {
  try {
    const buffer = Buffer.from(bufferArray);
    fs.writeFileSync(filePath, buffer);
    return { success: true, path: filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC: Open external link
ipcMain.handle('shell:openExternal', async (event, url) => {
  if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});

// IPC: System Notification
ipcMain.on('app:notification', (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || 'AnchorID Notification',
      body: body || '',
      icon: path.join(__dirname, 'assets/icon.png')
    }).show();
  }
});

ipcMain.handle('app:version', () => {
  return app.getVersion();
});
