import {model, property, belongsTo} from '@loopback/repository';
import {BaseEntity} from './base-entity.model';
import {Tenant, TenantWithRelations} from './tenant.model';
import {User, UserWithRelations} from './user.model';
import {Permission, PermissionWithRelations} from './permission.model';

@model({
  name: 'user_tenant_permissions',
})
export class UserTenantPermission extends BaseEntity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @belongsTo(
    () => User,
    {keyFrom: 'user_id', name: 'user_id'},
    {
      name: 'user_id',
      required: true,
    },
  )
  userId: string | undefined;

  @belongsTo(
    () => Tenant,
    {keyFrom: 'tenant_id', name: 'tenant_id'},
    {
      name: 'tenant_id',
      required: true,
    },
  )
  tenantId: string | undefined;

  @belongsTo(
    () => Permission,
    {keyFrom: 'permission_id', name: 'permission_id'},
    {
      name: 'permission_id',
      required: true,
    },
  )
  permissionId: string | undefined;

  @property({
    type: 'boolean',
    required: false,
    default: true,
  })
  allowed: boolean | undefined;

  constructor(data?: Partial<UserTenantPermission>) {
    super(data);
  }
}

export interface UserTenantPermissionRelations {
  user: UserWithRelations;
  tenant: TenantWithRelations;
  permission: PermissionWithRelations;
}

export type UserTenantPermissionWithRelations = UserTenantPermission & UserTenantPermissionRelations;
