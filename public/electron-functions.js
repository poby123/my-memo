const { app, ipcMain, BrowserWindow, Menu, remote, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const channelList = require('../src/channelList');
const dialogOptions = require('./electron-dialog-options');

class ElectronFunctions {
  /* send to React */
  sendToReact = (win, channelName, val) => {
    win.webContents.send(channelName, val);
  };

  /* new window */
  newWindow = () => {
    let win = new BrowserWindow({
      show: false,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        preload: `${__dirname}/preload.js`,
      },
    });

    if (process.env.mode === 'dev') {
      win.loadURL('http://localhost:3000');
      win.webContents.openDevTools();
    } else {
      // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
      win.loadFile(`${path.join(__dirname, '../build/index.html')}`);
    }

    const menus = require('./electron-menus')(win);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

    win.once('ready-to-show', () => win.show());
    win.on('closed', () => {
      win = null;
    });
  };

  /* file open */
  fileOpen = async (win) => {
    try {
      const { filePaths } = await dialog.showOpenDialog(dialogOptions.open);

      /* invalid path */
      if (filePaths.length <= 0) {
        return;
      }

      fs.readFile(filePaths[0], 'utf-8', (err, fileContent) => {
        if (err) {
          throw err;
        }
        const fileName = path.basename(filePaths[0]);
        this.sendToReact(win, channelList.request.sendFileContent, { fileContent, fileName });
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* file save as */
  fileSaveAs = async (event, value) => {
    try {
      const { filePath } = await dialog.showSaveDialog(dialogOptions.save);

      /* invalid path */
      if (!filePath) {
        return;
      }

      const fileName = path.basename(filePath);
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

      /* After save file, open file */
      // dialog 생기는 문제...
      // this.fileOpen((value) => sendToReact(channelList.request.sendFileContent, value));
      
    } catch (e) {
      console.error(e);
    }
  };
}

module.exports = new ElectronFunctions();
