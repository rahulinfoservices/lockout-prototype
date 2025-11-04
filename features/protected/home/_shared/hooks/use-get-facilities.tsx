import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export interface Facility {
  id: string;
  name: string;
  zip: string;
  district: string;
  stateCode: string;
}

// Fetch all facilities under MI state
export const useGetFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
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

      const allFacilities: Facility[] = [];

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

        // Add each facility to the array
        facilityNamesSnapshot.docs.forEach(facilityDoc => {
          const facilityData = facilityDoc.data();
          allFacilities.push({
            id: facilityDoc.id,
            name: facilityData.name || facilityDoc.id,
            zip: facilityData.zip || zipCode,
            district: facilityData.district || "",
            stateCode: facilityData.stateCode || "MI",
          });
        });
      }

      setFacilities(allFacilities);
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
