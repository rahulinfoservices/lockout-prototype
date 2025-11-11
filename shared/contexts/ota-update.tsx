import * as Updates from "expo-updates";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
  View,
} from "react-native";

const OTAUpdateContext = createContext(null);

export default function OTAUpdateProvider({ children }: PropsWithChildren) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function onFetchUpdateAsync() {
    if (!__DEV__) {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          Alert.alert(
            "Fresh Update Available! 🎉",
            "We've squashed some bugs and sprinkled in new features. The app will reload to apply these goodies!",
            [
              {
                text: "Okay",
                onPress: async () => {
                  setIsUpdating(true);

                  try {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                  } catch (error) {
                    Alert.alert(
                      "Error fetching the update",
                      (error as Error).message,
                    );
                  } finally {
                    setIsUpdating(false);
                  }
                },
              },
            ],
            { cancelable: false },
          );
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

      {isUpdating ? (
        <View className="absolute top-0 right-0 bottom-0 left-0 z-10 items-center justify-center bg-black opacity-50">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : null}
    </OTAUpdateContext.Provider>
  );
}
