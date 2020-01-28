import { BaseModel, Audit } from '../../_base/crud';
import { Role } from '../../auth';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
    id: string;
    providerId: string;
    username: string;
    password: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    roles: Role[];
    pic: string;
    firstName: string;
    lastName: string;
    name: string;
    phone: string;
    companyName: string;
    occupation: string;
    address: Address;
    socialNetworks: SocialNetworks;
    blueGroups: any;

    clear(): void {
        this.id = undefined;
        this.providerId = undefined;
        this.username = '';
        this.password = '';
        this.email = '';
        this.roles = [];
        this.firstName = '';
        this.lastName = '';
        this.accessToken = 'access-token-' + Math.random();
        this.refreshToken = 'access-token-' + Math.random();
        this.pic = './assets/media/users/default.jpg';
        this.occupation = '';
        this.companyName = '';
        this.phone = '';
        this.address = new Address();
        this.address.clear();
        this.socialNetworks = new SocialNetworks();
        this.socialNetworks.clear();
        this.blueGroups = [];
        this.audit = new Audit();
        this.audit.clear();
    }
}
