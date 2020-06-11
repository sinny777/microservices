
import { DefaultUserModifyCrudRepository } from '@sinny777/microservices-core';
import { Asset, AssetRelations } from './../models/asset.model';
import { AssetsDataSource } from '../datasources';
import { AuthenticationBindings } from '@loopback/authentication';

import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';

export class AssetRepository extends DefaultUserModifyCrudRepository<
  Asset,
  typeof Asset.prototype.id,
  AssetRelations
> {

  constructor(
    @inject('datasources.assets') dataSource: AssetsDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,   
  ) {
    super(Asset, dataSource, getCurrentUser);
   
  }
}
