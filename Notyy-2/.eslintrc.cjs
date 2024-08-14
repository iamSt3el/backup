module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier'
  ],
  makers: [
    {
      name: '@electron-forge/maker-deb',
        config: {
          options: {
            icon: '/home/steel/projects/electron-projects/Notyy-2/resources/icon.png'
          }
      }
    }
  ]
}
