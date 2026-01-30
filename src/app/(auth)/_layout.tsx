import { useAuthStore } from "@/stores/authStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
