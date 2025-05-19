const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onUpdateAvailable: (callback) => ipcRenderer.on('update_available', callback),
    onUpdateProgress: (callback) => ipcRenderer.on('update_progress', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update_downloaded', callback),
    onUpdateError: (callback) => ipcRenderer.on('update_error', callback),
    restartApp: () => ipcRenderer.invoke('restart-app'),
});
