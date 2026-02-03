import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRef, useState, useMemo } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import learnData from "@assets/data/posts.json";
import filterTypes from "@assets/data/filterTypes.json";
import LearnListItem from "@/components/LearnListItem";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);
  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get("window").height - tabBarHeight;
  const [currentIndex, setCurrentIndex] = useState(0);

  const courseData = useMemo(() => {
    return filterTypes.find((course) => course.id === id);
  }, [id]);

  const filteredData = useMemo(() => {
    return learnData.filter((item) => item.type === id);
  }, [id]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0]?.index || 0);
      }
    },
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <LearnListItem
            learnItem={item}
            isActive={index === currentIndex}
            containerHeight={height}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate={"fast"}
        disableIntervalMomentum={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
        keyExtractor={(item) => item.id}
      />

      <View style={[styles.header]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome
            name="chevron-left"
            size={16}
            color={isDark ? "#ffffff" : "#000000"}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? "#ffffff" : "#000000" }]}>
          {courseData?.title || "Course"}
        </Text>
      </View>
    </View>
  );
}
const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    header: {
      position: "absolute",
      top: 60,
      zIndex: 10,
      left: 16,
      width: Dimensions.get("window").width - 32,
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      paddingVertical: 7,
      paddingHorizontal: 10,
      marginRight: 10,
      borderRadius: 20,
      backgroundColor: isDark ? "#0000007a" : "#ffffff7a",
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 30,
      backgroundColor: isDark ? "#0000007a" : "#ffffff7a",
    },
  });
