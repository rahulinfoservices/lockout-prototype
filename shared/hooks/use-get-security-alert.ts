import { getDatabase, onValue, ref } from "@react-native-firebase/database";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

import {
  AlertCategory,
  NullableSecurityAlert,
  SecurityAlert,
} from "../types/alert";

export const useGetAlert = (alertCategory: AlertCategory) => {
  const [alert, setAlert] = useState<NullableSecurityAlert>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const alertsRef = ref(
      db,
      `${alertCategory}/MI/FACILITIES/MI_49340_ST-MICHAEL-ES`,
    );

    const unsubscribe = onValue(
      alertsRef,
      snapshot => {
        const data: SecurityAlert = snapshot.val();
        setAlert(data);

        Notifications.scheduleNotificationAsync({
          content: {
            title:
              alertCategory === "ALERTS"
                ? "Security Alert"
                : "Device Health Alert",
            body: data.description,
            data:
              alertCategory === "ALERTS"
                ? { alert: data }
                : { telemetry: data },
          },
          trigger: null,
        });

        setError("");
      },
      err => setError(err.message),
    );

    return () => unsubscribe();
  }, [alertCategory]);

  return { alert, error };
};
