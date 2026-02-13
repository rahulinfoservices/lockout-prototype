import { SecurityAlert } from "./alert";
import { DateTimestamps, FirebaseTimestamps } from "./timestamps";

export type DeviceType =
  | "PULL BOX"
  | "SMART BOOT"
  | "SMART LIGHT"
  | "TABLET"
  | "UNKNOWN";

export interface DeviceDetails {
  deviceId: string;
  securityStatus: SecurityAlert["alertType"] | "normal";
  deviceHealthStatus: string;
  encoding?: string;
  location?: string;
  zone?: string;
  name?: string;
  type?: string;
  mac?: string;
  deviceType?: DeviceType;
  status?: string;
  date?: string;

}

export type DeviceDetailsDocument = DeviceDetails & FirebaseTimestamps;

export type DeviceDetailsData = DeviceDetails & DateTimestamps;

export const DEVICE_COLLECTIONS = {
  SMART_BOOT: "SMART BOOT COLLECTION",
  SMART_LIGHT: "SMART LIGHT COLLECTION",
  PULL_BOX: "PULL BOX COLLECTION",
  TABLET: "TABLET LIST",
} as const;

export const COLLECTION_VALUES = Object.values(DEVICE_COLLECTIONS) as readonly string[];

export type CollectionValue = typeof COLLECTION_VALUES[number];


export const COLLECTION_TO_DEVICE_TYPE: Record<CollectionValue, DeviceType> = {
  "SMART BOOT COLLECTION": "SMART BOOT",
  "SMART LIGHT COLLECTION": "SMART LIGHT",
  "PULL BOX COLLECTION": "PULL BOX",
  "TABLET LIST": "TABLET",
};


export function getDeviceType(collectionName: string): DeviceType {
  return COLLECTION_TO_DEVICE_TYPE[collectionName as CollectionValue] ?? "UNKNOWN";
}