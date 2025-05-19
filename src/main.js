import { app, BrowserWindow, ipcMain } from 'electron'; // Added ipcMain import
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { autoUpdater } from 'electron-updater';

if (started) {
  app.quit();
}

let mainWindow; // Store window reference globally

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Auto-updater initialization
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Initialize auto-updater after window creation
  autoUpdater.checkForUpdatesAndNotify();

  // Dev tools should be conditional
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Event listeners moved inside window creation
  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });

  autoUpdater.on('download-progress', (progressObj) => {
    mainWindow.webContents.send('update_progress', progressObj);
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
  });

  ipcMain.handle('restart-app', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', (error) => {
    mainWindow.webContents.send('update_error', error);
  });
};

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      autoUpdater.checkForUpdatesAndNotify();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});