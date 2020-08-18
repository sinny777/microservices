// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const { api_endpoints } = require('../config/app_config.json');
// var app_config = require('../config/app_config.json');

// Add here your keycloak setup infos
const keycloakConfig: any = {
	'realm': 'ibm',
	'clientId': 'smartcity-web',
	'url': 'https://auth.smartthings.com/auth',
	// 'url': 'https://microservices-auth.mybluemix.net/auth',
	'ssl-required': 'external',
	'resource': 'smartcity-web',
	'public-client': true,
	'verify-token-audience': true,
	'use-resource-role-mappings': true,
	'enable-cors': true
}

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	keycloakConfig,
	ACCOUNTS_API_URL: 'https://accounts.smartthings.com',
	IOT_API_URL: 'https://iot.smartthings.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
