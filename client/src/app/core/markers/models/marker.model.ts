import { BaseModel, Audit } from '../../_base/crud';

export enum CONNECTIVITY {
  DISCONNECTED,
  CONNECTED,
  ACTIVE,
  INACTIVE
}

export enum STATUS {
  DEFAULT,
  NORMAL,
  WARNING,
  DANGER
}

export class Location {
  latitude: string | undefined;
  longitude: string | undefined;
  altitude: string | undefined;
  title: string | undefined;
  floor: string | undefined;
  building: string | undefined;
  department: string | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
  moreInfo: string | undefined;

    clear(): void {
      this.latitude = undefined;
      this.longitude = undefined;
      this.altitude = undefined;
      this.title = undefined;
      this.floor = undefined;
      this.building = undefined;
      this.department = undefined;
      this.addressLine1 = undefined;
      this.addressLine2 = undefined;
      this.city = undefined;
      this.state = undefined;
      this.country = undefined;
      this.zipCode = undefined;
      this.moreInfo = undefined;
    }
}

export class Marker extends BaseModel {
    id: string;
    orgId: string;
    title: string;
    description: string;
    iconUrl: string;
    type: string;
    data: any;
    status: STATUS;
    connectivity: CONNECTIVITY;
    location: Location;

    constructor() {
        super();
    }

    clear(): void {
      this.id = undefined;
      this.audit = new Audit();
      this.audit.clear();
      this.location = new Location();
      this.location.clear();
    }
}
