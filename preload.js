const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    sendDataRequest: (callback) => ipcRenderer.send('data-request', callback),
    onDataResponse: (callback) => ipcRenderer.on('data-response', callback),
});
