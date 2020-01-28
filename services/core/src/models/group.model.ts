import { model, property, belongsTo} from '@loopback/repository';
import { UserModifiableEntity } from './user-modifiable-entity.model';

@model({
  name: 'groups',
  settings: {strict: false}
})
export class Group extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    required: true,
    defaultFn: "uuidv4"
  })
  id: string | undefined;

  @property({
    type: 'string',
    required: true,
  })
  name: string | undefined;

  @belongsTo(() => Group)
    parentId: string | undefined;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  parent: GroupWithRelations;
}

export type GroupWithRelations = Group & GroupRelations;
