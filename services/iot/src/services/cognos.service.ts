import {inject, Provider} from '@loopback/core';
import { CognosAPIDatasource } from '../datasources';
import { juggler } from '@loopback/repository';
import { getService } from '@loopback/service-proxy';


export interface CreateSessionPayload {
    webDomain: string,
    expiresIn: number
}

export interface CognosApiServiceI {
    createCognosSession(webDomain: string, expiresIn: number): Promise<any>;
}

export class CognosApiServiceProvider implements Provider<CognosApiServiceI> {
    constructor(
       @inject('datasources.cognos')
       protected dataSource: juggler.DataSource = new CognosAPIDatasource(),
    ) {}
    value(): Promise<CognosApiServiceI> {
       return getService(this.dataSource);
    }
 }
