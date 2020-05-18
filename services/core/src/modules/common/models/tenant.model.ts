import { model, property, hasMany} from '@loopback/repository';
// import {v4 as uuid} from 'uuid';
import { TenantType } from './types';
import { UserModifiableEntity } from './user-modifiable-entity.model';
import { Role } from './role.model';

@model({
  name: 'tenants',
  settings: {strict: false}
})
export class Tenant extends UserModifiableEntity {

  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  type?: TenantType;

  @property({
    type: 'string',
    required: true,
  })
  title: string | undefined;

  @hasMany(() => Role, {keyTo: 'tenantId'})
  roles?: Role[];

  @property({
    type: 'string',
  })
  address1?: string;

  @property({
    type: 'string',
  })
  address2?: string;

  @property({
    type: 'string',
  })
  address3?: string;

  @property({
    type: 'string',
  })
  address4?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
  })
  zip?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  region?: string;

  @property({
    type: 'string',
    required: false,
    default: 'active',
  })
  status?: string;

  @property({
    type: 'string',
  })
  moreInfo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
