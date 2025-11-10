import { getDatabase, onValue, ref } from "@react-native-firebase/database";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

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
  const isInitialLoad = useRef(true);

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
    if (alert && !isInitialLoad.current) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Device Health Alert",
          body: `Your device's (${alert.deviceId}) health status has changed to ${alert.deviceHealth}`,
          data: { telemetry: alert },
        },
        trigger: null,
      });

      setLastAlertId(alert.alertId);
    }

    if (alert && isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [alert, setLastAlertId]);
};
