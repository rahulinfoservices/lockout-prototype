import { getDatabase, onValue, ref } from "@react-native-firebase/database";
import {
  collectionGroup, doc,
  getDoc,
  getFirestore, onSnapshot,
} from "@react-native-firebase/firestore";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

import { mapDocToSecurityAlert } from "../components/domain/facilities/_shared/utils/securityAlert.mapper";
import { useAlertStore } from "../stores/use-alert-store";
import { NullableSecurityAlert, SecurityAlert } from "../types/alert";

export const useGetSecurityAlertRealDB = () => {
  const alert = useAlertStore(state => state.securityAlert);
  const prevAlert = useRef(alert);
  // const lastAlertId = useAlertStore(state => state.lastSecurityAlertId);
  const setAlert = useAlertStore(state => state.setSecurityAlert);
  const setError = useAlertStore(state => state.setSecurityError);
  const setLastAlertId = useAlertStore(state => state.setLastSecurityAlertId);

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
    if (!!alert && !!prevAlert.current) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Security Alert",
          body: alert.description,
          data: { alert },
          sound:
            alert.alertType === "full_lockdown_mode"
              ? "full_lockdown.wav"
              : "all_clear.wav",
          categoryIdentifier: "security-alerts",
          interruptionLevel: "critical",
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

    if (!!alert && !prevAlert.current) {
      prevAlert.current = alert;
    }
  }, [alert, setLastAlertId]);
};

export const useGetSecurityAlert = () => {
  const alert = useAlertStore(state => state.securityAlert);
  const prevAlert = useRef<NullableSecurityAlert>(null);

  const setAlert = useAlertStore(state => state.setSecurityAlert);
  const setError = useAlertStore(state => state.setSecurityError);
  const setLastAlertId = useAlertStore(state => state.setLastSecurityAlertId);
   const latestByFacilityRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const db = getFirestore();
    const facilitiesGroupRef = collectionGroup(db, "FACILITIES");

    const unsubscribe = onSnapshot(
      facilitiesGroupRef,
      snapshot => {
          console.warn("Facility snapshot alert change detected:", snapshot.metadata);
          if (snapshot.metadata.fromCache) return;
        snapshot.docChanges().forEach(change => {
          console.warn("Facility alert change detected:", change.type, change.doc.id);
          const data: SecurityAlert = mapDocToSecurityAlert(change.doc);
          console.warn("Facility alert data:", data);
          console.warn("Previous alert data:", prevAlert.current);
          console.warn("Latest alert ID for facility:", latestByFacilityRef.current[data.alertId], "latestByFacilityRef:", latestByFacilityRef);


           const facilityId = data.schoolId;

          const lastAlertId = latestByFacilityRef.current[data.alertId];
             if (lastAlertId === data.alertId) return;

          if (change.type === "added" || change.type === "modified") {
            // Update global alert state

            
              setAlert(data);
              setError("");
              console.warn("Facility alert updated:", data.alertId);
              console.warn("Facility prevAlert updated:", prevAlert?.current?.alertId);

           

            // Trigger notification only if alert is new or changed
            if (!prevAlert.current || prevAlert.current.alertId !== data.alertId) {

             
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Security Alert",
                  body: data.description,
                  data: { alert: data },
                  sound: data.alertType === "full_lockdown_mode"
                    ? "full_lockdown.wav"
                    : "all_clear.wav",
                  categoryIdentifier: "security-alerts",
                  interruptionLevel: "critical",
                },
                trigger: null, // immediate
              });

              setLastAlertId(data.alertId);
              prevAlert.current = data;
            }
          }

          if (change.type === "removed") {
            // Optional: handle removed alerts
            console.warn("Facility alert removed:", change.doc.id);
          }
        });
      },
      error => {
        console.error("Error observing facilities:", error);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [setAlert, setError, setLastAlertId]);
};

export const useGetSecurityAlertNew = () => {
  const setAlert = useAlertStore(s => s.setSecurityAlert);
  const setError = useAlertStore(s => s.setSecurityError);
  const setLastAlertId = useAlertStore(s => s.setLastSecurityAlertId);

  /**
   * Track last alert PER FACILITY
   * facilityId -> alertId
   */
  const lastAlertRef = useRef<Record<string, string>>({});

  /**
   * Track last processed update timestamp
   * Prevents duplicate "modified" spam
   */
  const lastProcessedTsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const db = getFirestore();
    const alertsQuery = collectionGroup(db, "FACILITIES");

    const unsubscribe = onSnapshot(
      alertsQuery,
      snapshot => {
        
        // ❌ Ignore local cache updates
        if (snapshot.metadata.fromCache) return;

        snapshot.docChanges().forEach(change => {
               console.warn("Facility alert change detected:", change.type, change.doc.id);
          if (change.type === "removed") return;

          // ❌ Ignore pending local writes
          if (change.doc.metadata.hasPendingWrites) return;

          const data = mapDocToSecurityAlert(change.doc);

          // 🔐 Hard safety guards
          if (!data) return;
          if (!data.alertId) return;

          const facilityId =
            data.schoolId ;

          const currentAlertId = data.alertId;
          const previousAlertId = lastAlertRef.current[facilityId];

          const currentTs =
            data.ts instanceof Date ? data.ts.getTime() : 0;

          const lastProcessedTs =
            lastProcessedTsRef.current[facilityId] ?? 0;

          /**
           * 1️⃣ UI MUST ALWAYS UPDATE
           * Even if notification is skipped
           */
          setAlert(data);

          /**
           * 2️⃣ Dedup logic (enterprise safe)
           */
          const isSameAlert = previousAlertId === currentAlertId;
          const isOldUpdate = currentTs <= lastProcessedTs;

          if (isSameAlert && isOldUpdate) {
            return;
          }

          /**
           * 3️⃣ Notify ONLY when:
           * - New alertId OR
           * - Same alertId but meaningful update
           */
          const shouldNotify =
            !isSameAlert || currentTs > lastProcessedTs;

          if (shouldNotify) {
            // 🔕 Optional: notify only when app is backgrounded
            if (AppState.currentState !== "active") {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Security Alert",
                  body: data.description ?? "New security alert",
                  data: { alert: data },
                  sound:
                    data.alertType === "full_lockdown_mode"
                      ? "full_lockdown.wav"
                      : "all_clear.wav",
                  categoryIdentifier: "security-alerts",
                  interruptionLevel: "critical",
                },
                trigger: null,
              });
            }

            lastAlertRef.current[facilityId] = currentAlertId;
            lastProcessedTsRef.current[facilityId] = currentTs;
            setLastAlertId(currentAlertId);
          }
        });
      },
      error => {
        console.error("Firestore alert listener failed:", error);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);
};


export const getSecurityAlertByInfoData = async (
  stateCode: string,
  infoData: string
): Promise<NullableSecurityAlert> => {
  const db = getFirestore();
  const docRef = doc(db, "ALERTS", stateCode, "FACILITIES", infoData);
  const docSnap = await getDoc(docRef);

  return mapDocToSecurityAlert(docSnap);
};