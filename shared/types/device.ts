import { SecurityAlert } from "./security-alert";

export interface DeviceDetails {
  deviceId: string;
  securityStatus: SecurityAlert["alertType"];
  deviceHealthStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
