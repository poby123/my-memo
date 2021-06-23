const { app, ipcMain, BrowserWindow, Menu, remote, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const channelList = require('../src/channelList');
const dialogOptions = require('./electron-dialog-options');
const functions = require('./electron-functions');
const { assert } = require('console');

app.whenReady().then(functions.newWindow);

app.on('window-all-closed', () => {
  app.quit();
});

/* Ipc Handlers */

/* Save */
ipcMain.on(channelList.response.save, (e, val) => functions.fileSave(val));

/* Save as */
ipcMain.on(channelList.response.saveAs, (e, val) => functions.fileSaveAs(val));
