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
  ],
  win: {
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
    target: ['dmg'],
    category: 'public.app-category.utilities',
  },
  linux: {
    target: ['AppImage', 'deb'],
    category: 'Utility',
  },
};
