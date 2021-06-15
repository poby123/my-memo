const { app, Menu } = require('electron');

module.exports = Menu.buildFromTemplate([
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
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
      },
      {
        type: 'separator',
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
      },
      {
        label: 'Delete',
        accelerator: 'Delete',
      },
    ],
  },

  /* Development */
//   {
//     label: 'Development',
//     submenu: [
//       {
//         label: 'Reload',
//         accelerator: 'CmdOrCtrl+R',
//         click() {
//           app.relaunch();
//         },
//       },
//     ],
//   },
]);
