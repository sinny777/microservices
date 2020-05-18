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
  UserServiceBindings
} from './modules/auth/keys';

import {MyUserService, PasswordUtil} from './modules/auth';
import {
  registerAuthenticationStrategy,
  AuthenticationBindings,
} from '@loopback/authentication';


import {AuthenticationComponent, Strategies} from 'microservices-core/dist/modules/auth';
import {
  BearerTokenVerifyProvider,
  ClientPasswordVerifyProvider,
  GoogleOauth2VerifyProvider,
  LocalPasswordVerifyProvider,
  ResourceOwnerVerifyProvider,
} from './modules/auth';
// import {
//   AuthorizationBindings,
//   AuthorizationComponent,
// } from 'microservices-core/dist/modules/auth';

import {PasswordHasherBindings} from './modules/auth/keys';
// import {JWTAuthenticationStrategy} from './modules/auth/authentication/jwt-strategy';
import {CommonService, JWTService} from 'microservices-core/dist/services';
// import {JWTAuthenticationStrategy} from 'microservices-core/dist/modules/auth/authentication/strategies';
// import { AuthUser } from 'microservices-core/dist/models';
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

export class AccountsApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    dotenv.config();
    let env_path = process.env.NODE_ENV;
    if(env_path){
      dotenv.config({ path: env_path });
    }   
    
    console.log('*********************** ENVIRONMENT *************************');
    console.log(process.env.NODE_ENV);
    console.log(process.env.ACCOUNTS_KEYS_PATH);

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

    /*
    this.bind('datasources.config.accounts').to({
      name: 'smartthings-accounts',
      connector: process.env.DB_CONNECTOR,
      hostname: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    this.bind('datasources.accounts').toClass(AccountsDataSource);
    */

    // this.basePath('/api/accounts/');
    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.component(AuthenticationComponent);
    // Customize authentication verify handlers
    this.bind(Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER).toProvider(
      ClientPasswordVerifyProvider,
    );
    this.bind(Strategies.Passport.LOCAL_PASSWORD_VERIFIER).toProvider(
      LocalPasswordVerifyProvider,
    );
    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerTokenVerifyProvider,
    );
    this.bind(Strategies.Passport.RESOURCE_OWNER_PASSWORD_VERIFIER).toProvider(
      ResourceOwnerVerifyProvider,
    );
    this.bind(Strategies.Passport.GOOGLE_OAUTH2_VERIFIER).toProvider(
      GoogleOauth2VerifyProvider,
    );
    // registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
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
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(PasswordUtil);

    this.bind(CommonServiceBindings.COMMON_SERVICE).toClass(CommonService);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);

    // this.bind(SecurityBindings.USER).toClass(AuthUser);
    // this.bind(AuthenticationBindings.CURRENT_USER).toClass(AuthUser);

    // this.bind(AuthenticationBindings.CURRENT_USER).toClass(Setter<UserProfile>);
  }

}
