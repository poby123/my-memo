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

      await this.fileOpenWithOutDialog(win, { filePath: filePaths[0] });
    } catch (e) {
      console.error(e);
    }
  };

  /* file open */
  fileOpenWithOutDialog = async (win, { filePath }) => {
    try {
      /* invalid path */
      if (!filePath) {
        return;
      }

      fs.readFile(filePath, 'utf-8', (err, fileContent) => {
        if (err) {
          throw err;
        }
        const fileName = path.basename(filePath);

        this.sendToReact(win, channelList.request.sendFileContent, {
          fileContent,
          fileName,
          filePath,
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* file save */
  fileSave = async (val) => {
    try {
      if (!val.fileName || !val.filePath) {
        await this.fileSaveAs(val);
        return;
      }

      const writeFileResult = await this.writeFile({
        filePath: val.filePath,
        fileContent: val.fileContent,
      });

      if (writeFileResult.result) {
        await this.fileOpenWithOutDialog(BrowserWindow.getFocusedWindow(), {
          filePath: writeFileResult.filePath,
          fileContent: writeFileResult.fileContent,
          fileName: writeFileResult.fileName,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* file save as */
  fileSaveAs = async (val) => {
    try {
      const { filePath } = await dialog.showSaveDialog(dialogOptions.save);
      const writeFileResult = await this.writeFile({
        filePath,
        fileContent: val,
      });

      if (writeFileResult.result) {
        await this.fileOpenWithOutDialog(BrowserWindow.getFocusedWindow(), {
          filePath: writeFileResult.filePath,
          fileContent: writeFileResult.fileContent,
          fileName: writeFileResult.fileName,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* write file */
  writeFile = async ({ filePath, fileContent }) => {
    try {
      /* invalid path */
      if (!filePath) {
        return;
      }

      const fileName = path.basename(filePath);
      const ext = path.extname(filePath);

      if (ext === '.html' || ext === '.mthml') {
        fileContent = fileContent.html;
      } else {
        fileContent = fileContent.txt;
      }

      if(fileContent === undefined){
        fileContent = '';
      }

      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error('error is occured! :', err);
        }
      });

      return { result: true, filePath, fileContent, fileName };
    } catch (e) {
      console.error(e);
    }
    return { result: false };
  };
}

module.exports = new ElectronFunctions();
