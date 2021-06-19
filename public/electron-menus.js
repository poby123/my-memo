const { app } = require('electron');
const channelList = require('../src/channelList');

const electronMenu = (win) => {
  const sendToReact = (channelName) => {
    win.webContents.send(channelName);
  };

  return [
    /* File */
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'CmdOrCtrl+N', click() {} },
        { label: 'Open File', accelerator: 'CmdOrCtrl+O' },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+S',
          click() {
            sendToReact(channelList.request.saveAs);
          },
        },
        {
          label: 'Save',
          click() {
            
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
