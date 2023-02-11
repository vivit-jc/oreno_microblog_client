const { app, BrowserWindow } = require('electron');
const stateKeeper = require('electron-window-state');

const createWindow = () => {
  let windowState = stateKeeper({
    defaultWidth: 800,
    defaultHeight: 640,
  });
  const win = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  });
  win.loadFile('index.html');
  windowState.manage(win);
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});