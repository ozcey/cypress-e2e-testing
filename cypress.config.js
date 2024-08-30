const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      require('./cypress/plugins/index.js')(on, config)
      return config;
    },
    baseUrl: 'http://localhost:4200',
    // baseUrl: 'https://uss-devite01.dev.cloudpak.security.ibm.com',
    video: false,
    env: {
      snapshotOnly: true,
      hideCredentials: true,
      grepOmitFiltered: true
    }
  },
})
