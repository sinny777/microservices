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
import {Asset} from '../models';
import {AssetRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@api({basePath: '/api/assets', paths: {}})
export class AssetController {
  constructor(
    @repository(AssetRepository)
    public assetRepository : AssetRepository,
  ) {}

  @post('/', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asset)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asset, {
            title: 'NewAsset',
            exclude: ['id'],
          }),
        },
      },
    })
    asset: Omit<Asset, 'id'>,
  ): Promise<Asset> {
    return this.assetRepository.create(asset);
  }

  @get('/count', {
    responses: {
      '200': {
        description: 'Asset model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(Asset) where?: Where<Asset>,
  ): Promise<Count> {
    return this.assetRepository.count(where);
  }

  @get('/', {
    responses: {
      '200': {
        description: 'Array of Asset model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Asset, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Asset) filter?: Filter<Asset>,
  ): Promise<Asset[]> {
    let dsConfig = {
      name: 'assets',
      connector: process.env.DB_CONNECTOR,
      url: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      'plugin': 'retry',
      'retryAttempts': 3,
      'retryTimeout': 1000
    };

    console.log(dsConfig);

    return this.assetRepository.find(filter);
  }

  @patch('/', {
    responses: {
      '200': {
        description: 'Asset PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asset, {partial: true}),
        },
      },
    })
    asset: Asset,
    @param.where(Asset) where?: Where<Asset>,
  ): Promise<Count> {
    return this.assetRepository.updateAll(asset, where);
  }

  @get('/{id}', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Asset, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asset, {exclude: 'where'}) filter?: FilterExcludingWhere<Asset>
  ): Promise<Asset> {
    return this.assetRepository.findById(id, filter);
  }

  @patch('/{id}', {
    responses: {
      '204': {
        description: 'Asset PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asset, {partial: true}),
        },
      },
    })
    asset: Asset,
  ): Promise<void> {
    await this.assetRepository.updateById(id, asset);
  }

  @put('/{id}', {
    responses: {
      '204': {
        description: 'Asset PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asset: Asset,
  ): Promise<void> {
    await this.assetRepository.replaceById(id, asset);
  }

  @del('/{id}', {
    responses: {
      '204': {
        description: 'Asset DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.assetRepository.deleteById(id);
  }
}
