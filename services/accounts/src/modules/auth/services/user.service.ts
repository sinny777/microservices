
import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {UserService} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
import { repository } from '@loopback/repository';
import { UserRepository } from '../../../repositories/user.repository';
import {PasswordHasher} from './password-util.service';
import {PasswordHasherBindings} from '../keys';
import {User} from 'microservices-core/dist/models';
import { Credentials } from 'microservices-core/dist/models/types';
import {CommonServiceBindings, CommonServiceI} from 'microservices-core/dist/keys';
import * as _ from 'lodash';
// import { AuthUser } from 'microservices-core';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(CommonServiceBindings.COMMON_SERVICE) public commonService: CommonServiceI,
  ) {  }

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const foundUser: User = await this.userRepository.verifyPassword(credentials.username, credentials.password);
    if (!foundUser) {
      const invalidCredentialsError = 'Invalid username or password.';
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    
    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return this.commonService.convertToUserProfile(user);   
  }
}