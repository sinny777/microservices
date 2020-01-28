
import {BindingKey} from '@loopback/context';
import {TokenService, UserService} from '@loopback/authentication';
import { User } from 'microservices-core/dist/models';
import { Credentials } from 'microservices-core/dist/models/types';
import { PasswordHasher } from './services/password-util.service';

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