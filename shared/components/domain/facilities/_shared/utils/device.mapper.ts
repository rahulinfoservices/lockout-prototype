

import { DeviceDetails, getDeviceType } from "@/shared/types/device";



export function mapFirestoreToDevice(
  data: any,
  collectionName: string
): DeviceDetails {
  const deviceType = getDeviceType(collectionName);

  if (deviceType === "TABLET") {
    const name = data.name ?? "";
    const type = data.type ?? "";

    return {
      deviceId: sanitizeId(`${name}${type}`),
      deviceType,
      name,
      type,
      date: data.date ?? "",
      status: data.status ?? "",
     
      securityStatus: data.securityStatus ?? "normal",
      deviceHealthStatus: data.deviceHealthStatus ?? "",
  
    };
  }

  // Non-tablet devices
  const mac = data.mac ?? "";

  return {
    deviceId: sanitizeId(mac),
    deviceType,
    mac,
    location: data.location,
    zone: data.zone,
    encoding: data.encoding,
    securityStatus: data.securityStatus ?? "normal",
    deviceHealthStatus: data.deviceHealthStatus ?? "",
    date: data.date ?? "",
    status: data.status ?? "",
  
  };
}

function sanitizeId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

