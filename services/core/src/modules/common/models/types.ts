
export type Credentials = {
  username: string;
  password: string;
};

export const enum TenantType {
    APPLICATION = 'application',
    CUSTOMER = 'customer',
    VENDOR = 'vendor',
    OTHER = 'other'
}

export const enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  MANAGER = 'MANAGER',
  OPERATOR = 'OPERATOR',
  USER = 'USER',
}