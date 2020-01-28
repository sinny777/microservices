import {DataObject, Getter, Where, Count, DefaultCrudRepository} from '@loopback/repository';
import {UserModifiableEntity} from 'microservices-core';
// import {UsersDataSource} from '../datasources';
import {juggler} from '@loopback/repository';
import { Options } from 'loopback-datasource-juggler';
import {HttpErrors} from '@loopback/rest';
import {AuthorizeErrorKeys} from '../modules/auth/authorization';
// import { MyUserProfile } from '../modules/auth/authentication/types';
import { UserProfile } from '@loopback/security';

export abstract class DefaultUserModifyCrudRepository<
  T extends UserModifiableEntity,
  ID,
  Relations extends object = {}
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof UserModifiableEntity & {
      prototype: T;
    },
    dataSource: juggler.DataSource,
    protected readonly getCurrentUser: Getter<UserProfile | undefined>
  ) {
    super(entityClass, dataSource);
  }

  async createWOAuth(entity: DataObject<T>, options?: Options): Promise<T> {
    return super.create(entity, options);
  }

  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    entity.createdBy = currentUser.id;
    entity.modifiedBy = currentUser.id;    
    return super.create(entity, options);
  }

  async createAll(entities: DataObject<T>[], options?: Options): Promise<T[]> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    entities.forEach(entity => {
      entity.createdBy = currentUser ? currentUser.id : 0;
      entity.modifiedBy = currentUser ? currentUser.id : 0;
    });
    return super.createAll(entities, options);
  }

  async save(entity: T, options?: Options): Promise<T> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    entity.modifiedBy = currentUser.id;
    return super.save(entity, options);
  }

  async update(entity: T, options?: Options): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    entity.modifiedBy = currentUser.id;
    return super.update(entity, options);
  }

  async updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    data.modifiedBy = currentUser.id;
    return super.updateAll(data, where, options);
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    data.modifiedBy = currentUser.id;
    return super.updateById(id, data, options);
  }
  async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthorizeErrorKeys.InvalidCredentials);
    }
    data.modifiedBy = currentUser.id;
    return super.replaceById(id, data, options);
  }

}
