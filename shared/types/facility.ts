import { Device } from "./device";

export interface Facility {
  id: string;
  name: string;
  zip: string;
  district: string;
  stateCode: string;
  schoolId: string;
}

export interface FacilityWithDevices extends Facility {
  devices: Device[];
  hasIssues: boolean;
  hasTampered: boolean;
  hasLowBattery: boolean;
}
