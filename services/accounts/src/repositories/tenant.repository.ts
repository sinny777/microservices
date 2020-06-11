// import { Customer, Tenant, TenantRelations  } from '../models';
import {Customer, Tenant, TenantRelations  } from '@sinny777/microservices-core';

import { TenantsDataSource } from '../datasources';
import { DefaultUserModifyCrudRepository } from './default-user-modify-crud.repository.base';
import { AuthenticationBindings } from '@loopback/authentication';

import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';
import { HasManyRepositoryFactory, repository } from '@loopback/repository';
import { CustomerRepository } from '.';

export class TenantRepository extends DefaultUserModifyCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
> {

  public readonly customers: HasManyRepositoryFactory<
    Customer,
    typeof Tenant.prototype.id
  >;

  constructor(
    @inject('datasources.tenants') dataSource: TenantsDataSource,
    @repository.getter('CustomerRepository')
    getCustomerRepository: Getter<CustomerRepository>,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,   
  ) {
    super(Tenant, dataSource, getCurrentUser);
    this.customers = this.createHasManyRepositoryFactoryFor(
      'customers',
      getCustomerRepository,
    );

    // add this line to register inclusion resolver
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);

  }
}
