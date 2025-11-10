import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { Facility } from "../types/facility";

export const useGetFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getFacilities = useCallback(async () => {
    setIsLoading(true);

    try {
      const db = getFirestore();
      const statesRef = collection(
        doc(collection(db, "STATES"), "MI"),
        "ZIP CODES",
      );

      const facilitiesSnapshot = await getDocs(statesRef);

      const allFacilities: Facility[] = [];

      for (const zipDoc of facilitiesSnapshot.docs) {
        const zipCode = zipDoc.id;

        const facilityNamesRef = collection(
          doc(statesRef, zipCode),
          "FACILITY NAME",
        );

        const facilityNamesSnapshot: FirebaseFirestoreTypes.QuerySnapshot<Facility> =
          await getDocs(facilityNamesRef);

        facilityNamesSnapshot.forEach(facilityDoc => {
          const facilityData = facilityDoc.data();
          allFacilities.push({
            name: facilityData.name || facilityDoc.id,
            zip: facilityData.zip || zipCode,
            district: facilityData.district || "",
            stateCode: facilityData.stateCode || "MI",
            schoolId: facilityData.schoolId || facilityDoc.id,
            fullName: facilityData.fullName || "",
            address: facilityData.address || "",
            phone: facilityData.phone || "",
            createdAt: facilityData.createdAt || new Date(),
            updatedAt: facilityData.updatedAt || new Date(),
          });
        });
      }

      allFacilities.sort((a, b) => {
        if (a.schoolId === "ST MICHAEL-ES") return -1;
        if (b.schoolId === "ST MICHAEL-ES") return 1;
        return a.schoolId.localeCompare(b.schoolId);
      });

      setFacilities(allFacilities);
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFacilities();
  }, [getFacilities]);

  return { facilities, isLoading, error };
};
