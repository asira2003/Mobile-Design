import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import { use, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

export default function LoginPage() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      Alert.alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Loading..." : "Login"}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#142214" : "#F9FAFB",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#059439",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginBottom: 32,
      textAlign: "center",
    },
    form: {
      gap: 16,
    },
    input: {
      backgroundColor: isDark ? "#37513e" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#4b6357" : "#E5E7EB",
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#000000",
    },
    loginButton: {
      backgroundColor: "#10b956",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
    },
    loginButtonText: {
      color: isDark ? "#000000" : "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 16,
    },
    signupText: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      fontSize: 14,
    },
    signupLink: {
      color: isDark ? "#10B981" : "#10B981",
      fontSize: 14,
      fontWeight: "600",
    },
  });
