import * as Updates from "expo-updates";
import { createContext, PropsWithChildren, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

const OTAUpdateContext = createContext(null);

export default function OTAUpdateProvider({ children }: PropsWithChildren) {
  async function onFetchUpdateAsync() {
    if (!__DEV__) {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        alert(`Error fetching latest Expo update: ${error}`);
      }
    }
  }

  useEffect(() => {
    let currentState = AppState.currentState;

    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        // Background → active
        if (
          currentState.match(/background|inactive/) &&
          nextState === "active"
        ) {
          onFetchUpdateAsync();
        }

        currentState = nextState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <OTAUpdateContext.Provider value={null}>
      {children}
    </OTAUpdateContext.Provider>
  );
}
