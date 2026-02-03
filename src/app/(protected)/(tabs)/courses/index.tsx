import CoursesListItem from "@/components/CoursesListItem";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import learnData from "@assets/data/posts.json";
import courseData from "@assets/data/filterTypes.json";
import { useMemo } from "react";

export default function CoursesScreen() {
  const router = useRouter();

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
              router.push(`/(protected)/(tabs)/courses/${item.id}`)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
});
