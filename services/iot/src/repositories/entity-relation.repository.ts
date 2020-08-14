
import { DefaultUserModifyCrudRepository } from '@sinny777/microservices-core';
import { EntityRelation, EntityRelationRelations } from './../models/entity-relation.model';
import { EntityRelationsDataSource } from '../datasources';
import { AuthenticationBindings } from '@loopback/authentication';

import {inject, Getter} from '@loopback/core';
import { UserProfile } from '@loopback/security';

export class EntityRelationRepository extends DefaultUserModifyCrudRepository<
  EntityRelation,
  typeof EntityRelation.prototype.id,
  EntityRelationRelations
> {

  constructor(
    @inject('datasources.assets') dataSource: EntityRelationsDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,   
  ) {
    super(EntityRelation, dataSource, getCurrentUser);
   
  }
}
