import { BaseModel } from '../../_base/crud';

export class User extends BaseModel {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
  pic: string;
  name: string;
  firstName: string;
  lastName: string;


  clear(): void {
    this.id = undefined;
    this.username = '';
    this.email = '';
    this.roles = [];
    this.name = '';
    this.accessToken = 'access-token-' + Math.random();
    this.refreshToken = 'access-token-' + Math.random();
    this.pic = './assets/media/users/default.jpg';
    this.firstName = '';
    this.lastName = '';

  }
}
