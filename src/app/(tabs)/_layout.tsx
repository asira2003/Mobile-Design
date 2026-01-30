import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons/";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Learn",
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
