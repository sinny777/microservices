import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  api,
} from '@loopback/rest';
import {EntityRelation} from '../models';
import {EntityRelationRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@api({basePath: '/api/entity-relations', paths: {}})
export class RelationController {
  constructor(
    @repository(EntityRelationRepository)
    public entityRelationRepository : EntityRelationRepository,
  ) {}

  @post('/', {
    responses: {
      '200': {
        description: 'EntityRelation model instance',
        content: {'application/json': {schema: getModelSchemaRef(EntityRelation)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityRelation, {
            title: 'NewEntityRelation',
            exclude: ['id'],
          }),
        },
      },
    })
    entityRelation: Omit<EntityRelation, 'id'>,
  ): Promise<EntityRelation> {
    return this.entityRelationRepository.create(entityRelation);
  }

  @get('/count', {
    responses: {
      '200': {
        description: 'EntityRelation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(EntityRelation) where?: Where<EntityRelation>,
  ): Promise<Count> {
    return this.entityRelationRepository.count(where);
  }

  @get('/', {
    responses: {
      '200': {
        description: 'Array of EntityRelation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EntityRelation, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(EntityRelation) filter?: Filter<EntityRelation>,
  ): Promise<EntityRelation[]> {
    return this.entityRelationRepository.find(filter);
  }

  @patch('/entity-relations', {
    responses: {
      '200': {
        description: 'EntityRelation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityRelation, {partial: true}),
        },
      },
    })
    entityRelation: EntityRelation,
    @param.where(EntityRelation) where?: Where<EntityRelation>,
  ): Promise<Count> {
    return this.entityRelationRepository.updateAll(entityRelation, where);
  }

  @get('/{id}', {
    responses: {
      '200': {
        description: 'EntityRelation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntityRelation, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EntityRelation, {exclude: 'where'}) filter?: FilterExcludingWhere<EntityRelation>
  ): Promise<EntityRelation> {
    return this.entityRelationRepository.findById(id, filter);
  }

  @patch('/{id}', {
    responses: {
      '204': {
        description: 'EntityRelation PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityRelation, {partial: true}),
        },
      },
    })
    entityRelation: EntityRelation,
  ): Promise<void> {
    await this.entityRelationRepository.updateById(id, entityRelation);
  }

  @put('/{id}', {
    responses: {
      '204': {
        description: 'EntityRelation PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() entityRelation: EntityRelation,
  ): Promise<void> {
    await this.entityRelationRepository.replaceById(id, entityRelation);
  }

  @del('/{id}', {
    responses: {
      '204': {
        description: 'EntityRelation DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.entityRelationRepository.deleteById(id);
  }
}
