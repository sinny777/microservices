import {BindingKey} from '@loopback/context';
import {TokenService, UserService} from '@loopback/authentication';
import { securityId, UserProfile } from '@loopback/security';
import { User } from '.';
import {CommonService} from './services/common.service';
// import {User} from 'smartthings-common';
// import { Credentials } from 'smartthings-common/dist/models/types';
// import { PasswordHasher } from '../services/password-util.service';

export namespace CommonConstants {
  export const SECURITY_ID = securityId;  
}

export interface CommonServiceI {
  convertToUserProfile(user: User): UserProfile;  
}

export namespace CommonServiceBindings {
  export const COMMON_SERVICE = BindingKey.create<CommonService | undefined>(
    'common.service',
  );
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string | undefined>(
    'authentication.jwt.secret',
  );

  export const TOKEN_ISSUER = BindingKey.create<string | undefined>(
    'authentication.jwt.issuer',
  );

  export const TOKEN_AUDIENCE = BindingKey.create<string | undefined>(
    'authentication.jwt.audience',
  );

  export const TOKEN_ALGORITHM = BindingKey.create<string | undefined>(
    'authentication.jwt.algorithm',
  );

  export const TOKEN_EXPIRES_IN = BindingKey.create<string | undefined>(
    'authentication.jwt.expires.in',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );

  export const KEYS_PATH = BindingKey.create<string | undefined>(
    'jwt.keys.path',
  );

}

/*
export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
}
*/