// stores/alertStore.ts
import { create } from "zustand";

import { NullableSecurityAlert } from "../types/alert";

interface AlertState {
  securityAlert: NullableSecurityAlert;
  deviceHealthAlert: NullableSecurityAlert;
  securityError: string;
  deviceHealthError: string;
  lastSecurityAlertId: string | null;
  lastDeviceHealthAlertId: string | null;
  setSecurityAlert: (alert: NullableSecurityAlert) => void;
  setDeviceHealthAlert: (alert: NullableSecurityAlert) => void;
  setSecurityError: (error: string) => void;
  setDeviceHealthError: (error: string) => void;
  setLastSecurityAlertId: (alertId: string | null) => void;
  setLastDeviceHealthAlertId: (alertId: string | null) => void;
  resetAll: () => void;
}

export const useAlertStore = create<AlertState>(set => ({
  securityAlert: null,
  deviceHealthAlert: null,
  securityError: "",
  deviceHealthError: "",
  lastSecurityAlertId: null,
  lastDeviceHealthAlertId: null,
  setSecurityAlert: alert => set({ securityAlert: alert }),
  setDeviceHealthAlert: alert => set({ deviceHealthAlert: alert }),
  setSecurityError: error => set({ securityError: error }),
  setDeviceHealthError: error => set({ deviceHealthError: error }),
  setLastSecurityAlertId: alertId => set({ lastSecurityAlertId: alertId }),
  setLastDeviceHealthAlertId: alertId =>
    set({ lastDeviceHealthAlertId: alertId }),
  resetAll: () =>
    set({
      securityAlert: null,
      deviceHealthAlert: null,
      securityError: "",
      deviceHealthError: "",
      lastSecurityAlertId: null,
      lastDeviceHealthAlertId: null,
    }),
}));
