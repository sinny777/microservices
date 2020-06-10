import { Contact } from './contact.model';
import { model, property, hasMany} from '@loopback/repository';
// import {v4 as uuid} from 'uuid';
import { TenantType, AddressType } from './types';
import { UserModifiableEntity } from './user-modifiable-entity.model';

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
    jsonSchema: {
      enum: Object.values(TenantType),
    },
  })
  type: TenantType;

  @property({
    type: 'string',
    required: true,
  })
  title: string | undefined;

  @property({
    type: 'object',
  })
  contact?: Contact;

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
