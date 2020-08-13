import {model, property} from '@loopback/repository';
import { UserModifiableEntity } from '@sinny777/microservices-core';

@model({
  settings: {
    indexes: {
      name: {
        keys: {
          name: 1,
        }
      },
    },
  },
})
export class Device extends UserModifiableEntity {

  @property({
    type: 'string',
    required: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tenantId: string;

  @property({
    type: 'string',
    required: false,
  })
  customerId: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  label: string;

  @property({
    type: 'string',
    required: false,
  })
  moreInfo: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Device>) {
    super(data);
  }
}

export interface DeviceRelations {
  // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;
