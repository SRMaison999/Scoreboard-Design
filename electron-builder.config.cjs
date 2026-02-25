/**
 * Configuration electron-builder pour le packaging de l'application.
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.scoreboard-design.app',
  productName: 'Scoreboard Editor',
  directories: {
    output: 'release',
    buildResources: 'build',
  },
  files: [
    'dist/**/*',
    'electron/**/*',
    'public/icon.svg',
    'public/icon.png',
  ],
  icon: 'build/icon.png',
  win: {
    icon: 'build/icon.png',
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Scoreboard Editor',
    artifactName: 'ScoreboardEditor-Setup-${version}.${ext}',
  },
  mac: {
    icon: 'build/icon.png',
    target: ['dmg'],
    category: 'public.app-category.utilities',
  },
  linux: {
    icon: 'build/icon.png',
    target: ['AppImage', 'deb'],
    category: 'Utility',
  },
};
