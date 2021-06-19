const { app, ipcMain, BrowserWindow, Menu, remote, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const channelList = require('../src/channelList');
const dialogOptions = require('./electron-dialog-options');

app.whenReady().then(() => {
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
});

app.on('window-all-closed', () => {
  app.quit();
});

/* Ipc Handlers */
ipcMain.on(channelList.response.saveAs, async (event, value) => {
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
});
