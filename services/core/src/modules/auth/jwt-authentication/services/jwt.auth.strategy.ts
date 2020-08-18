
import {inject, Getter, Setter} from '@loopback/core';

import {AuthenticationStrategy, TokenService, AuthenticationBindings, AuthenticationMetadata} from '@loopback/authentication';
// import {inject} from '@loopback/context';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile, SecurityBindings} from '@loopback/security';
import {TokenServiceBindings, JwtAuthenticationStrategyBindings, AuthenticationStrategyOptions} from '../keys';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  @inject(JwtAuthenticationStrategyBindings.DEFAULT_OPTIONS)
  options: AuthenticationStrategyOptions;

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: TokenService,
    @inject.getter(AuthenticationBindings.METADATA)
    readonly getMetaData: Getter<AuthenticationMetadata>,
    // @inject.setter(AuthenticationBindings.CURRENT_USER) readonly setCurrentUser: Setter<UserProfile>,
    @inject.setter(SecurityBindings.USER) readonly setCurrentUser: Setter<UserProfile>,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = this.extractCredentials(request);
    const userProfile: UserProfile = await this.tokenService.verifyToken(token);
    this.setCurrentUser(userProfile);
    return userProfile;
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    // for example : Bearer xxx.yyy.zzz
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }

    //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
    const token = parts[1];

    return token;
  }

  async processOptions() {
    /**
        Obtain the options object specified in the @authenticate decorator
        of a controller method associated with the current request.
        The AuthenticationMetadata interface contains : strategy:string, options?:object
        We want the options property.
    */
    const controllerMethodAuthenticationMetadata = await this.getMetaData();

    if (!this.options) this.options = {}; //if no default options were bound, assign empty options object

    //override default options with request-level options
    this.options = Object.assign(
      {},
      this.options,
      controllerMethodAuthenticationMetadata.options,
    );
  }

  // modifySpec(spec: OpenApiSpec): OpenApiSpec {
  //   return mergeSecuritySchemeToSpec(spec, this.name, {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //   });
  // }

}