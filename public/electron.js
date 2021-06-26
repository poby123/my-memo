const { app, ipcMain } = require('electron');
const channelList = require('../src/common/channelList');
const functions = require('./electron-functions');

app.whenReady().then(functions.newWindow);

app.on('window-all-closed', () => {
  app.quit();
});

/* Ipc Handlers */
ipcMain.on(channelList.response.isLoaded, (e) => {
  const filePath = process.argv[1];
  
  if (filePath && filePath !== '.') {
    functions.fileOpenWithOutDialog({ filePath: process.argv[1] });
  }
});
ipcMain.on(channelList.response.save, (e, val) => functions.fileSave(val));
ipcMain.on(channelList.response.saveAs, (e, val) => functions.fileSaveAs(val));
