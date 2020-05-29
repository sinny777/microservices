
// Add here your keycloak setup infos
const keycloakConfig: any = {
  'realm': 'development',
  'clientId': 'smartcity-web',
  'auth-server-url': 'https://auth.smartthings.com/auth/',
  'ssl-required': 'external',
  'resource': 'smartcity-web',
  'public-client': true,
  'verify-token-audience': true,
  'use-resource-role-mappings': true,
  'confidential-port': 0
}

export const environment = {
	production: true,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  keycloakConfig
};
