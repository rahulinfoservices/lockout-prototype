import { Tabs } from "expo-router";
import { Activity, ShieldAlert } from "lucide-react-native";

export default function ProtectedLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tabs.Screen
        name="device-health/index"
        options={{
          title: "Device Health",
          tabBarLabel: "Device Health",
          tabBarIcon: ({ color, size }) => (
            <Activity size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="security-alerts/index"
        options={{
          title: "Security Alerts",
          tabBarLabel: "Security Alerts",
          tabBarIcon: ({ color, size }) => (
            <ShieldAlert size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
