import { SecurityAlert } from "./alert";
import { DateTimestamps, FirebaseTimestamps } from "./timestamps";

export interface DeviceDetails {
  deviceId: string;
  securityStatus: SecurityAlert["alertType"];
  deviceHealthStatus: string;
}

export type DeviceDetailsDocument = DeviceDetails & FirebaseTimestamps;

export type DeviceDetailsData = DeviceDetails & DateTimestamps;
