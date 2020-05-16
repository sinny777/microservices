import {Entity, model, property} from '@loopback/repository';
import { UserModifiableEntity } from './user-modifiable-entity.model';

@model({
  name: 'permissions',
  settings: {}
})
export class Permission extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id: string | undefined;

  @property({
    type: 'string',
    required: false,
    index: {
      unique: true
    }
  })
  key: string | undefined;

  @property({
    type: 'string',
    required: false
  })
  action: string | undefined; // READ | CREATE | UPDATE | DELETE

  @property({
    type: 'string',
    required: false
  })
  resourceType: string | undefined; // CUSTOMER | USER | DASHBOARD | ORDER | DEVICE

  @property({
    type: 'string',
    required: false
  })
  resourcesId: string | undefined;

  @property({
    type: 'boolean',
    required: false,
    default: true
  })
  allowed: boolean | undefined;

  /**
   * Property of a protected resource type/instance, such as `email`
   */
  @property({
    type: 'string',
    required: false
  })
  resourceProperty: string | undefined;

  constructor(data?: Partial<Permission>) {
    super(data);
  }
}

export interface PermissionRelations {}

export type PermissionWithRelations = Permission & PermissionRelations;
