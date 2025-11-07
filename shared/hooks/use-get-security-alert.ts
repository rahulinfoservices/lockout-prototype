import database from "@react-native-firebase/database";
import { useEffect, useState } from "react";

import { SecurityAlert } from "@/shared/types/security-alert";

export const useGetSecurityAlert = () => {
  const [alert, setAlert] = useState<SecurityAlert | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch security alert
  useEffect(() => {
    // Reference to this specific facility's alerts
    const alertsRef = database().ref(
      `ALERTS/MI/FACILITIES/MI_49340_ST-MICHAEL-ES`,
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
  }, []);

  return {
    alert,
    error,
  };
};
