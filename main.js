

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'src/index.html'));
}

app.whenReady().then(() => {

  ipcMain.on('toMain', (event, arg) => {
    console.log(arg); // prints "ping"
    event.reply('fromMain', 'pong'); // send back to renderer process
  });
  
  ipcMain.on('toRenderer', (event, arg) => {
    console.log(arg); // prints "ping"
    event.reply('fromRenderer', 'pong'); // send back to renderer process
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

