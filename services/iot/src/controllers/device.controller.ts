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
import {Device} from '../models';
import {DeviceRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@api({basePath: '/api/devices', paths: {}})
export class DeviceController {
  constructor(
    @repository(DeviceRepository)
    public deviceRepository : DeviceRepository,
  ) {}


  @post('/', {
    responses: {
      '200': {
        description: 'Device model instance',
        content: {'application/json': {schema: getModelSchemaRef(Device)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {
            title: 'NewDevice',
            exclude: ['id'],
          }),
        },
      },
    })
    device: Omit<Device, 'id'>,
  ): Promise<Device> {
    return this.deviceRepository.create(device);
  }

  
  @get('/count', {
    responses: {
      '200': {
        description: 'Device model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(Device) where?: Where<Device>,
  ): Promise<Count> {
    return this.deviceRepository.count(where);
  }


  @get('/', {
    responses: {
      '200': {
        description: 'Array of Device model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Device, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Device) filter?: Filter<Device>,
  ): Promise<Device[]> {
    return this.deviceRepository.find(filter);
  }


  @patch('/', {
    responses: {
      '200': {
        description: 'Device PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    device: Device,
    @param.where(Device) where?: Where<Device>,
  ): Promise<Count> {
    return this.deviceRepository.updateAll(device, where);
  }


  @get('/{id}', {
    responses: {
      '200': {
        description: 'Device model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Device, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Device, {exclude: 'where'}) filter?: FilterExcludingWhere<Device>
  ): Promise<Device> {
    return this.deviceRepository.findById(id, filter);
  }


  @patch('/{id}', {
    responses: {
      '204': {
        description: 'Device PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    device: Device,
  ): Promise<void> {
    await this.deviceRepository.updateById(id, device);
  }

  
  @put('/{id}', {
    responses: {
      '204': {
        description: 'Device PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() device: Device,
  ): Promise<void> {
    await this.deviceRepository.replaceById(id, device);
  }

  
  @del('/{id}', {
    responses: {
      '204': {
        description: 'Device DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deviceRepository.deleteById(id);
  }

}
