// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8888/auth',
  realm: 'development',
  clientId: 'smartcity-web',
  credentials: {'secret': 'a3e5e4b1-7fe7-45c3-aea3-4794fa25e18d'}
};

export const environment = {
    production: false,
    hmr: true,
	API_BASE_URL: 'http://localhost:3000/api',
	// API_BASE_URL: 'https://smart-city.serveo.net/api',
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	keycloakConfig: keycloakConfig,
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	GOOGLE_MAPS_KEY: 'AIzaSyA_xN3mG2LL27jctSXHC4eiroRvOI454SE'
};
