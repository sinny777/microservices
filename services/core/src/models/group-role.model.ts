import { Entity, model, property, belongsTo } from "@loopback/repository";
import { Group, GroupWithRelations, Role, RoleWithRelations } from ".";

@model({
  name: 'group-roles',
  settings: {strict: false}
})
export class GroupRole extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id: string | undefined;

  @belongsTo(() => Group)
    groupId: string | undefined;

  @belongsTo(() => Role)
    roleId: string | undefined;

  constructor(data?: Partial<GroupRole>) {
    super(data);
  }
}

export interface GroupRoleRelations {
  group: GroupWithRelations;
  role: RoleWithRelations;
}

export type GroupRoleWithRelations = GroupRole & GroupRoleRelations;
