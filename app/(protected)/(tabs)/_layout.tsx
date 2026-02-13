import { Tabs } from "expo-router";
import { BookDown, Settings, ShieldAlert } from "lucide-react-native";

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
          title: "Facility",
          tabBarLabel: "Facility",
          tabBarIcon: ({ color, size }) => (
            <ShieldAlert size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="device-health"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
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
