import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {Role, RoleRelations, Tenant} from 'microservices-core';
import {UsersDataSource} from '../datasources';
import {inject, Getter} from '@loopback/context';
import {TenantRepository} from '../repositories';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations> 
{
    public readonly tenant: BelongsToAccessor<
    Tenant,
    typeof Role.prototype.id
    >;

  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
    @repository.getter('TenantRepository')
    tenantRepositoryGetter: Getter<TenantRepository>,
  ) {
    super(Role, dataSource);
    this.tenant = this.createBelongsToAccessorFor('tenant', tenantRepositoryGetter);
  }

}
