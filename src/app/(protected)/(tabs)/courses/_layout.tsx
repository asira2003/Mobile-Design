import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function CoursesLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
        },
        headerTitleStyle: {
          color: isDark ? "#ffffff" : "#007e2e",
          fontWeight: "bold",
          fontSize: 24,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Courses",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
