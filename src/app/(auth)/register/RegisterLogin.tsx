import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function RegisterFinal() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>You’re almost in!</Text>
        <Text style={styles.subtitle}>Create your login details</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value=""
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value=""
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Re-enter Password"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value=""
            autoCapitalize="none"
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
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
      color: isDark ? "#FFFFFF" : "#059439",
    },
    loginButton: {
      backgroundColor: "#10b956",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
    },
    loginButtonText: {
      color: "#FFFFFF",
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
      color: "#10B981",
      fontSize: 14,
      fontWeight: "600",
    },
  });
