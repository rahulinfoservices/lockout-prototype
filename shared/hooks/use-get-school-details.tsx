import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { mapFirestoreToDevice } from "../components/domain/facilities/_shared/utils/device.mapper";
import { DeviceDetailsData, DeviceDetailsDocument } from "../types/device";
import {
  FacilityData,
  FacilityDocument,
  RoomDetailsData,
  RoomDetailsDocument,
  ZoneDetailsData,
  ZoneDetailsDocument,
} from "../types/facility";
import { getSecurityAlertByInfoData } from "./use-get-security-alert";

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

export const useGetSecurityAlertDetailsData = (
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
  let zoneDetails: ZoneDetailsData | null = null;
  let roomDetails: RoomDetailsData | null = null;
  const devices: DeviceDetailsData[] = [];
  const formatAddress = (...parts: (string | null | undefined)[]) =>
    parts.filter(p => typeof p === "string" && p.trim()).join(", ");

  const getFacilityDoc = async (
    db: any,
    stateCode: string,
    zipCode: string,
    serviceName: string,
  ) => {
    const correctRef = doc(
      db,
      "DATA",
      stateCode,
      "ZIP CODES",
      zipCode,
      "FACILITY NAME",
      serviceName,
      "FACILITY DATA",
      "DATA",
    );

    const correctSnap = await getDoc(correctRef);
    if (correctSnap.exists()) return correctSnap.data();

    const typoRef = doc(
      db,
      "DATA",
      stateCode,
      "ZIP CODES",
      zipCode,
      "FACILITY NAME",
      serviceName,
      "FACILTY DATA",
      "DATA",
    );

    const typoSnap = await getDoc(typoRef);
    if (typoSnap.exists()) return typoSnap.data();

    return null;
  };

  const fetchFacilities = async (
    stateCode: string,
    zipCode: string,
    serviceName: string,
  ) => {
    const db = getFirestore();

    const facilityData = await getFacilityDoc(
      db,
      stateCode,
      zipCode,
      serviceName,
    );

    if (!facilityData) {
      console.warn(
        `No facility data found for ${stateCode} ${zipCode} ${serviceName}`,
      );
    }

    const infoData = `${stateCode}-${zipCode}_${serviceName
      .trim()
      .replace(/\s+/g, "-")}`;

    const alert = await getSecurityAlertByInfoData(stateCode, infoData);

    const address = formatAddress(
      facilityData?.facilityInfo?.street,
      facilityData?.facilityInfo?.city,
      facilityData?.facilityInfo?.state,
      facilityData?.facilityInfo?.zipcode,
    );

    const facilitiesData: FacilityData = {
      name:
        facilityData?.facilityInfo?.name ||
        facilityData?.facilityInfo?.Name ||
        serviceName,
      zip: zipCode,
      district: facilityData?.dispatch?.districtName || "",
      stateCode: facilityData?.facilityInfo?.state || stateCode,
      schoolId: serviceName,
      fullName: "",
      address: address,
      phone: facilityData?.facilityInfo?.phone || "",
      state: facilityData?.facilityInfo?.state || "",
      street: facilityData?.facilityInfo?.street || "",
      zipcode: facilityData?.facilityInfo?.zipcode || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      alert: alert ? alert : null,
      directContacts: facilityData?.directContacts || null,
    };

    return facilitiesData;
  };

  const getSecurityAlertDetails = useCallback(async () => {
    setIsLoading(true);

    try {
      const db = getFirestore();

      const schoolRef = doc(
        collection(
          doc(
            collection(doc(collection(db, "DATA"), "MI"), "ZIP CODES"),
            zipCode,
          ),
          "FACILITY NAME",
        ),
        schoolId,
      );

      console.warn(`Finding documents for ${schoolId}  `);
      const subCollections = [
        "SMART BOOT COLLECTION",
        "SMART LIGHT COLLECTION",
        "PULL BOX COLLECTION",
        "TABLET LIST",
      ];

      for (const subName of subCollections) {
        const subColRef = collection(schoolRef, subName);

        const snapshot = await getDocs(subColRef);

        if (snapshot.empty) {
          console.warn(`${subName} does not exist or has no documents`);
          continue;
        }

        console.warn(`Documents in ${subName}:`);

        snapshot.forEach(
          (deviceDoc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
            console.warn(deviceDoc.id, deviceDoc.data());
            const mappedDevice = mapFirestoreToDevice(
              deviceDoc.data(),
              subName,
            );
            devices.push({
              ...mappedDevice,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          },
        );
      }

      const schoolDoc = await getDoc<FacilityDocument>(schoolRef);

      let schoolDetails: FacilityData | null = null;
      schoolDetails = await fetchFacilities("MI", zipCode, schoolId);
      console.warn("Fetched school details:", schoolDetails);
      if (schoolDoc.exists()) {
        const d = schoolDoc.data();
        console.warn("School Document Data:", d);
        // schoolDetails = {
        //   name: d?.name ?? "",
        //   schoolId: d?.schoolId ?? "",
        //   district: d?.district ?? "",
        //   zip: d?.zip ?? "",
        //   stateCode: d?.stateCode ?? "",
        //   createdAt:  new Date(),
        //   updatedAt: new Date(),
        //   fullName: d?.fullName ?? "",
        //   address: d?.address ?? "",
        //   phone: d?.phone ?? "",
        // };

        const address = formatAddress(d?.street, d?.state, d?.zipcode);

        //  schoolDetails = {
        //   name: d?.name ?? "" ,
        //   zip: zipCode,
        //   district: d?.district ?? "",
        //   stateCode: d?.state ?? "",
        //   schoolId: schoolId,
        //   fullName: "",
        //   address: address,
        //   phone: d?.phone ?? "",
        //   state: d?.state ?? "",
        //   street: d?.street ?? "",
        //   zipcode: d?.zipcode ?? "",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),

        //     directContacts: d?.directContacts || null,
        // };
      }

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
