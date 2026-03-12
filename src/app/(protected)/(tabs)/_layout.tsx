import { Tabs, usePathname } from "expo-router";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons/";
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
            color: isDark ? "#ffffff" : "#000",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "left",
          },
          headerShadowVisible: false,
          headerTitleAlign: "left",
          tabBarStyle: {
            backgroundColor: isDark ? "#171717" : "#fff",
            borderTopWidth: 0,
            borderColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: isDark ? "#ffffff" : "#000000",
          tabBarInactiveTintColor: "#8E8E93",
          animation: "fade",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Learn",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#000",
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#666",
            tabBarIcon: ({ color }) => (
              <Ionicons name="book" size={24} color={color} />
              //  <Ionicons
              //   name={focused ? "book" : "book-outline"}
              //   size={24}
              //   color={color}
              // />
            ),
          }}
        />
        <Tabs.Screen
          name="courses"
          options={{
            title: "Courses",
            headerShown: true,
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
