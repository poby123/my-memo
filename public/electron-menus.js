const { app } = require('electron');
const channelList = require('../src/channelList');
const functions = require('./electron-functions');

const electronMenu = (win) => {
  const sendToReact = (channelName, val) => {
    win.webContents.send(channelName, val);
  };

  return [
    /* File */
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdOrCtrl+N',
          click() {
            functions.newWindow();
          },
        },
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          async click() {
            await functions.fileOpenWithDialog();
          },
        },
        {
          label: 'Save As',
          click() {
            sendToReact(channelList.request.saveAs);
          },
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click() {
            sendToReact(channelList.request.save);
          },
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+X',
          click() {
            app.quit();
          },
        },
      ],
    },

    /* Edit */
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        {
          label: '',
          accelerator: 'CmdOrCtrl+Shift+S',
          visible: false,
          click() {
            sendToReact(channelList.request.strikeThrough);
          },
        },
      ],
    },

    /* Development */
    {
      label: 'Developement',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];
};

module.exports = electronMenu;
