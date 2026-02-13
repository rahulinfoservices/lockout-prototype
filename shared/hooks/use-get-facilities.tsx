import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { FacilityData, FacilityDocument } from "../types/facility";
import { getSecurityAlertByInfoData } from "./use-get-security-alert";

export const useGetFacilities = () => {
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
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

      const allFacilities: FacilityData[] = [];

      for (const zipDoc of facilitiesSnapshot.docs) {
        const zipCode = zipDoc.id;

        const facilityNamesRef = collection(
          doc(statesRef, zipCode),
          "FACILITY NAME",
        );

        const facilitiesNameSnapshot = await getDocs(facilityNamesRef);
        for (const facilitiesName of facilitiesNameSnapshot.docs) {
          const facilitiesNameid = facilitiesName.id;
          // console.warn("Facility Name Doc ID:", facilitiesName.id);

          const facilityDataRef = collection(
            doc(facilityNamesRef, facilitiesNameid),
            "FACILITY DATA",
          );
          // const facilitiesDataSnapshot = await getDocs(facilityDataRef);
          // for (const facilitiesData of facilitiesDataSnapshot.docs)
          // {
          //   const facilitiesDataid = facilitiesData.id;
          //   console.warn("Facility DATA:", facilitiesDataid);
          // }
        }

        const facilityNamesSnapshot: FirebaseFirestoreTypes.QuerySnapshot<FacilityDocument> =
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
            createdAt: facilityData.createdAt.toDate() || new Date(),
            updatedAt: facilityData.updatedAt.toDate() || new Date(),
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

export const useGetFacilitiesDev = () => {
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getFacilities = useCallback(async (stateCode = "MI") => {
    setIsLoading(true);
    const data = [];

    try {
      const db = getFirestore();
      const zipRef = collection(db, "DATA", stateCode, "ZIP CODES");
      const zipSnap = await getDocs(zipRef);
      const allFacilities: FacilityData[] = [];

      await Promise.all(
        zipSnap.docs.map(async (zipDoc: { id: any }) => {
          const zipCode = zipDoc.id;

          const servicesRef = collection(
            db,
            "DATA",
            stateCode,
            "ZIP CODES",
            zipCode,
            "FACILITY NAME",
          );

          const servicesSnap = await getDocs(servicesRef);

          await Promise.all(
            servicesSnap.docs.map(async (serviceDoc: { id: any }) => {
              const serviceName = serviceDoc.id;
              console.warn("serviceName", serviceName);

              const finalRef = doc(
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

              const facilityData = await getDoc(finalRef);
              const infoData = `${stateCode}-${zipCode}_${serviceName
                .trim()
                .replace(/\s+/g, "-")}`;

              const alert = await getSecurityAlertByInfoData(stateCode, infoData);

              // const docRef = doc(
              //   db,
              //   "ALERTS",
              //   stateCode,
              //   "FACILITIES",
              //   infoData,
              // );

              // const docSnap = await getDoc(docRef);
              // if (docSnap.exists()) {
              //   console.warn("document!", infoData);
              //   // console.warn("Document data:", docSnap.data());
              // } else {
              //   console.warn("No such document!", infoData);
              // }

              if (facilityData.exists()) {
                const facilityAllData = facilityData.data();
                // console.warn("facilityAllData", facilityAllData);
                data.push({
                  id: `${zipCode}_${serviceName}`,
                  state: stateCode,
                  zipCode,
                  serviceName,
                  ...facilityAllData,
                });

                allFacilities.push({
                  name:
                    facilityAllData?.facilityInfo.name ||
                    facilityAllData?.facilityInfo.Name ||
                    serviceName,
                  zip: zipCode,
                  district: facilityAllData?.dispatch.districtName || "",
                  stateCode: facilityAllData?.facilityInfo.state,
                  schoolId: `${serviceName}`,
                  fullName: "",
                  address: facilityAllData?.facilityInfo.street || "",
                  phone: facilityAllData?.facilityInfo.phone || "",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  alert: alert,
                });
              } else {
                console.warn(" No facility data found for ", serviceName);
                const finalRefTemp = doc(
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

                const facilityData = await getDoc(finalRefTemp);

                if (facilityData.exists()) {
                  const facilityAllData = facilityData.data();
                  // console.warn("facilityAllData", facilityAllData);
                  data.push({
                    id: `${zipCode}_${serviceName}`,
                    state: stateCode,
                    zipCode,
                    serviceName,
                    ...facilityAllData,
                  });

                  allFacilities.push({
                    name:
                      facilityAllData?.facilityInfo.name ||
                      facilityAllData?.facilityInfo.Name ||
                      serviceName,
                    zip: zipCode,
                    district: facilityAllData?.dispatch.districtName || "",
                    stateCode: facilityAllData?.facilityInfo.state,
                    schoolId: ` ${serviceName}`,
                    fullName: "",
                    address: facilityAllData?.facilityInfo.street || "",
                    phone: facilityAllData?.facilityInfo.phone || "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    alert: alert ? alert : null,
                  });
                }
              }
            }),
          );
        }),
      );

      console.warn("Fetched facilities data:", allFacilities);
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

export const useFacilities = (stateCode?: string, zipCode?: string) => {
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const formatAddress = (...parts: (string | null | undefined)[]) =>
  parts
    .filter(p => typeof p === "string" && p.trim())
    .join(", ");

  const getFacilityDoc = async (
    db: any,
    stateCode: string,
    zipCode: string,
    serviceName: string,
  ) => {
    /** 1️⃣ Correct path */
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

    /** 2️⃣ Misspelled path fallback */
    const typoRef = doc(
      db,
      "DATA",
      stateCode,
      "ZIP CODES",
      zipCode,
      "FACILITY NAME",
      serviceName,
      "FACILTY DATA", // ❌ typo handled
      "DATA",
    );

    const typoSnap = await getDoc(typoRef);
    if (typoSnap.exists()) return typoSnap.data();

    return null;
  };

  const fetchFacilities = useCallback(async () => {
    if (!stateCode || !zipCode) return;

    setIsLoading(true);
    setError("");
    const list: FacilityData[] = [];

    try {
      const db = getFirestore();

      const servicesRef = collection(
        db,
        "DATA",
        stateCode,
        "ZIP CODES",
        zipCode,
        "FACILITY NAME",
      );

      const servicesSnap = await getDocs(servicesRef);

      for (const serviceDoc of servicesSnap.docs) {
        const serviceName = serviceDoc.id;

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
          continue;
        }

        const infoData = `${stateCode}-${zipCode}_${serviceName
          .trim()
          .replace(/\s+/g, "-")}`;

        const alert = await getSecurityAlertByInfoData(stateCode, infoData);

        // const docRef = doc(db, "ALERTS", stateCode, "FACILITIES", INFODATA);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   console.warn("document!", INFODATA);
        //   // console.warn("Document data:", docSnap.data());
        // } else {
        //   console.warn("No such document!", INFODATA);
        // }

const address = formatAddress(
  facilityData?.facilityInfo?.street,
  facilityData?.facilityInfo?.city,
  facilityData?.facilityInfo?.state,
  facilityData?.facilityInfo?.zipcode
);


        list.push({
          name:
            facilityData?.facilityInfo?.name ||
            facilityData?.facilityInfo?.Name ||
            serviceName,
          zip: zipCode,
          district: facilityData?.dispatch?.districtName || "",
          stateCode: stateCode,
          schoolId: serviceName,
          fullName: "",
          address: address,
          phone: facilityData?.facilityInfo?.phone || "",
           state: facilityData?.facilityInfo?.state || "",
            street: facilityData?.facilityInfo?.street || "",
             zipcode: facilityData?.facilityInfo?.zipcode || "",
          createdAt: new Date(),
          updatedAt: new Date(),
          alert: alert
                      ? alert
                      : null,
            directContacts: facilityData?.directContacts || null,
        });
      }

      setFacilities(list);
    } catch (err) {
      setError((err as Error).message);
      
    } finally {
      setIsLoading(false);
    }
  }, [stateCode, zipCode]);

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  return {
    facilities,
    isLoading,
    error,
  };
};
