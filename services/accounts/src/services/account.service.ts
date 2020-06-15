import {bind, inject, BindingScope} from '@loopback/core';
import {UserProfile} from '@loopback/security';
import { AuthenticationBindings } from '@loopback/authentication';

@bind({scope: BindingScope.TRANSIENT})
export class AccountService {
  constructor(@inject(AuthenticationBindings.CURRENT_USER)
  currentUserProfile: UserProfile) {}

  /*
   * Add service methods here
   */

  async getUserInfo(): Promise<UserProfile> {
    return null;
  }


}
