import { DeviceDetails } from "@/shared/types/device";
import { Facility, RoomDetails, ZoneDetails } from "@/shared/types/facility";
import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export interface SecurityAlertData {
  schoolDetails: Facility | null;
  zoneDetails: ZoneDetails | null;
  roomDetails: RoomDetails | null;
  devices: DeviceDetails[];
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
  const [error, setError] = useState<string>("");

  const getSecurityAlertDetails = useCallback(async () => {
    setIsLoading(true);

    try {
      // Construct the path to the facility
      const facilityRef = firestore()
        .collection("STATES")
        .doc("MI")
        .collection("ZIP CODES")
        .doc(zipCode)
        .collection("FACILITY NAME")
        .doc(schoolId);

      // Fetch school details
      const schoolDoc = await facilityRef.get();
      let schoolDetails: Facility | null = null;

      if (schoolDoc.exists()) {
        const schoolData = schoolDoc.data();
        schoolDetails = {
          name: schoolData?.name || "",
          schoolId: schoolData?.schoolId || "",
          district: schoolData?.district || "",
          zip: schoolData?.zip || "",
          stateCode: schoolData?.stateCode || "",
          createdAt: schoolData?.createdAt?.toDate() || new Date(),
          updatedAt: schoolData?.updatedAt?.toDate() || new Date(),
        };
      }

      // Fetch ZONE1-GREEN details
      const zoneRef = facilityRef.collection("ZONES").doc("ZONE1-GREEN");
      const zoneDoc = await zoneRef.get();
      let zoneDetails: ZoneDetails | null = null;

      if (zoneDoc.exists()) {
        const zoneData = zoneDoc.data();
        zoneDetails = {
          name: zoneData?.name || "",
          color: zoneData?.color || "",
          createdAt: zoneData?.createdAt?.toDate() || new Date(),
          updatedAt: zoneData?.updatedAt?.toDate() || new Date(),
        };
      }

      // Fetch ADMIN_OFFICE room details
      const roomRef = zoneRef.collection("ROOMS").doc("ADMIN_OFFICE");
      const roomDoc = await roomRef.get();
      let roomDetails: RoomDetails | null = null;

      if (roomDoc.exists()) {
        const roomData = roomDoc.data();
        roomDetails = {
          name: roomData?.name || "",
          roomId: roomData?.roomId || "",
          createdAt: roomData?.createdAt?.toDate() || new Date(),
          updatedAt: roomData?.updatedAt?.toDate() || new Date(),
        };
      }

      // Fetch all devices under ADMIN_OFFICE
      const devicesSnapshot = await roomRef.collection("DEVICES").get();
      const devices: DeviceDetails[] = devicesSnapshot.docs.map(doc => {
        const deviceData = doc.data();
        return {
          deviceId: deviceData.deviceId || "",
          securityStatus: deviceData.securityStatus || "",
          deviceHealthStatus: deviceData.deviceHealthStatus || "",
          createdAt: deviceData.createdAt?.toDate() || new Date(),
          updatedAt: deviceData.updatedAt?.toDate() || new Date(),
        };
      });

      setData({
        schoolDetails,
        zoneDetails,
        roomDetails,
        devices,
      });
      setError("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [schoolId, zipCode]);

  useEffect(() => {
    getSecurityAlertDetails();
  }, [getSecurityAlertDetails]);

  return { data, isLoading, error, refetch: getSecurityAlertDetails };
};
