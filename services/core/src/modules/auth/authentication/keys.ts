
import {BindingKey} from '@loopback/context';
import {MetadataAccessor} from '@loopback/metadata';
import {Strategy} from 'passport';

import {
  AuthenticateFn,
  AuthenticationMetadata,
  IAuthClient,
  IAuthUser,
} from './types';
import { TokenService } from '@loopback/authentication';

export * from './strategies/keys';

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

/**
 * Binding keys used by this component.
 */
export namespace AuthenticationBindings {
  export const USER_STRATEGY = BindingKey.create<Strategy | undefined>(
    'sf.userAuthentication.strategy',
  );

  export const CLIENT_STRATEGY = BindingKey.create<Strategy | undefined>(
    'sf.clientAuthentication.strategy',
  );

  export const USER_AUTH_ACTION = BindingKey.create<
    AuthenticateFn<IAuthUser | undefined>
  >('sf.userAuthentication.actions.authenticate');

  export const CLIENT_AUTH_ACTION = BindingKey.create<
    AuthenticateFn<IAuthClient | undefined>
  >('sf.clientAuthentication.actions.authenticate');

  export const USER_METADATA = BindingKey.create<
    AuthenticationMetadata | undefined
  >('sf.userAuthentication.operationMetadata');

  export const CLIENT_METADATA = BindingKey.create<
    AuthenticationMetadata | undefined
  >('sf.clientAuthentication.operationMetadata');

  export const CURRENT_USER = BindingKey.create<IAuthUser | undefined>(
    'sf.userAuthentication.currentUser',
  );

  export const CURRENT_CLIENT = BindingKey.create<IAuthClient | undefined>(
    'sf.clientAuthentication.currentClient',
  );
}

export const USER_AUTHENTICATION_METADATA_KEY = MetadataAccessor.create<
  AuthenticationMetadata,
  MethodDecorator
>('userAuthentication.operationsMetadata');

export const CLIENT_AUTHENTICATION_METADATA_KEY = MetadataAccessor.create<
  AuthenticationMetadata,
  MethodDecorator
>('clientAuthentication.operationsMetadata');