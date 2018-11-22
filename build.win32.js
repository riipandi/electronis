//
// https://www.christianengvall.se/electron-windows-installer/
//

var electronInstaller = require('electron-winstaller');

result = electronInstaller.createWindowsInstaller({
  appDirectory: 'build/Electronis-win32-x64',
  outputDirectory: 'dist',
  title: 'Electronis Installer',
  loadingGif: 'loading.gif',
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
