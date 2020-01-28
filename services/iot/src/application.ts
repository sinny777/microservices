import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import * as dotenv from "dotenv";
import {MySequence} from './sequence';

import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
  AuthenticationBindings,
} from '@loopback/authentication';
// import {JWTAuthenticationStrategy} from './modules/auth/authentication/jwt-strategy';
import {CommonService, JWTService} from 'microservices-core/dist/services';
import {JWTAuthenticationStrategy} from 'microservices-core/dist/modules/auth';
import { AuthUser } from 'microservices-core/dist/models';
import {
  TokenServiceBindings, CommonServiceBindings
} from 'microservices-core/dist/keys'; 

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');


export class IotApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    dotenv.config();
    let env_path = process.env.NODE_ENV;
    if(env_path){
      dotenv.config({ path: env_path });
    } 
    /*
       This is a workaround until an extension point is introduced
       allowing extensions to contribute to the OpenAPI specification
       dynamically.
    */
   this.api({
      openapi: '3.0.0',
      info: {title: pkg.name, version: pkg.version},
      paths: {},
      // components: {securitySchemes: SECURITY_SCHEME_SPEC},
      servers: [{url: '/'}],
    });

    this.setUpBindings();    
    // Set up the custom sequence
    this.sequence(MySequence);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    // this.basePath('/api/accounts/');
    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    // registerAuthenticationStrategy(this, BasicAuthenticationStrategy);
    // this.component(AuthorizationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers', 'modules'],
        extensions: ['.controller.js'],
        nested: true,
      },
      repositories: {
        dirs: ['repositories'],
        extensions: ['.repository.js'],
        nested: true,
      }
    };
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.KEYS_PATH).to(
      process.env.ACCOUNTS_KEYS_PATH
    );

    this.bind(TokenServiceBindings.TOKEN_ISSUER).to(
      process.env.TOKEN_ISSUER
    );
    this.bind(TokenServiceBindings.TOKEN_AUDIENCE).to(
      process.env.TOKEN_AUDIENCE
    );
    this.bind(TokenServiceBindings.TOKEN_ALGORITHM).to(
      process.env.TOKEN_ALGORITHM
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      process.env.TOKEN_EXPIRES_IN
    );
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    // // Bind bcrypt hash services
    this.bind(CommonServiceBindings.COMMON_SERVICE).toClass(CommonService);    
    // this.bind(SecurityBindings.USER).toClass(AuthUser);
    this.bind(AuthenticationBindings.CURRENT_USER).toClass(AuthUser);
    // this.bind(AuthenticationBindings.CURRENT_USER).toClass(Setter<UserProfile>);
  }

}
