// Adonis server
server = require('./src/server');

// Modules to control application life
// and create native browser window.
const path = require('path');

const electron = require('electron');

const os = require('os');
var apiProcess = null;

const {
  app,
  dialog,
  BrowserWindow,
  Menu,
  globalShortcut
} = electron;

let mainWindow;

let appName = app.getName();
let appVersion = app.getVersion();
let icon = 'resources/appicon.png';

//  run server
function startApi() {
  var proc = require('child_process').spawn;
  var apipath = path.join(__dirname, '.\\server\\bin\\mysqld.exe')
  if (os.platform() === 'darwin') {
    apipath = path.join(__dirname, '..//api//bin//dist//osx//Api')
  }

  apiProcess = proc(apipath)
  apiProcess.stdout.on('data', (data) => {
    writeLog(`stdout: ${data}`);
    if (mainWindow == null) {
      createWindow();
    }
  });
}

//Kill process when electron exits
process.on('exit', function () {
  writeLog('exit');
  apiProcess.kill();
});

function writeLog(msg){
  console.log(msg);
}

function createWindow() {

  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: width * 0.6,
    height: height * 0.8,
    icon: path.join(__dirname, 'resources/appicon.png'),
    frame: true
  })

  // and load the the application.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://127.0.0.1:3301/');

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
