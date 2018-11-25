//
// https://www.christianengvall.se/electron-windows-installer/
// https://github.com/electron-userland/electron-installer-windows
//

var electronInstaller = require('electron-winstaller');

result = electronInstaller.createWindowsInstaller({
  appDirectory: 'build/Electronis-win32-x64',
  setupExe: 'ElectronisInstaller.exe',
  setupIcon: 'resources/appicon.ico',
  title: 'Electronis Installer',
  loadingGif: 'resources/loading.gif',
  outputDirectory: 'dist',
  authors: 'Aris Ripandi',
  exe: 'electronis.exe'
});

result.then(
  () => {
    console.log('The installers of your application were succwesfully created!');
  },
  e => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`);
  }
);
