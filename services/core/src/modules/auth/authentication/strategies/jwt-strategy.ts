
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {AuthenticationStrategy, TokenService} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import {TokenServiceBindings} from '../../../../keys';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE) public tokenService: TokenService
   ) {}

   name = 'jwt';
//    name1 = this.getStrategy

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = this.extractCredentials(request);
    // console.log("REFERER1: >>>>> ", request.headers.referer);
    // console.log("REFERER2: >>>>> ", request.get('Referrer'));
    // console.log("Request, OriginalUrl: >>>>> ", request.originalUrl);
    console.log("Request, path: >>>>> ", request.path);
    console.log("Request, hostname: >>>>> ", request.hostname);
    
    const userProfile: UserProfile = await this.tokenService.verifyToken(token);
    console.log('In JWTAuthenticationStrategy.authenticate >>>>>>>>> ', userProfile[securityId]);
    // this.setCurrentUser(userProfile);
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
}