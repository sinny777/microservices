
// Add here your keycloak setup infos
const keycloakConfig: any = {
	'realm': 'development',
	'clientId': 'smartcity-web',
	// 'url': 'https://gae-keycloak-service-dot-hukam-157906.an.r.appspot.com/auth',
	'url': 'https://microservices-auth.mybluemix.net/auth',
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
	IOT_BASE_URL: 'https://iot.smartthings.com',
	keycloakConfig
};
