import {DefaultCrudRepository} from '@loopback/repository';
import {UserCredentials, UserCredentialsRelations} from 'microservices-core';
import {UserCredentialsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(
    @inject('datasources.usercredentials') dataSource: UserCredentialsDataSource,
  ) {
    super(UserCredentials, dataSource);
  }
}
