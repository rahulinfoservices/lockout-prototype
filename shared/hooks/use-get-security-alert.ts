import { getDatabase, onValue, ref } from "@react-native-firebase/database";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

import { useAlertStore } from "../stores/use-alert-store";
import { SecurityAlert } from "../types/alert";

export const useGetSecurityAlert = () => {
  const alert = useAlertStore(state => state.securityAlert);
  // const lastAlertId = useAlertStore(state => state.lastSecurityAlertId);
  const setAlert = useAlertStore(state => state.setSecurityAlert);
  const setError = useAlertStore(state => state.setSecurityError);
  const setLastAlertId = useAlertStore(state => state.setLastSecurityAlertId);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const db = getDatabase();
    const alertsRef = ref(db, "ALERTS/MI/FACILITIES/MI_49340_ST-MICHAEL-ES");

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
          title: "Security Alert",
          body: alert.description,
          data: { alert },
          sound:
            alert.alertType === "full_lockdown_mode"
              ? "full_lockdown.wav"
              : "all_clear.wav",
        },
        trigger: {
          channelId:
            alert.alertType === "full_lockdown_mode"
              ? "security-full-lockdown"
              : "security-all-clear",
        },
      });

      setLastAlertId(alert.alertId);
    }

    if (alert && isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [alert, setLastAlertId]);
};
