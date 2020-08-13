
import { DefaultUserModifyCrudRepository } from '@sinny777/microservices-core';
import { Device, DeviceRelations } from './../models/device.model';
import { DevicesDataSource } from '../datasources';
import { AuthenticationBindings } from '@loopback/authentication';

import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';

export class DeviceRepository extends DefaultUserModifyCrudRepository<
  Device,
  typeof Device.prototype.id,
  DeviceRelations
> {

  constructor(
    @inject('datasources.devices') dataSource: DevicesDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,   
  ) {
    super(Device, dataSource, getCurrentUser);
   
  }
}
