import { model, property, belongsTo, hasMany} from '@loopback/repository';
import { UserModifiableEntity } from './user-modifiable-entity.model';
import { RoleType } from './types';
import { Tenant, TenantWithRelations } from './tenant.model';

@model({
  name: 'roles',
  settings: {strict: false}
})
export class Role extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @property({
    type: 'string',
    required: true
  })
  name?: string;

  @belongsTo(() => Role)
    parentId?: string;
  
  @property({
    type: 'string',
    name: 'role_key',
    default: RoleType.USER
  })
  roleKey?: RoleType;

  @belongsTo(() => Tenant)
  tenantId?: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
  
}

export interface RoleRelations {
  parent: RoleWithRelations;
  tenant: TenantWithRelations;
}

export type RoleWithRelations = Role & RoleRelations;
