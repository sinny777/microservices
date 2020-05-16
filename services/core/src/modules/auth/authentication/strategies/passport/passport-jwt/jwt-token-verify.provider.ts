
import {Provider, inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';

import {VerifyFunction} from '../../types';
// import { IAuthUser } from '../../..';
import {UserProfile} from '@loopback/security';
import { TokenServiceBindings } from '../../../keys';
import { TokenService } from '@loopback/authentication';
// import * as PassportJwt from 'passport-jwt';

/**
 * A provider for default implementation of VerifyFunction.JwtFn
 *
 * It will just throw an error saying Not Implemented
 */
export class JwtTokenVerifyProvider
  implements Provider<VerifyFunction.JwtFn> {
  constructor(@inject(TokenServiceBindings.TOKEN_SERVICE) public tokenService: TokenService) {}

  value(): VerifyFunction.JwtFn {
    return async token => {
      console.log(token);
      const userProfile: UserProfile = await this.tokenService.verifyToken(token);
      // let user: IAuthUser = {username: userProfile.email};
      return null;
      // throw new HttpErrors.NotImplemented(
      //   `VerifyFunction.JwtFn is not implemented`,
      // );
    };
  }
}