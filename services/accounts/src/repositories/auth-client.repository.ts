import {DefaultCrudRepository} from '@loopback/repository';
import {AuthClientsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { AuthClient } from 'microservices-core/dist/models';

export class AuthClientRepository extends DefaultCrudRepository<
  AuthClient,
  typeof AuthClient.prototype.id
> {
  constructor(
    @inject('datasources.authclients') dataSource: AuthClientsDataSource,
  ) {
    super(AuthClient, dataSource);
  }
}
