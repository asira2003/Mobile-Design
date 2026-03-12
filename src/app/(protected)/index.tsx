import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const interests: { id: string; title: string; icon: any }[] = [
  { id: "TP-01", title: "Technology", icon: "laptop-outline" },
  { id: "TP-02", title: "Fashion", icon: "heart-outline" },
  { id: "TP-03", title: "Food", icon: "restaurant-outline" },
  { id: "TP-04", title: "Travel", icon: "airplane-outline" },
  { id: "TP-05", title: "Sports", icon: "trophy-outline" },
  { id: "TP-06", title: "Music", icon: "musical-notes-outline" },
  { id: "TP-07", title: "Art", icon: "color-palette-outline" },
  { id: "TP-08", title: "Gaming", icon: "game-controller-outline" },
  { id: "TP-09", title: "Fitness", icon: "barbell-outline" },
  { id: "TP-10", title: "Photography", icon: "camera-outline" },
];

export default function CourseSelectScreen() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(["TP-01"]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  const toggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Your Interests</Text>
        <Text style={styles.subtitle}>
          Select your interests to personalize your experience
        </Text>

        <View style={styles.grid}>
          {interests.map((item) => {
            const isSelected = selectedCourses.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggleCourse(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon}
                  size={34}
                  color={
                    isSelected ? "#16a34a" : isDark ? "#9CA3AF" : "#374151"
                  }
                />
                <Text
                  style={[
                    styles.cardLabel,
                    isSelected && styles.cardLabelSelected,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/(protected)/(tabs)")}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#0F0F0F" : "#FFFFFF",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 28,
      paddingBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: isDark ? "#F9FAFB" : "#111827",
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginBottom: 28,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    card: {
      width: "47.5%",
      borderRadius: 14,
      paddingVertical: 26,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      borderWidth: 1.5,
      backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
      borderColor: isDark ? "#2C2C2E" : "#E5E7EB",
    },
    cardSelected: {
      backgroundColor: isDark ? "#001105" : "#F0FDF4",
      borderColor: "#16a34a",
    },
    cardLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? "#D1D5DB" : "#374151",
      textAlign: "center",
    },
    cardLabelSelected: {
      color: "#16a34a",
      fontWeight: "600",
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: isDark ? "#0F0F0F" : "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: isDark ? "#1C1C1E" : "#F3F4F6",
    },
    continueButton: {
      backgroundColor: "#16a34a",
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: "center",
    },
    continueButtonText: {
      color: isDark ? "#000000" : "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
