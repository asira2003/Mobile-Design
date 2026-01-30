import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  const appTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "#25d366",
    },
  };

  return (
    <ThemeProvider value={appTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
