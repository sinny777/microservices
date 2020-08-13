import { model, property } from '@loopback/repository';
import { UserModifiableEntity } from '@sinny777/microservices-core';

@model({settings: {strict: false}})
export class EntityData extends UserModifiableEntity {

  @property({
    type: 'string',
    required: true,
  })
  entityId?: string;

  @property({
    type: 'string',
    required: true,
  })
  entityType?: string;

  @property({
    type: 'string',
    required: true,
  })
  attributeKey: string;

  @property({
    type: 'string',
    required: true,
  })
  attributeType: string;

  @property({
    type: 'string',
    required: false,
  })
  dataType: string;

  @property({
    type: 'string',
    required: false,
  })
  unit: string; // meters, centi-meter, celcius, fahrenheit etc.

  @property({
    type: 'string',
    required: false,
  })
  dataValue: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EntityData>) {
    super(data);
  }
}

export interface EntityDataRelations {
  // describe navigational properties here
}

export type EntityDataWithRelations = EntityData & EntityDataRelations;
