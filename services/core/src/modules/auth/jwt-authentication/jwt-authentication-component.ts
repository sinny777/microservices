import { registerAuthenticationStrategy } from '@loopback/authentication';
import {
    Application,
    Binding,
    Component,
    CoreBindings,
    inject,
} from '@loopback/core';
import { JWTAuthenticationStrategy } from './services/jwt.auth.strategy';
import { JWTService } from './services/jwt.service';
import {
    TokenServiceBindings
} from './keys';
// import {MyUserService} from './services/user.service';

export class JWTAuthenticationComponent implements Component {
    bindings = [
        Binding.bind(TokenServiceBindings.KEYCLOAK_URL).to(
            process.env.KEYCLOAK_URL,
        ),
        Binding.bind(TokenServiceBindings.KEYCLOAK_REALM).to(
            process.env.KEYCLOAK_REALM,
        ),
        Binding.bind(TokenServiceBindings.KEYCLOAK_PUBLIC_KEY).to(
            process.env.KEYCLOAK_PUBLIC_KEY,
        ),
        Binding.bind(TokenServiceBindings.TOKEN_ALGORITHM).to(
            process.env.TOKEN_ALGORITHM,
        ),

        Binding.bind(TokenServiceBindings.TOKEN_ISSUER).to(
            process.env.TOKEN_ISSUER
        ),
        Binding.bind(TokenServiceBindings.TOKEN_AUDIENCE).to(
            process.env.TOKEN_AUDIENCE
        ),
        Binding.bind(TokenServiceBindings.TOKEN_ALGORITHM).to(
            process.env.TOKEN_ALGORITHM
        ),
        Binding.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
            process.env.TOKEN_EXPIRES_IN
        ),

        Binding.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService),
        // Binding.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService),
    ];
    constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
        registerAuthenticationStrategy(app, JWTAuthenticationStrategy);
    }
}