const { app, ipcMain, BrowserWindow, Menu, remote, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const channelList = require('../src/channelList');
const dialogOptions = require('./electron-dialog-options');

module.exports = {
  /* file save as */
  fileSaveAs: async (event, value) => {
    try {
      const { filePath } = await dialog.showSaveDialog(dialogOptions.save);

      /* invalid path */
      if (!filePath) {
        return;
      }

      const ext = path.extname(filePath);
      if (ext === '.html' || ext === '.mthml') {
        value = value.html;
      } else {
        value = value.txt;
      }

      fs.writeFile(filePath, value, (err) => {
        if (err) {
          console.error('error is occured! :', err);
        }
      });
    } catch (e) {
      console.error(e);
    }
  },

  /* file open */
  fileOpen: async (successCallback) => {
    try {
      const { filePaths } = await dialog.showOpenDialog(dialogOptions.open);

      /* invalid path */
      if (filePaths.length <= 0) {
        return;
      }

      fs.readFile(filePaths[0], 'utf-8', (err, value) => {
        if (err) {
          throw err;
        }
        successCallback(value);
      });
    } catch (e) {
      console.error(e);
    }
  },
};
