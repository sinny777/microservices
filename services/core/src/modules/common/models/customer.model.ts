import { Contact } from './contact.model';
import { model, property} from '@loopback/repository';
import { UserModifiableEntity } from './user-modifiable-entity.model';
import { TenantWithRelations } from '.';

@model({
  name: 'customers',
  settings: {strict: false}
})
export class Customer extends UserModifiableEntity {

  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id?: string;

  @property({
    type: 'string'    
  })
  tenantId: string;

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

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
  tenant?: TenantWithRelations;
}

export type CustomerWithRelations = Customer & CustomerRelations;
