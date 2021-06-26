const { BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const dialogOptions = require('./electron-dialog-options');
const channelList = require('../src/common/channelList');
const logColorTable = require('../src/common/logColorTable');

class ElectronFunctions {
  /* send to React */
  sendToReact = (channelName, val) => {
    BrowserWindow.getFocusedWindow().webContents.send(channelName, val);
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
      win.loadFile(`${path.join(__dirname, '../build/index.html')}`);
    }

    const menus = require('./electron-menus')(win);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

    win.once('ready-to-show', () => win.show());
    win.on('closed', () => {
      win = null;
    });

    // console.log('args : ', process.argv);
    // const filePath = process.argv[1];
    // if (filePath !== '.') {
    //   functions.fileOpenWithOutDialog({ filePath });
    // }
  };

  /**
   * File open with dialog
   */
  fileOpenWithDialog = async () => {
    try {
      const { filePaths } = await dialog.showOpenDialog(dialogOptions.open);

      if (filePaths.length <= 0) {
        return;
      }

      this.fileOpenWithOutDialog({ filePath: filePaths[0] });
    } catch (e) {
      console.error(`${logColorTable.FgRed}%s`, e);
      this.sendToReact(channelList.request.error, 'Could not open file due to : ', e);
    }
  };

  /**
   * File open without dialog
   * @param {string} filePath - file path for reading file
   */
  fileOpenWithOutDialog = ({ filePath }) => {
    if (!filePath) {
      this.sendToReact(channelList.request.error, 'Could not open file due to missing file path.');
      return;
    }

    fs.readFile(filePath, 'utf-8', (err, fileContent) => {
      if (err) {
        this.sendToReact(channelList.request.error, `Could not open file due to : ${err}`);
      }

      const fileName = path.basename(filePath);
      this.sendToReact(channelList.request.sendFileContent, {
        fileContent,
        fileName,
        filePath,
      });
    });
  };

  /**
   * @param {Object} val
   * @param {string | undefined} val.fileName - file name
   * @param {string | undefined} val.filePath - file path
   *
   * @param {Object} val.fileContent - file content to be saved
   * @param {string} val.fileContent.html - file content html version
   * @param {string} val.fileContent.txt - file content text version
   */
  fileSave = async (val) => {
    try {
      if (!val.fileName || !val.filePath) {
        await this.fileSaveAs(val);
        return;
      }

      const writeFileResult = this.writeFile(val);

      if (writeFileResult.result === false) {
        throw 'write file is failed.';
      }

      this.fileOpenWithOutDialog(writeFileResult);
    } catch (e) {
      console.error(`${logColorTable.FgRed}%s`, e);
      this.sendToReact(channelList.request.error, e);
    }
  };

  /**
   * file save as
   * @param {Object} fileContent - File content to be saved
   * @param {string} fileContent.html - html version content
   * @param {string} fileContent.txt - text version content
   */
  fileSaveAs = async ({ fileContent }) => {
    try {
      const { filePath } = await dialog.showSaveDialog(dialogOptions.save);
      const writeFileResult = this.writeFile({ filePath, fileContent });

      if (writeFileResult.result === false) {
        throw 'write file is failed.';
      }

      this.fileOpenWithOutDialog(writeFileResult);
    } catch (e) {
      console.error(`${logColorTable.FgRed}%s`, e);
      this.sendToReact(channelList.request.error, e);
    }
  };

  /**
   * Write file
   * @param {filePath : string} filePath
   * @param {fileContent : string} fileContent
   * @returns {{result: boolean, filePath:undefined | string, targetData:undefined | string, fileName:undefined | string }}
   */
  writeFile = ({ filePath, fileContent }) => {
    try {
      if (!filePath) {
        return { result: false };
      }

      const fileName = path.basename(filePath);
      const ext = path.extname(filePath);
      let targetData = '';

      if (ext === '.html' || ext === '.mthml') {
        targetData = fileContent.html || '';
      } else {
        targetData = fileContent.txt || '';
      }

      // it is must be synchronized. if not read file error is occured due to not existing file.
      fs.writeFileSync(filePath, targetData);

      return { result: true, filePath, targetData, fileName };
    } catch (e) {
      console.error(`${logColorTable.FgRed}%s`, e);
    }
    return { result: false };
  };
}

module.exports = new ElectronFunctions();
