// Adonis server
server = require('./src/server');

// Modules to control application life and create native browser window
const {
  app,
  dialog,
  BrowserWindow,
  Menu,
  globalShortcut
} = require('electron');

let mainWindow;

const appName = app.getName();
const appVersion = app.getVersion();
const icon = 'resources/appicon.png';

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 860, height: 600, frame: true });

  // and load the the application.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://127.0.0.1:3301');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  globalShortcut.register('CommandOrControl+Shift+W', () => {
    app.quit();
  });

  globalShortcut.register('F1', () => {
    showAbout();
  });
}

// Customize the menu
const template = [
  {
    label: 'File',
    submenu: [
      {
        role: 'reload'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit',
        accelerator: 'CommandOrControl+Q'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        role: 'resetzoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Full Screen',
        role: 'togglefullscreen'
      }
    ]
  },

  {
    role: 'help',
    submenu: [
      {
        label: 'Developer Tool',
        role: 'toggledevtools'
      },
      {
        label: 'Documentation'
      },
      {
        type: 'separator'
      },
      {
        label: 'About',
        click() {
          showAbout();
        }
      }
    ]
  }
];

// Display about dialog.
const showAbout = () => {
  dialog.showMessageBox({
    title: `About ${appName}`,
    message: `${appName} ${appVersion}`,
    detail: `Crafted by Aris Ripandi\nCopyright © 2018 Ruhay Creative Studio.`,
    buttons: [],
    icon
  });
};

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
