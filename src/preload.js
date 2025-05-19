// const { contextBridge, ipcRenderer } = require('electron');

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    onUpdateAvailable: (callback) => ipcRenderer.on('update_available', callback),
    onUpdateProgress: (callback) => ipcRenderer.on('update_progress', (event, progress) => callback(progress)),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update_downloaded', callback),
    onUpdateError: (callback) => ipcRenderer.on('update_error', (event, error) => callback(error)),
    restartApp: () => ipcRenderer.invoke('restart-app'),
    removeAllListeners: () => {
        ipcRenderer.removeAllListeners('update_available');
        ipcRenderer.removeAllListeners('update_progress');
        ipcRenderer.removeAllListeners('update_downloaded');
        ipcRenderer.removeAllListeners('update_error');
    }
});
