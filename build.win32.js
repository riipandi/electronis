//
// https://www.christianengvall.se/electron-windows-installer/
// https://github.com/electron-userland/electron-installer-windows
//

var electronInstaller = require('electron-winstaller');

result = electronInstaller.createWindowsInstaller({
  appDirectory: 'build/Electronis-win32-x64',
  setupExe: 'ElectronisInstaller.exe',
  setupIcon: 'assets/appicon.ico',
  title: 'Electronis Installer',
  loadingGif: 'assets/loading.gif',
  outputDirectory: 'dist',
  authors: 'Aris Ripandi',
  exe: 'electronis.exe'
});

result.then(
  () => {
    console.log('The installers of your application were succesfully created!');
  },
  e => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`);
  }
);
