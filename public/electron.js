const { app, BrowserWindow } = require('electron')
const path = require('path');

app.whenReady().then(() => {
  let win = new BrowserWindow({
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      preload: `${__dirname}/preload.js`
    }
  })
  console.log('env : ', process.env.mode)
  if (process.env.mode === 'dev') {
    win.loadURL('http://localhost:3000') 
    win.webContents.openDevTools()
  } else {
    // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
    win.loadFile(`${path.join(__dirname, '../build/index.html')}`)
  }

  win.once('ready-to-show', () => win.show());
  win.on('closed', () => {
    win = null;
  });
})

app.on('window-all-closed', () => {
  app.quit()
})