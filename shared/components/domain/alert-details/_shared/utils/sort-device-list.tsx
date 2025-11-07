import { NullableSecurityAlert } from "@/shared/types/alert";
import { DeviceDetails } from "@/shared/types/device";

export const getSortedDeviceListByAlertType = (
  deviceList: DeviceDetails[],
  alert: NullableSecurityAlert,
) => {
  return deviceList.sort((a, b) => {
    const isAMatchingAlert =
      a.deviceId === alert?.deviceId &&
      alert.alertType === "full_lockdown_mode";
    const isBMatchingAlert =
      b.deviceId === alert?.deviceId &&
      alert.alertType === "full_lockdown_mode";

    if (isAMatchingAlert) return -1;
    if (isBMatchingAlert) return 1;
    return 0;
  });
};

export const getSortedDeviceListByDeviceHealth = (
  deviceList: DeviceDetails[],
  alert: NullableSecurityAlert,
) => {
  return deviceList.sort((a, b) => {
    const getHealthPriority = (deviceId: string) => {
      if (deviceId !== alert?.deviceId) return 3;

      if (alert.deviceHealth === "Offline") return 0;
      if (alert.deviceHealth === "LowBat") return 1;
      return 2; // Online
    };

    return getHealthPriority(a.deviceId) - getHealthPriority(b.deviceId);
  });
};
