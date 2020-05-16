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
    TokenServiceBindings,
    TokenServiceConstants
} from './keys';
// import {MyUserService} from './services/user.service';

export class JWTAuthenticationComponent implements Component {
    bindings = [
        Binding.bind(TokenServiceBindings.KEYS_PATH).to(
            process.env.ACCOUNTS_KEYS_PATH,
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