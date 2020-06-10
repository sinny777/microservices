import { model, property } from '@loopback/repository';
import { AddressType } from './types';


@model({
  name: 'address'  
})
export class Address {

  @property({
    type: 'string',
    required: true,
  })
  type?: AddressType;

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
  })
  latitude?: string;

  @property({
    type: 'string',
  })
  longitude?: string;

  @property({
    type: 'string',
  })
  moreInfo?: string;

}

