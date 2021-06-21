const { app, ipcMain, BrowserWindow, Menu, remote, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const channelList = require('../src/channelList');
const dialogOptions = require('./electron-dialog-options');
const functions = require('./electron-functions');

app.whenReady().then(functions.newWindow);

app.on('window-all-closed', () => {
  app.quit();
});

/* Ipc Handlers */
ipcMain.on(channelList.response.saveAs, functions.fileSaveAs);
