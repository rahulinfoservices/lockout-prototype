import { SecurityAlert } from "@/shared/types/alert";
import { DeviceDetails } from "@/shared/types/device";

export const sortDeviceListByAlertType = (
  deviceList: DeviceDetails[],
  alert: SecurityAlert,
) => {
  return deviceList.sort((a, b) => {
    const isAMatchingAlert =
      a.deviceId === alert.deviceId && alert.alertType === "full_lockdown_mode";
    const isBMatchingAlert =
      b.deviceId === alert.deviceId && alert.alertType === "full_lockdown_mode";

    if (isAMatchingAlert) return -1;
    if (isBMatchingAlert) return 1;
    return 0;
  });
};
