import { Address } from './address.model';
import { model, property} from '@loopback/repository';


@model({
  name: 'contact'
})
export class Contact {

  @property({
    type: 'string',
  })
  primaryEmail?: string;

  @property({
    type: 'string',    
  })
  secondaryEmail?: string;

  @property({
    type: 'string',
  })
  primaryPhone?: string;

  @property({
    type: 'string',    
  })
  secondaryPhone?: string;

  @property({
    type: 'object',    
  })
  addresses?: Address[];

}
