import { router, Tabs } from "expo-router";
import { Activity, BookDown, ShieldAlert } from "lucide-react-native";

export default function ProtectedLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "teal",
        tabBarLabelStyle: { fontSize: 14 },
        popToTopOnBlur: true,
      }}
      backBehavior="order"
    >
      <Tabs.Screen
        name="security-alerts"
        options={{
          title: "Security Alerts",
          tabBarLabel: "Security Alerts",
          tabBarIcon: ({ color, size }) => (
            <ShieldAlert size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="device-health"
        options={{
          title: "Device Health",
          tabBarLabel: "Device Health",
          tabBarIcon: ({ color, size }) => (
            <Activity size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            router.dismissTo("/device-health");
          },
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarLabel: "Report",
          tabBarIcon: ({ color, size }) => (
            <BookDown size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
