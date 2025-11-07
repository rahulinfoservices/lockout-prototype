import database from "@react-native-firebase/database";
import { useEffect, useState } from "react";

import { AlertCategory, NullableSecurityAlert } from "@/shared/types/alert";

export const useGetAlert = (alertCategory: AlertCategory) => {
  const [alert, setAlert] = useState<NullableSecurityAlert>(null);
  const [error, setError] = useState<string>("");

  // Fetch security alert
  useEffect(() => {
    // Reference to this specific facility's alerts
    const alertsRef = database().ref(
      `${alertCategory}/MI/FACILITIES/MI_49340_ST-MICHAEL-ES`,
    );

    const onValueChange = alertsRef.on(
      "value",
      snapshot => {
        const data = snapshot.val();
        setAlert(data);

        // setAlert(alertsList);
        setError("");
      },
      err => {
        setError(err.message);
      },
    );

    // Cleanup subscription on unmount
    return () => {
      alertsRef.off("value", onValueChange);
    };
  }, [alertCategory]);

  return {
    alert,
    error,
  };
};
