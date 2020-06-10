import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  api,
} from '@loopback/rest';
import {Tenant} from '@sinny777/microservices-core';
import {TenantRepository} from '../repositories';
import {AuthenticationBindings, authenticate} from '@loopback/authentication';

@api({basePath: '/api/iot/tenants', paths: {}})
export class TenantController {
  constructor(
    @repository(TenantRepository)
    public tenantRepository : TenantRepository,
  ) {}

  @post('/', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tenant)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tenant, {
            exclude: ['id']
          }),
        },
      },
    })
    tenant: Omit<Tenant, 'id'>,
  ): Promise<Tenant> {
    return this.tenantRepository.create(tenant);
  }

  @get('/count', {
    responses: {
      '200': {
        description: 'Tenant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Tenant)) where?: Where<Tenant>,
  ): Promise<Count> {
    return this.tenantRepository.count(where);
  }

  @get('/', {
    responses: {
      '200': {
        description: 'Array of Tenant model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tenant)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Tenant)) filter?: Filter<Tenant>,
  ): Promise<Tenant[]> {
    return this.tenantRepository.find(filter);
  }

  @patch('/', {
    responses: {
      '200': {
        description: 'Tenant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tenant, {partial: true}),
        },
      },
    })
    tenant: Tenant,
    @param.query.object('where', getWhereSchemaFor(Tenant)) where?: Where<Tenant>,
  ): Promise<Count> {
    return this.tenantRepository.updateAll(tenant, where);
  }

  @get('/{id}', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tenant)}},
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Tenant> {
    return this.tenantRepository.findById(id);
  }

  @patch('/{id}', {
    responses: {
      '204': {
        description: 'Tenant PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tenant, {partial: true}),
        },
      },
    })
    tenant: Tenant,
  ): Promise<void> {
    await this.tenantRepository.updateById(id, tenant);
  }

  @put('/{id}', {
    responses: {
      '204': {
        description: 'Tenant PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tenant: Tenant,
  ): Promise<void> {
    await this.tenantRepository.replaceById(id, tenant);
  }

  @del('/{id}', {
    responses: {
      '204': {
        description: 'Tenant DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tenantRepository.deleteById(id);
  }
}
