DROP SCHEMA IF EXISTS smartthings-accounts CASCADE;
CREATE SCHEMA smartthings-accounts;
GRANT ALL ON SCHEMA smartthings-accounts TO public;

DROP SCHEMA IF EXISTS logs CASCADE;
CREATE SCHEMA logs;
GRANT ALL ON SCHEMA logs TO public;

-- CREATE SEQUENCE logs.audit_logs_id_seq START WITH 1;

-- CREATE SEQUENCE smartthings-accounts.roles_id_seq START WITH 1;

-- CREATE SEQUENCE smartthings-accounts.tenants_id_seq START WITH 1;

-- CREATE SEQUENCE smartthings-accounts.user_tenant_permissions_id_seq START WITH 1;

-- CREATE SEQUENCE smartthings-accounts.user_tenants_id_seq START WITH 1;

-- CREATE SEQUENCE smartthings-accounts.users_id_seq START WITH 1;

CREATE TABLE logs.audit_logs (
	id                   integer  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	operation_name       varchar(10)  NOT NULL ,
	operation_time       timestamptz DEFAULT now() NOT NULL ,
	"table_name"         varchar(60)  NOT NULL ,
	log_type             varchar(100) DEFAULT 'APPLICATION_LOGS'::character varying  ,
	entity_id            varchar   ,
	user_id              varchar   ,
	"before"             jsonb   ,
	"after"              jsonb   ,
	CONSTRAINT pk_audit_logs_id PRIMARY KEY ( id )
 );

CREATE TABLE smartthings-accounts.roles (
	id                   varchar(32)  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	name                 varchar(100)  NOT NULL ,
	parentId             varchar(100) ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	deleted              bool DEFAULT false NOT NULL ,
	CONSTRAINT pk_roles_id PRIMARY KEY ( id )
 );

-- CREATE INDEX idx_roles_key ON smartthings-accounts.roles ( role_key );

