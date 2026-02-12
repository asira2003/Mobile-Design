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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function RegisterBirthScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tell us about you</Text>
        <Text style={styles.subtitle}>When’s your birthday?</Text>

        <View style={styles.form}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text
              style={{
                color: birthday
                  ? isDark
                    ? "#fff"
                    : "#059439"
                  : isDark
                    ? "#9CA3AF"
                    : "#6B7280",
              }}
            >
              {birthday ? birthday.toLocaleDateString("en-GB") : "DD/MM/YYYY"}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthday || new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/register/RegisterLogin")}
          >
            <Text style={styles.loginButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.signupLink}>Sign In</Text>
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
