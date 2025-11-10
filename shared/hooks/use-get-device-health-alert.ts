import { getDatabase, onValue, ref } from "@react-native-firebase/database";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

import { useAlertStore } from "../stores/use-alert-store";
import { SecurityAlert } from "../types/alert";

export const useGetDeviceHealthAlert = () => {
  const alert = useAlertStore(state => state.deviceHealthAlert);
  // const lastAlertId = useAlertStore(state => state.lastDeviceHealthAlertId);
  const setAlert = useAlertStore(state => state.setDeviceHealthAlert);
  const setError = useAlertStore(state => state.setDeviceHealthError);
  const setLastAlertId = useAlertStore(
    state => state.setLastDeviceHealthAlertId,
  );

  useEffect(() => {
    const db = getDatabase();
    const alertsRef = ref(db, "TELEMETRY/MI/FACILITIES/MI_49340_ST-MICHAEL-ES");

    const unsubscribe = onValue(
      alertsRef,
      snapshot => {
        const data: SecurityAlert = snapshot.val();
        setAlert(data);
        setError("");
      },
      err => setError(err.message),
    );

    return () => unsubscribe();
  }, [setAlert, setError]);

  useEffect(() => {
    if (alert) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Device Health Alert",
          body: alert.description,
          data: { alert },
        },
        trigger: null,
      });
      setLastAlertId(alert.alertId);
    }
  }, [alert, setLastAlertId]);
};
