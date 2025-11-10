import { NullableSecurityAlert } from "@/shared/types/alert";
import { FacilityData } from "@/shared/types/facility";

export const getSortedFacilitiesByAlertType = (
  facilities: FacilityData[],
  alert: NullableSecurityAlert,
) => {
  return facilities.sort((a, b) => {
    const isAMatchingAlert =
      a.schoolId === alert?.schoolId &&
      alert.alertType === "full_lockdown_mode";
    const isBMatchingAlert =
      b.schoolId === alert?.schoolId &&
      alert.alertType === "full_lockdown_mode";

    if (isAMatchingAlert) return -1;
    if (isBMatchingAlert) return 1;
    return 0;
  });
};

export const getSortedFacilitiesByDeviceHealth = (
  facilities: FacilityData[],
  alert: NullableSecurityAlert,
) => {
  return facilities.sort((a, b) => {
    const getHealthPriority = (schoolId: string) => {
      if (schoolId !== alert?.schoolId) return 3;

      if (alert.deviceHealth === "Offline") return 0;
      if (alert.deviceHealth === "LowBat") return 1;
      return 2; // Online
    };

    return getHealthPriority(a.schoolId) - getHealthPriority(b.schoolId);
  });
};
