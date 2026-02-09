import { Tabs, usePathname } from "expo-router";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons/";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const pathname = usePathname();
  const [statusBarStyle, setStatusBarStyle] = useState<
    "light" | "dark" | "auto"
  >("auto");

  useEffect(() => {
    if (pathname === "/") {
      setStatusBarStyle("light");
    } else {
      setStatusBarStyle(isDark ? "light" : "dark");
    }
  }, [pathname, isDark]);

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
          },
          headerTitleStyle: {
            color: isDark ? "#ffffff" : "#007e2e",
            fontSize: 24,
            fontWeight: "bold",
          },
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
            borderTopWidth: 1,
            borderTopColor: isDark ? "#333" : "#e0e0e0",
            elevation: 0,
            shadowOpacity: 0,
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
            headerShown: false,
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
    </>
  );
}
