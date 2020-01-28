import {HasOneRepositoryFactory, repository, DataObject, Options} from '@loopback/repository';
import {User, UserRelations, UserCredentials} from 'microservices-core';
import {UsersDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
import {UserCredentialsRepository} from './user-credentials.repository';
import { AuthenticationBindings } from '@loopback/authentication';
// import { MyUserProfile } from '../modules/auth/authentication/types';
import { HttpErrors } from '@loopback/rest';
import * as bcrypt from 'bcrypt';
import { AuthorizeErrorKeys } from '../modules/auth/authorization';
import { AuthenticateErrorKeys } from '../modules/auth/error-keys';
import { UserProfile } from '@loopback/security';

export class UserRepository extends DefaultUserModifyCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;
  constructor (
    @inject('datasources.users') dataSource: UsersDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,
    @repository.getter('UserCredentialsRepository')
    getUserCredsRepository: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource, getCurrentUser);
    this.credentials = this.createHasOneRepositoryFactoryFor(
      'credentials',
      getUserCredsRepository
    );
  }

  private readonly saltRounds = 10;

  async create(entity: DataObject<User>, options?: Options): Promise<User> {
    // console.log('IN UserRepository.create method: >>>> ', entity);
    const user = await super.create(entity, options);
    try {
      // Add temporary password for first time
      const password = await bcrypt.hash(
        process.env.USER_TEMP_PASSWORD,
        this.saltRounds,
      );
      const creds = new UserCredentials({
        authProvider: 'internal',
        password: password,
      });
      await this.credentials(user.id).create(creds);
    } catch (err) {
      console.error(err);
      throw new HttpErrors.UnprocessableEntity('Error while hashing password');
    }
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<User> {
    const user = await super.findOne({where: {username}});
    const creds = user && (await this.credentials(user.id).get());
    if (!user || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (!(await bcrypt.compare(password, creds.password))) {
      throw new HttpErrors.Unauthorized(AuthorizeErrorKeys.InvalidCredentials);
    } else if (
      await bcrypt.compare(password, process.env.USER_TEMP_PASSWORD!)
    ) {
      throw new HttpErrors.Forbidden(
        AuthenticateErrorKeys.TempPasswordLoginDisallowed,
      );
    }
    return user;
  }

  async updatePassword(
    username: string,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const user = await super.findOne({where: {username}});
    const creds = user && (await this.credentials(user.id).get());
    if (!user || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (!(await bcrypt.compare(password, creds.password))) {
      throw new HttpErrors.Unauthorized(AuthorizeErrorKeys.WrongPassword);
    } else if (await bcrypt.compare(newPassword, creds.password)) {
      throw new HttpErrors.Unauthorized(
        'Password cannot be same as previous password!',
      );
    }
    await this.credentials(user.id).patch({
      password: await bcrypt.hash(newPassword, this.saltRounds),
    });
    return user;
  }
  
}
