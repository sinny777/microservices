import { filter } from 'rxjs/operators';
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
  import {Tenant, Customer} from '@sinny777/microservices-core';
  // import { Customer, Tenant } from '../models';
  import {TenantRepository} from '../repositories';
  import {authenticate} from '@loopback/authentication';
  
  @api({basePath: '/api/tenants/{tenantId}/', paths: {}})
  export class TenantCustomerController {
    constructor(
      @repository(TenantRepository)
      public tenantRepository : TenantRepository,
    ) {}
  
    @post('/customers', {
      responses: {
        '200': {
          description: 'Tenant Customer model instance',
          content: {'application/json': {schema: getModelSchemaRef(Customer)}},
        },
      },
    })
    @authenticate('jwt')
    async create(
      @param.path.string('tenantId') tenantId: typeof Tenant.prototype.id,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer, {
              exclude: ['id']
            }),
          },
        },
      })
      customer: Omit<Customer, 'id'>,
    ): Promise<Customer> {
      return this.tenantRepository.customers(tenantId).create(customer);
    }
  

    @get('/customers', {
        responses: {
          '200': {
            description: 'Array of Tenant Ciustomers model instances',
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
          @param.path.string('tenantId') tenantId: typeof Tenant.prototype.id,
          @param.query.object('filter', getFilterSchemaFor(Customer)) filter?: Filter<Customer>,
      ): Promise<Customer[]> {
        console.log('IN findTenantCustomers for tenantId: >>> ', tenantId);
        return this.tenantRepository.customers(tenantId).find(filter);
      }
   
    
    @patch('/customers', {
      responses: {
        '200': {
          description: 'Tenant Customer PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    @authenticate('jwt')
    async update(
      @param.path.string('tenantId') tenantId: typeof Tenant.prototype.id,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer, {partial: true}),
          },
        },
      })
      customer: Customer,
      @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
    ): Promise<Count> {
      return this.tenantRepository.customers(tenantId).patch(customer, where);
    }

    @del('/cusomers/{id}', {
      responses: {
        '204': {
          description: 'Tenant Customer DELETE success',
        },
      },
    })
    @authenticate('jwt')
    async deleteById(
      @param.path.string('tenantId') tenantId: typeof Tenant.prototype.id,
      @param.path.string('id') id: string,
      @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>): Promise<void> {      
        
        await this.tenantRepository.customers(tenantId).delete(where);

    }

  
  }
  