// const { api_endpoints } = require('../config/app_config.json');

// Add here your keycloak setup infos
const keycloakConfig: any = {
	'realm': 'development',
	'clientId': 'smartcity-web',
	// 'url': https://microservices-auth.mybluemix.net/auth',
	'url': 'https://auth.smartthings.com/auth',
	'ssl-required': 'external',
	'resource': 'smartcity-web',
	'public-client': true,
	'verify-token-audience': true,
	'use-resource-role-mappings': true,
	'enable-cors': true
}

export const environment = {
	production: true,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	keycloakConfig,
	ACCOUNTS_API_URL: 'https://accounts.smartthings.com',
	IOT_API_URL: 'https://iot.smartthings.com',
	cognos_api_js: 'https://us-south.dynamic-dashboard-embedded.cloud.ibm.com/daas/CognosApi.js',
	cognos_root_url: 'https://us-south.dynamic-dashboard-embedded.cloud.ibm.com/daas',
	cognos_web_domain: 'https://www.smartthings.com'
};
