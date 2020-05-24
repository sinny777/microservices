
import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
	url: 'https://auth.smartthings.com/auth/',
	realm: 'development',
	clientId: 'smartcity-web'
	// credentials: {'secret': 'a3e5e4b1-7fe7-45c3-aea3-4794fa25e18d'},
	// "auth-server-url": "https://auth.smartthings.com/auth/",
	// "ssl-required": "external",
	// "resource": "smartcity-web",
	// "public-client": true,
	// "verify-token-audience": true,
	// "use-resource-role-mappings": true,
	// "confidential-port": 0
};

export const environment = {
production: true,
hmr: false,
API_BASE_URL: 'https://iot.smartthings.com/api',
isMockEnabled: false, // You have to switch this, when your real back-end is done
keycloakConfig: keycloakConfig,
authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
GOOGLE_MAPS_KEY: 'AIzaSyA_xN3mG2LL27jctSXHC4eiroRvOI454SE'
};
