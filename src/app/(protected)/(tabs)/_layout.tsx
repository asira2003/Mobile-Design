import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons/";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        },
        headerTitleStyle: {
          color: isDark ? "#ffffff" : "#007e2e",
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Learn",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book-open" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="graduation-cap" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="envelope" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
