
import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
	url: 'KEYCLOAK-INSTANCE-URL',
	realm: 'REALM-NAME',
	clientId: 'CLIENT-ID-NAME'
  };

export const environment = {
	production: true,
	hmr: false,
	API_BASE_URL: 'https://smart-things.mybluemix.net/api',
	// API_BASE_URL: 'http://localhost:3000/api',
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	keycloakConfig: keycloakConfig,
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	GOOGLE_MAPS_KEY: 'AIzaSyA_xN3mG2LL27jctSXHC4eiroRvOI454SE'
};
