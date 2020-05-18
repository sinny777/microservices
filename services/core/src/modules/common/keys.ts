import {BindingKey} from '@loopback/context';
import { securityId, UserProfile } from '@loopback/security';
import { User, CommonService } from '.';

export namespace CommonConstants {
    export const SECURITY_ID = securityId;  
  }
  
  export interface CommonServiceI {
    convertToUserProfile(user: User): UserProfile;  
  }
  
  export namespace CommonServiceBindings {
    export const COMMON_SERVICE = BindingKey.create<CommonService | undefined>(
      'common.service',
    );
  }