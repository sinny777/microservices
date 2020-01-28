import {DefaultCrudRepository} from '@loopback/repository';
import {UserRole, UserRoleRelations} from 'microservices-core';
import {UsersDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id,
  UserRoleRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(UserRole, dataSource);
  }
}
