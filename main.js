

const { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem } = require('electron');
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

  // win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, 'src/index.html'));
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
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

  ipcMain.handle('dialog:openFile', handleFileOpen)

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

