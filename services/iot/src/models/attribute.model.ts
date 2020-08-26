import {Model, model, property} from '@loopback/repository';
import { EntityType } from '.';

@model()
export class Attribute extends Model {

    @property({
        type: 'string',
        required: false,
        default: process.env.KEYCLOAK_REALM
      })
      tenantId: string;
    
      @property({
        type: 'string',
        required: false,
      })
      customerId: string;

    @property() entityType: EntityType;

    @property() entitySubType: string;

    @property() type: string; // This can be Client Side (CS) | Server Side (SS) | Shared (SH)

    @property() key: string;

    @property() dataType: string;

    @property() unit: string;

    constructor(data?: Partial<Attribute>) {
        super(data);
    }
}