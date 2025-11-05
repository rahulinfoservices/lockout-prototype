import { Device } from "./device";

export interface Facility {
  id: string;
  name: string;
  zip: string;
  district: string;
  stateCode: string;
}

export interface FacilityWithDevices {
  id: string;
  name: string;
  zip: string;
  district: string;
  stateCode: string;
  devices: Device[];
  hasIssues: boolean;
  hasTampered: boolean;
  hasLowBattery: boolean;
}
