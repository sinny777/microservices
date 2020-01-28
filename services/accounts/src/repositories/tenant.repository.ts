import {Tenant, TenantRelations, User, Role} from 'microservices-core';
import {TenantsDataSource} from '../datasources';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
import { AuthenticationBindings } from '@loopback/authentication';
import { RoleRepository } from '.';
import {
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';

export class TenantRepository extends DefaultUserModifyCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
> {

  public readonly roles: HasManyRepositoryFactory<
    Role,
    typeof Tenant.prototype.id
    >;

  constructor(
    @inject('datasources.tenants') dataSource: TenantsDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,
    @repository.getter('RoleRepository')
    getRoleRepository: Getter<RoleRepository>,
  ) {
    super(Tenant, dataSource, getCurrentUser);
    this.roles = this.createHasManyRepositoryFactoryFor(
      'roles',
      getRoleRepository
    );
  }
}
