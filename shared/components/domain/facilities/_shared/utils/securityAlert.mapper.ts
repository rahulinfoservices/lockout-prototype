// firestore/mappers/securityAlert.mapper.ts
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { NullableSecurityAlert } from "@/shared/types/alert";

export const mapDocToSecurityAlert = (
  snap: FirebaseFirestoreTypes.DocumentSnapshot
): NullableSecurityAlert => {
  if (!snap.exists) return null;

  const d: any = snap.data();

  return {
    alertId: snap.id,

    alertType: d?.alertType,
    description: d?.description,

    deviceHealth: d?.deviceHealth,
    deviceId: d?.deviceId,
    deviceType: d?.deviceType,

    district: d?.district,
    facility: d?.facility,
    facility_from: d?.facility_from,

    lat: d?.lat,
    lon: d?.lon,

    messageType: d?.messageType,
    notificationSentToSOS: d?.notificationSentToSOS,

    roomId: d?.roomId,
    schoolId: d?.schoolId,
    schoolStatus: d?.schoolStatus,
    zipCode: d?.zipCode,

    ts: d?.ts?.toDate?.(),

    alert: d?.alert,
    dispatch: d?.dispatch,
    handled: d?.handled,

    location: d?.location,
    time: d?.time,
    type: d?.type,
    username: d?.username,
    zone: d?.zone,
  };
};
