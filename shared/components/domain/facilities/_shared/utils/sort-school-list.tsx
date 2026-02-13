import { NullableSecurityAlert } from "@/shared/types/alert";
import { FacilityData } from "@/shared/types/facility";

const PRIORITY_ALERT_IDS = new Set([408, 409,407, 45,402,469,417]);

export const getSortedFacilitiesByAlertTypeRealTimeDb = (
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

export const getSortedFacilitiesByAlertType = (
  facilities: FacilityData[],
  alert?: NullableSecurityAlert 
): FacilityData[] => {
 return [...facilities].sort((a, b) => {
    const aPriority =
      PRIORITY_ALERT_IDS.has(Number(a?.alert?.alert));

    const bPriority =
      PRIORITY_ALERT_IDS.has(Number(b?.alert?.alert));

    // Priority alerts first
    if (aPriority && !bPriority) return -1;
    if (!aPriority && bPriority) return 1;

    // Keep original order otherwise
    return 0;
  })
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
