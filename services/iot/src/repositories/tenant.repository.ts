import { Tenant, TenantRelations } from '@sinny777/microservices-core';
import { TenantsDataSource } from '../datasources';
import { DefaultUserModifyCrudRepository } from './default-user-modify-crud.repository.base';
import { AuthenticationBindings } from '@loopback/authentication';

import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';

export class TenantRepository extends DefaultUserModifyCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
> {

  constructor(
    @inject('datasources.tenants') dataSource: TenantsDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,   
  ) {
    super(Tenant, dataSource, getCurrentUser);
   
  }
}
