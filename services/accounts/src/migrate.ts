import {AccountsApplication} from './application';
import { Tenant, User } from 'microservices-core';
import { AuthClient } from 'microservices-core/dist/models';
import { AuthClientRepository } from './repositories/auth-client.repository';
import { TenantRepository } from './repositories/tenant.repository';
import { UserRepository } from './repositories/user.repository';
import * as data from './config/master_data.json';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new AccountsApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});
  
  const authClientRepository: AuthClientRepository = await app.getRepository(AuthClientRepository);
  const tenantRepository: TenantRepository = await app.getRepository(TenantRepository);
  const userRepository: UserRepository = await app.getRepository(UserRepository);

  const tenant: Tenant = data.tenants[0] as Tenant;
  const createdTenant = await tenantRepository.create(tenant);
  console.log(createdTenant);
  
  const auth_client = data.clients[0] as AuthClient;
  const authClient:AuthClient = new AuthClient(auth_client);
  await authClientRepository.create(authClient);
  
  let super_admin = data.users[0] as User;
  // super_admin.defaultTenant = createdTenant.id;
  let superAdmin = await userRepository.create(super_admin);
  console.log(superAdmin);
  
  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

const syncWait1 = (ms: number) => {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}

function syncWait(miliseconds: number){
  const gen = function * (){
     const end = Date.now() + miliseconds;
     while(Date.now() < end){yield};
     return;
  }  
  const iter = gen();
  while(iter.next().done === false);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});

