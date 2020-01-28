import {Entity, model, property, belongsTo} from '@loopback/repository';
import {
  Role,
  RoleWithRelations,
  Permission,
  PermissionWithRelations
} from ".";


@model({
  name: 'role-permissions',
  settings: {strict: false}
})
export class RolePermission extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @belongsTo(() => Role)
    roleId?: string;

  @belongsTo(() => Permission)
  permissionId?: string;

  constructor(data?: Partial<RolePermission>) {
    super(data);
  }
}

export interface RolePermissionRelations {
  role: RoleWithRelations;
  permission: PermissionWithRelations;
}

export type RolePermissionWithRelations = RolePermission &
  RolePermissionRelations;