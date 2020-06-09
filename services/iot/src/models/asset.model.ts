import {UserModifiableEntity} from '@sinny777/microservices-core';
import {model, property, hasOne} from '@loopback/repository';
// import {v4 as uuid} from 'uuid';
// import { Permission } from '@loopback/security';

@model({
  settings: {
    indexes: {
      name: {
        keys: {
          name: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Asset extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    index: true
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
    index: true
  })
  type?: string;

  @property({
    type: 'string',
    required: false
  })
  tenantId?: string;

  @property({
    type: 'string',
    required: false
  })
  customerId?: string;

  @property({
    type: 'string',
    required: false,
  })
  description?: string | undefined;

 
  // Define well-known properties here

  constructor(data?: Partial<Asset>) {
    super(data);
    // if (data != null && typeof data === 'object') {
    //   Object.assign(this, data);
    // }
  }
}

export type AssetWithRelations = Asset;

