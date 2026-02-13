import {
  collection,
  getDocs,
  getFirestore
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useGetZipcodes = (stateCode?: string) => {
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!stateCode) return;

    const fetchZips = async () => {
      setIsLoading(true);
      const db = getFirestore();

      const zipRef = collection(db, "DATA", stateCode, "ZIP CODES");
      const snap = await getDocs(zipRef);
      console.warn("Fetched zip codes:", zipRef);

      setZipCodes(snap.docs.map((doc: { id: any; }) => doc.id));
      setIsLoading(false);
    };

    fetchZips();
  }, [stateCode]);

  return { zipCodes, isLoading };
};
