export interface SecurityAlert {
  alertId: string;
  alertType: "full_lockdown_mode" | "all_clear";
  description: string;
  deviceHealth: "Online" | "LowBat" | "Offline";
  deviceId: string;
  deviceType: string;
  district: string;
  facility: string;
  facility_from: string;
  lat: number;
  lon: number;
  messageType: string;
  notificationSentToSOS: boolean;
  roomId: string;
  schoolId: string;
  schoolStatus: string;
  ts: Date;
}

export type NullableSecurityAlert = SecurityAlert | null;

export type AlertCategory = "ALERTS" | "TELEMETRY";
