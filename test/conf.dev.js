const baseConfig = require( "after-work.js/dist/config/conf.js" ).config;
const httpServer = require( "after-work.js/dist/utils" ).httpServer;
const extend = require( "extend" );

delete baseConfig.multiCapabilities;

const config = extend( true, baseConfig, {
	baseUrl: "http://localhost:8000",
	chromeDriver: "../node_modules/webdriver-manager/selenium/chromedriver_2.24",
	directConnect: true,
	capabilities: {
		browserName: "chrome",
		name: "Chrome dev"
	},
	beforeLaunch() {
		return httpServer( {
			"logLevel": "info",
			"port": 8000,
			"server": {
				"baseDir": "./test/fixtures/",
				"routes": {
					"/src": "./build/dev",
					"/main": "./test/fixtures/main.html"
					}
				}
		} );
	}
} );

module.exports = {
	config: config
};
