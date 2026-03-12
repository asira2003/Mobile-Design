import CoursesListItem from "@/components/CoursesListItem";
import { View, FlatList, StyleSheet, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import learnData from "@assets/data/posts.json";
import courseData from "@assets/data/filterTypes.json";
import { useMemo } from "react";

export default function CoursesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);
  const coursesWithLessons = useMemo(() => {
    return courseData.map((course) => {
      const lessonCount = learnData.filter(
        (lesson) => lesson.type === course.id,
      ).length;

      return {
        ...course,
        lessonCount,
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={coursesWithLessons}
        renderItem={({ item }) => (
          <CoursesListItem
            title={item.title}
            description={item.description}
            lessons={item.lessonCount}
            image={{ uri: item["img-url"] }}
            onPress={() =>
              router.push({
                pathname: "/(protected)/(tabs)",
                params: { courseId: item.id },
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      flex: 1,
      backgroundColor: isDark ? "#000000" : "#ffffff",
    },
    listContent: {
      padding: 16,
      gap: 16,
    },
  });
