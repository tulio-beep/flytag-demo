const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require('fs');
const path = require('path');


let win; // Definindo a variável win no escopo global do módulo
var data = JSON.parse(fs.readFileSync('data/itens.JSON')) //SIMULAÇÃO RETORNOS API - BANCO DE DADOS. 

console.log(data)

const createWindow = () => {
    win = new BrowserWindow({
      frame: false,
      minWidth: 700,
      minHeight: 570,
      webPreferences: {
          //icon: path.join(__dirname, 'styles/imgs/logo-tuper.svg'),
          nodeIntegration: true,
          preload: path.join(__dirname, 'preload.js'), // Configura o preload script
          contextIsolation: true,
          enableRemoteModule: false,
      }});
    win.loadFile("index.html");
    win.maximize();
    win.once('ready-to-show', win.show())
    win.on('closed', () => {
      win = null;
    });
  };

  
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
  
  ipcMain.on("minimize-window", () => {
    if (win) win.minimize();
  });
  
  ipcMain.on("maximize-window", () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });
  
  
  ipcMain.on("close-window", () => {
    if (win) win.close();
  });
  
  ipcMain.on('data-request', (event, arg) => {


    //aqui existe a possibilidade de conexão com uma API que por sua vez consulta uma DB. 
    //para esta demonstração o endereçamento dos materiais está acontecendo no client-side.
    event.sender.send('data-response', data[arg]);
   });