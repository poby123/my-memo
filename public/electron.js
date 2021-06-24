const { app, ipcMain } = require('electron');
const channelList = require('../src/channelList');
const functions = require('./electron-functions');

app.whenReady().then(functions.newWindow);

app.on('window-all-closed', () => {
  app.quit();
});

/* Ipc Handlers */
ipcMain.on(channelList.response.save, (e, val) => functions.fileSave(val));
ipcMain.on(channelList.response.saveAs, (e, val) => functions.fileSaveAs(val));
