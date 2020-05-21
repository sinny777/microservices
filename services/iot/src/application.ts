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

// import { JWTAuthenticationComponent } from './components/jwt-authentication/jwt-authentication-component';
// import { JWTAuthenticationComponent } from 'microservices-core/dist/modules/auth/jwt-authentication';
import { JWTAuthenticationComponent } from '@sinny777/microservices-core';
import {
  AuthenticationComponent,
} from '@loopback/authentication';

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

    // this.setUpBindings();    
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
    this.component(JWTAuthenticationComponent);
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


}
