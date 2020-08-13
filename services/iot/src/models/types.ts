
  export enum EntityType {
    TENANT = 'TENANT',
    CUSTOMER = 'CUSTOMER',
    USER = 'USER',
    DASHBOARD = 'DASHBOARD',
    ASSET = 'ASSET',
    DEVICE = 'DEVICE',
    ALARM = 'ALARM',
    ENTITY_VIEW = 'ENTITY_VIEW',     
    OTHER = 'other'
  }
  
  export const enum AttributeType {
    CLIENT_SIDE = 'CLIENT_SIDE',
    SERVER_SIDE = 'SERVER_SIDE',
    SHARED = 'SHARED'
  }

  export const enum EntityRelationType {
    CONTAINS = 'CONTAINS',
    MANAGES = 'MANAGES'    
  }
  
  export const enum RelationTypeGroup {
    COMMON = 'COMMON',
    ALARM = 'ALARM',
    DASHBOARD = 'DASHBOARD',
    RULE_CHAIN = 'RULE_CHAIN',
    RULE_NODE = 'RULE_NODE',
  }