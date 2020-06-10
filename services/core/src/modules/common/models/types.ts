
export type Credentials = {
  username: string;
  password: string;
};

export enum TenantType {
    APPLICATION = 'application',
    CUSTOMER = 'customer',
    VENDOR = 'vendor',
    OTHER = 'other'
}

export const enum AddressType {
  HOME = 'HOME',
  BILLING = 'BILLING',
  OFFICE = 'OFFICE',
  OTHER = 'other'
}

export const enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  MANAGER = 'MANAGER',
  OPERATOR = 'OPERATOR',
  APP_USER = 'APP_USER',
}