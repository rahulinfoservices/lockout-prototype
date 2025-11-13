import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Lockout Demo",
  slug: "lockout-prototype",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "lockoutprototype",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.lockout.prototype",
    googleServicesFile:
      process.env.GOOGLE_SERVICES_PLIST ?? "./GoogleService-Info.plist",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.lockout.prototype",
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-notifications",
      {
        icon: "./assets/images/logo/lockoutusa_icon.png",
        color: "#fff",
        sounds: [
          "./assets/sounds/all_clear.wav",
          "./assets/sounds/full_lockdown.wav",
          "./assets/sounds/low_battery.wav",
          "./assets/sounds/offline.wav",
          "./assets/sounds/online.wav",
        ],
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    "@react-native-firebase/crashlytics",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
          buildReactNativeFromSource: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "21568fe3-5a72-4358-a677-4b9b59bf93df",
    },
  },
  owner: "infoservices",
  updates: {
    url: "https://u.expo.dev/21568fe3-5a72-4358-a677-4b9b59bf93df",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
});
