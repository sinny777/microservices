import {inject, Provider} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import * as PassportJwt from 'passport-jwt';
// import {Strategy, ExtractJwt} from 'passport-jwt';

import {AuthErrorKeys} from '../../../error-keys';
import {IAuthUser} from '../../../types';
import {Strategies} from '../../keys';
import {VerifyFunction} from '../../types';
import {isEmpty} from 'lodash';

export interface JwtStrategyFactory {
  (options?: PassportJwt.StrategyOptions): PassportJwt.Strategy;
}


export class JwtStrategyFactoryProvider
  implements Provider<JwtStrategyFactory> {
  constructor(
    @inject(Strategies.Passport.JWT_TOKEN_VERIFIER)
    private readonly verifierJwt: VerifyFunction.JwtFn,
  ) {}

  value(): JwtStrategyFactory {
    return options => this.getJwtStrategyVerifier(options);
  }

  getJwtStrategyVerifier(
    options?: PassportJwt.StrategyOptions,
  ): PassportJwt.Strategy {
    if (options && options.passReqToCallback) {
      return new PassportJwt.Strategy(
        options,
        async (
          req: Request,
          token: string,
          cb: (err: Error | null, user?: IAuthUser | false) => void,
        ) => {
          try {
            const user = await this.verifierJwt(token, req);
            if (!user) {
              throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenInvalid);
            }
            cb(null, user);
          } catch (err) {
            cb(err);
          }
        },
      );
    } else if (!!options && !isEmpty(options)) {
      return new PassportJwt.Strategy(
        options,
        async (
          token: string,
          cb: (err: Error | null, user?: IAuthUser | false) => void,
        ) => {
          try {
            const user = await this.verifierJwt(token);
            if (!user) {
              throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenInvalid);
            }
            cb(null, user);
          } catch (err) {
            cb(err);
          }
        },
      );
    } else {
      console.error('JWT PASSPORT OPTIONS ARE REQUIRED !!!');
      throw new HttpErrors.Unauthorized(
        AuthErrorKeys.UnknownError,
      );
      /*
      return new PassportJwt.Strategy(
        options,
        async (
          token: string,
          cb: (err: Error | null, user?: IAuthUser | false) => void,
        ) => {
          try {
            const user = await this.verifierBearer(token);
            if (!user) {
              throw new HttpErrors.Unauthorized(
                AuthErrorKeys.InvalidCredentials,
              );
            }
            cb(null, user);
          } catch (err) {
            cb(err);
          }
        },
      );  
      */    
    }
  }
}