CREATE TABLE smartthings-accounts.tenants (
	id                   varchar(32)  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	name                 varchar(100)  NOT NULL ,
	"type"               varchar(50)  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           integer   ,
	modified_by          integer   ,
	deleted              bool DEFAULT false NOT NULL ,
	address1             varchar(100)   ,
	address2             varchar(100)   ,
	address3             varchar(100)   ,
	address4             varchar(100)   ,
	city                 varchar(100)   ,
	"state"              varchar(100)   ,
	zip                  varchar(20)   ,
	country              varchar(50)   ,
	status               varchar(50) DEFAULT 'active'::character varying NOT NULL ,
	CONSTRAINT pk_tenant_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_tenants_created_by ON smartthings-accounts.tenants ( created_by );

CREATE INDEX idx_tenants_modified_by ON smartthings-accounts.tenants ( modified_by );

CREATE TABLE smartthings-accounts.user_tenant_permissions (
	id                   integer  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	user_tenant_id       varchar(32)  NOT NULL ,
	created_on           date DEFAULT CURRENT_DATE NOT NULL ,
	modified_on          date DEFAULT CURRENT_DATE NOT NULL ,
	created_by           integer   ,
	modified_by          integer   ,
	deleted              bool DEFAULT false NOT NULL ,
	permission           text  NOT NULL ,
	allowed              bool DEFAULT true NOT NULL ,
	CONSTRAINT pk_user_permissions_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_user_tenant_permissions_created_by ON smartthings-accounts.user_tenant_permissions ( created_by );

CREATE INDEX idx_user_tenant_permissions_modified_by ON smartthings-accounts.user_tenant_permissions ( modified_by );

CREATE INDEX idx_user_tenant_permissions_user_tenant_id ON smartthings-accounts.user_tenant_permissions ( user_tenant_id );

CREATE TABLE smartthings-accounts.user_tenants (
	id                   varchar(32)  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	user_id              integer  NOT NULL ,
	tenant_id            integer  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	deleted              bool DEFAULT false NOT NULL ,
	role_id              integer NOT NULL ,
	status               varchar(50) DEFAULT 'active'::character varying NOT NULL ,
	CONSTRAINT pk_user_tenant_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_user_tenant_tenant_id ON smartthings-accounts.user_tenants ( tenant_id );

CREATE INDEX idx_user_tenant_user_id ON smartthings-accounts.user_tenants ( user_id );

CREATE INDEX idx_user_tenants_role_id ON smartthings-accounts.user_tenants ( role_id );

CREATE TABLE smartthings-accounts.users (
	id                   varchar(32)  NOT NULL,
	first_name           varchar(50)  NOT NULL ,
	middle_name          varchar(50)   ,
	last_name            varchar(50)   ,
	username             varchar(150)  NOT NULL ,
	email                varchar(150)   ,
	phone                varchar(15)   ,
	"password"           varchar(60)  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           integer   ,
	modified_by          integer   ,
	deleted              bool DEFAULT false NOT NULL ,
	default_tenant       integer  NOT NULL ,
	last_login           timestamptz   ,
	CONSTRAINT pk_user_id PRIMARY KEY ( id ),
	CONSTRAINT idx_username UNIQUE ( username )
 );

CREATE INDEX idx_user_created_by ON smartthings-accounts.users ( created_by );

CREATE INDEX idx_user_modified_by ON smartthings-accounts.users ( modified_by );

CREATE INDEX idx_users_default_tenant ON smartthings-accounts.users ( default_tenant );

CREATE OR REPLACE FUNCTION logs.audit_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
  DECLARE
    USER_ID VARCHAR;
    ENTITY_ID VARCHAR;
BEGIN
IF TG_OP = 'INSERT'
THEN
USER_ID := to_json(NEW)->'created_by';
ENTITY_ID := to_json(NEW)->'id';
INSERT INTO logs.audit_logs (
  operation_name,
  table_name,
  log_type,
  entity_id,
  user_id,
  after
  )
VALUES (
  TG_OP,
  TG_TABLE_NAME,
  TG_ARGV[0],
  ENTITY_ID,
  USER_ID,
  to_jsonb(NEW)
  );
RETURN NEW;
ELSIF TG_OP = 'UPDATE'
THEN
USER_ID := to_json(NEW)->'modified_by';
ENTITY_ID := to_json(NEW)->'id';
-- IF NEW != OLD THEN
 INSERT INTO logs.audit_logs (
   operation_name,
   table_name,
   log_type,
   entity_id,
   user_id,
   before,
   after
   )
VALUES (
  TG_OP,
  TG_TABLE_NAME,
  TG_ARGV[0],
  ENTITY_ID,
  USER_ID,
  to_jsonb(OLD),
  to_jsonb(NEW)
  );
-- END IF;
 RETURN NEW;
ELSIF TG_OP = 'DELETE'
THEN
USER_ID := to_json(OLD)->'modified_by';
ENTITY_ID := to_json(OLD)->'id';
INSERT INTO logs.audit_logs (
  operation_name,
  table_name,
  log_type,
  entity_id,
  user_id,
  before)
VALUES (
  TG_OP,
  TG_TABLE_NAME,
  TG_ARGV[0],
  ENTITY_ID,
  USER_ID,
  to_jsonb(OLD)
);
RETURN OLD;
END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.moddatetime()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_on = now();
    RETURN NEW;
END;
$function$
;

CREATE TRIGGER mdt_roles BEFORE UPDATE ON smartthings-accounts.roles FOR EACH ROW EXECUTE PROCEDURE moddatetime();

CREATE TRIGGER mdt_tenants BEFORE UPDATE ON smartthings-accounts.tenants FOR EACH ROW EXECUTE PROCEDURE moddatetime();

CREATE TRIGGER mdt_user_tenant_permissions BEFORE UPDATE ON smartthings-accounts.user_tenant_permissions FOR EACH ROW EXECUTE PROCEDURE moddatetime();

CREATE TRIGGER mdt_user_tenants BEFORE UPDATE ON smartthings-accounts.user_tenants FOR EACH ROW EXECUTE PROCEDURE moddatetime();

CREATE TRIGGER mdt_users BEFORE UPDATE ON smartthings-accounts.users FOR EACH ROW EXECUTE PROCEDURE moddatetime();

CREATE TRIGGER tenants_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON smartthings-accounts.tenants FOR EACH ROW EXECUTE PROCEDURE logs.audit_trigger('USER_LOGS');

CREATE TRIGGER user_tenant_permissions_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON smartthings-accounts.user_tenant_permissions FOR EACH ROW EXECUTE PROCEDURE logs.audit_trigger('USER_LOGS');

CREATE TRIGGER users_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON smartthings-accounts.users FOR EACH ROW EXECUTE PROCEDURE logs.audit_trigger('USER_LOGS');

ALTER TABLE smartthings-accounts.tenants ADD CONSTRAINT fk_created_by FOREIGN KEY ( created_by ) REFERENCES smartthings-accounts.user_tenants( id );

ALTER TABLE smartthings-accounts.tenants ADD CONSTRAINT fk_modified_by FOREIGN KEY ( modified_by ) REFERENCES smartthings-accounts.user_tenants( id );

ALTER TABLE smartthings-accounts.user_tenant_permissions ADD CONSTRAINT fk_created_by FOREIGN KEY ( created_by ) REFERENCES smartthings-accounts.user_tenants( id );

ALTER TABLE smartthings-accounts.user_tenant_permissions ADD CONSTRAINT fk_modified_by FOREIGN KEY ( modified_by ) REFERENCES smartthings-accounts.user_tenants( id );

ALTER TABLE smartthings-accounts.user_tenant_permissions ADD CONSTRAINT fk_user_tenant_permissions FOREIGN KEY ( user_tenant_id ) REFERENCES smartthings-accounts.user_tenants( id );

ALTER TABLE smartthings-accounts.user_tenants ADD CONSTRAINT fk_user_tenants_roles FOREIGN KEY ( role_id ) REFERENCES smartthings-accounts.roles( id );

ALTER TABLE smartthings-accounts.user_tenants ADD CONSTRAINT fk_user_tenant_tenant FOREIGN KEY ( tenant_id ) REFERENCES smartthings-accounts.tenants( id );

ALTER TABLE smartthings-accounts.user_tenants ADD CONSTRAINT fk_user_tenant_user FOREIGN KEY ( user_id ) REFERENCES smartthings-accounts.users( id );

ALTER TABLE smartthings-accounts.users ADD CONSTRAINT fk_users_tenants_default_tenant FOREIGN KEY ( default_tenant ) REFERENCES smartthings-accounts.tenants( id );

ALTER TABLE smartthings-accounts.users ADD CONSTRAINT fk_user_user_tenant_created_by FOREIGN KEY ( created_by ) REFERENCES smartthings-accounts.user_tenants( id );

ALTER TABLE smartthings-accounts.users ADD CONSTRAINT fk_user_user_tenant_modified_by FOREIGN KEY ( modified_by ) REFERENCES smartthings-accounts.user_tenants( id );
