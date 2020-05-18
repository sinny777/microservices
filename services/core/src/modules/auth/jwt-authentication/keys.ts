import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
// The User model is imported from the application,
// which makes the component not entirely independent
// import {User} from '../../models/user.model';
// import {Credentials} from './services/user.service';

export namespace TokenServiceBindings {
    export const KEYCLOAK_URL = BindingKey.create<string | undefined>(
        'keycloak.url',
    );

    export const KEYCLOAK_REALM = BindingKey.create<string | undefined>(
        'keycloak.realm',
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

// export namespace UserServiceBindings {
//   export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
//     'services.user.service',
//   );
// }