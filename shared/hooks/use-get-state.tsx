import {
  collection,
  getDocs,
  getFirestore
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useGetStates = () => {
  const [states, setStates] = useState<string[]>([]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "DATA"));

      const stateList = snap.docs.map((doc: { id: any; }) => doc.id);
      setStates(stateList);
      setIsLoading(false);
    };

    fetchStates();
  }, []);

  return { states, isLoading };
};
