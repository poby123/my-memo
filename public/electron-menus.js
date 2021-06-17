const { app, Menu } = require('electron');

const electronMenu = (win) => {
  return [
    /* File */
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'CmdOrCtrl+N', click() {} },
        { label: 'Open File', accelerator: 'CmdOrCtrl+O' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S' },
        { label: 'Save as', accelerator: 'CmdOrCtrl+S' },
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
            win.webContents.send('strikeThrough');
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
