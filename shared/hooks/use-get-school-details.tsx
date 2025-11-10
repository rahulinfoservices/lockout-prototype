import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { DeviceDetailsData, DeviceDetailsDocument } from "../types/device";
import {
  FacilityData,
  FacilityDocument,
  RoomDetailsData,
  RoomDetailsDocument,
  ZoneDetailsData,
  ZoneDetailsDocument,
} from "../types/facility";

export interface SecurityAlertData {
  schoolDetails: FacilityData | null;
  zoneDetails: ZoneDetailsData | null;
  roomDetails: RoomDetailsData | null;
  devices: DeviceDetailsData[];
}

export const useGetSecurityAlertDetails = (
  schoolId: string,
  zipCode: string,
) => {
  const [data, setData] = useState<SecurityAlertData>({
    schoolDetails: null,
    zoneDetails: null,
    roomDetails: null,
    devices: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getSecurityAlertDetails = useCallback(async () => {
    setIsLoading(true);

    try {
      const db = getFirestore();

      const schoolRef = doc(
        collection(
          doc(
            collection(doc(collection(db, "STATES"), "MI"), "ZIP CODES"),
            zipCode,
          ),
          "FACILITY NAME",
        ),
        schoolId,
      );

      const schoolDoc = await getDoc<FacilityDocument>(schoolRef);

      let schoolDetails: FacilityData | null = null;
      if (schoolDoc.exists()) {
        const d = schoolDoc.data();
        schoolDetails = {
          name: d?.name ?? "",
          schoolId: d?.schoolId ?? "",
          district: d?.district ?? "",
          zip: d?.zip ?? "",
          stateCode: d?.stateCode ?? "",
          createdAt: d?.createdAt.toDate() ?? new Date(),
          updatedAt: d?.updatedAt.toDate() ?? new Date(),
          fullName: d?.fullName ?? "",
          address: d?.address ?? "",
          phone: d?.phone ?? "",
        };
      }

      const zoneRef = doc(collection(schoolRef, "ZONES"), "ZONE1-GREEN");
      const zoneDoc = await getDoc<ZoneDetailsDocument>(zoneRef);

      let zoneDetails: ZoneDetailsData | null = null;
      if (zoneDoc.exists()) {
        const z = zoneDoc.data();
        zoneDetails = {
          name: z?.name ?? "",
          color: z?.color ?? "",
          createdAt: z?.createdAt.toDate() ?? new Date(),
          updatedAt: z?.updatedAt.toDate() ?? new Date(),
        };
      }

      const roomRef = doc(collection(zoneRef, "ROOMS"), "ADMIN_OFFICE");
      const roomDoc = await getDoc<RoomDetailsDocument>(roomRef);

      let roomDetails: RoomDetailsData | null = null;
      if (roomDoc.exists()) {
        const r = roomDoc.data();
        roomDetails = {
          name: r?.name ?? "",
          roomId: r?.roomId ?? "",
          createdAt: r?.createdAt.toDate() ?? new Date(),
          updatedAt: r?.updatedAt.toDate() ?? new Date(),
        };
      }

      const devicesSnapshot: FirebaseFirestoreTypes.QuerySnapshot<DeviceDetailsDocument> =
        await getDocs(collection(roomRef, "DEVICES"));
      const devices: DeviceDetailsData[] = devicesSnapshot.docs.map(d => {
        const v = d.data();
        return {
          deviceId: v.deviceId ?? "",
          securityStatus: v.securityStatus ?? "",
          deviceHealthStatus: v.deviceHealthStatus ?? "",
          createdAt: v.createdAt.toDate() ?? new Date(),
          updatedAt: v.updatedAt.toDate() ?? new Date(),
        };
      });

      setData({ schoolDetails, zoneDetails, roomDetails, devices });
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [schoolId, zipCode]);

  useEffect(() => {
    getSecurityAlertDetails();
  }, [getSecurityAlertDetails]);

  return { data, isLoading, error, refetch: getSecurityAlertDetails };
};
