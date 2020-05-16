import { LayoutConfigService } from '../core/_base/layout';
import { KeycloakService } from 'keycloak-angular';
import { LayoutConfig } from '../core/_config/main/layout.config';
import { environment } from '../../environments/environment';

export function initializer(appConfig: LayoutConfigService, keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloakConfig } = environment;
      try {
        if (appConfig.getConfig() === null) {
          await appConfig.loadConfigs(new LayoutConfig().configs);
        }
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: ['/assets', '/clients/public']
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
