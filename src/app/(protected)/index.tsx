import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import filterTypes from "@assets/data/filterTypes.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const courseIcons: Record<
  string,
  { name: any; library: "ionicons" | "material"; color: string }
> = {
  "TP-01": { name: "nutrition", library: "material", color: "#4CAF50" },
  "TP-02": { name: "barbell", library: "ionicons", color: "#FF9800" },
  "TP-03": { name: "brain", library: "material", color: "#9C27B0" },
  "TP-04": { name: "moon", library: "ionicons", color: "#2196F3" },
  "TP-05": { name: "heart", library: "ionicons", color: "#E91E63" },
  "TP-06": { name: "medical", library: "ionicons", color: "#F44336" },
  "TP-07": { name: "people", library: "ionicons", color: "#FFC107" },
  "TP-08": { name: "restaurant", library: "ionicons", color: "#00BCD4" },
};

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
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose Your Interests</Text>
          <Text style={styles.subtitle}>
            Select courses you'd like to start with
          </Text>
          <Text style={styles.smalltitle}>You'll get access to all course</Text>
          <View style={styles.grid}>
            {filterTypes.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              const iconConfig = courseIcons[course.id];

              return (
                <TouchableOpacity
                  key={course.id}
                  style={[
                    styles.courseCard,
                    isSelected ? styles.selectedCard : styles.unselectedCard,
                  ]}
                  onPress={() => toggleCourse(course.id)}
                >
                  <View style={styles.cardContent}>
                    {iconConfig.library === "ionicons" ? (
                      <Ionicons
                        name={iconConfig.name}
                        size={48}
                        color={iconConfig.color}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={iconConfig.name}
                        size={48}
                        color={iconConfig.color}
                      />
                    )}

                    <Text style={styles.courseTitle}>{course.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push("/(protected)/(tabs)")}
            >
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#000000" : "#F9FAFB",
    },
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000000" : "#F9FAFB",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
      marginBottom: 10,
      textAlign: "center",
    },
    smalltitle: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginBottom: 32,
      textAlign: "center",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    courseCard: {
      width: "48%",
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 100,
    },
    selectedCard: {
      backgroundColor: isDark ? "#163300" : "#dcf8c6",
      shadowColor: "#007912",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 10,
      borderColor: "#3caa4c",
      borderWidth: 1,
    },
    unselectedCard: {
      backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
      borderColor: isDark ? "#333" : "#ddd",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0,
      shadowRadius: 2,
      elevation: 2,
    },
    cardContent: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    courseTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginTop: 12,
      textAlign: "center",
      color: isDark ? "#FFFFFF" : "#000000",
    },
    loginButton: {
      backgroundColor: "#10b956",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
      minWidth: "100%",
    },
    loginButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
