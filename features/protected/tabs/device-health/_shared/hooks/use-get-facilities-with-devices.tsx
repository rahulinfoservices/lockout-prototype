import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { Device } from "@/shared/types/device";
import { FacilityWithDevices } from "@/shared/types/facility";

// Fetch all facilities with their devices, sorted by priority (Tampered > Low Battery > Online)
export const useGetFacilitiesWithDevices = () => {
  const [facilities, setFacilities] = useState<FacilityWithDevices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const getFacilities = useCallback(async () => {
    setIsLoading(true);

    try {
      const facilitiesSnapshot = await firestore()
        .collection("STATES")
        .doc("MI")
        .collection("ZIP CODES")
        .get();

      const allFacilities: FacilityWithDevices[] = [];

      // Iterate through each zip code document
      for (const zipDoc of facilitiesSnapshot.docs) {
        const zipCode = zipDoc.id;

        // Get all facilities under this zip code
        const facilityNamesSnapshot = await firestore()
          .collection("STATES")
          .doc("MI")
          .collection("ZIP CODES")
          .doc(zipCode)
          .collection("FACILITY NAME")
          .get();

        // Process each facility
        for (const facilityDoc of facilityNamesSnapshot.docs) {
          const facilityData = facilityDoc.data();

          // Get devices for this facility
          const devicesSnapshot = await firestore()
            .collection("STATES")
            .doc("MI")
            .collection("ZIP CODES")
            .doc(zipCode)
            .collection("FACILITY NAME")
            .doc(facilityDoc.id)
            .collection("DEVICES")
            .get();

          const devices: Device[] = devicesSnapshot.docs.map(deviceDoc => {
            const deviceData = deviceDoc.data();
            return {
              id: deviceDoc.id,
              name: deviceData.name || deviceDoc.id,
              type: deviceData.type || "",
              status: deviceData.status || "Online",
            };
          });

          // Check if facility has any issues
          const hasTampered = devices.some(d => d.status === "Tampered");
          const hasLowBattery = devices.some(d => d.status === "Low Battery");
          const hasIssues = hasTampered || hasLowBattery;

          allFacilities.push({
            id: facilityDoc.id,
            name: facilityData.name || facilityDoc.id,
            zip: facilityData.zip || zipCode,
            district: facilityData.district || "",
            stateCode: facilityData.stateCode || "MI",
            devices,
            hasIssues,
            hasTampered,
            hasLowBattery,
          });
        }
      }

      // Sort facilities: Tampered first, then Low Battery, then Online
      const sortedFacilities = allFacilities.sort((a, b) => {
        if (a.hasTampered && !b.hasTampered) return -1;
        if (!a.hasTampered && b.hasTampered) return 1;
        if (a.hasLowBattery && !b.hasLowBattery) return -1;
        if (!a.hasLowBattery && b.hasLowBattery) return 1;
        return 0;
      });

      setFacilities(sortedFacilities);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFacilities();
  }, [getFacilities]);

  return { facilities, isLoading, error };
};
