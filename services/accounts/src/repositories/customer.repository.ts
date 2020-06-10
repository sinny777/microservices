import { Customer, CustomerRelations } from '@sinny777/microservices-core/dist/modules/common/models/customer.model';
import { CustomersDataSource } from '../datasources';
import { DefaultUserModifyCrudRepository } from '@sinny777/microservices-core/dist/modules/common/repositories';
import { AuthenticationBindings } from '@loopback/authentication';

import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';

export class CustomerRepository extends DefaultUserModifyCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  constructor(
    @inject('datasources.customers') dataSource: CustomersDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,   
  ) {
    super(Customer, dataSource, getCurrentUser);
   
  }
}
