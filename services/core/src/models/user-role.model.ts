import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User, UserWithRelations, Role, RoleWithRelations} from '.';

@model({
  name: 'user-roles',
  settings: {strict: false}
})
export class UserRole extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @belongsTo(() => User)
  userId: string | undefined;

  @belongsTo(() => Role)
  roleId: string | undefined;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}

export interface UserRoleRelations {
  user: UserWithRelations;
  role: RoleWithRelations;
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
