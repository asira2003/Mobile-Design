import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
  InteractionManager,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";

import learnData from "@assets/data/posts.json";
import filterTypes from "@assets/data/filterTypes.json";
import LearnListItem from "@/components/LearnListItem";
import TypeFilterBar from "@/components/TypeFilterBar";

export default function HomeScreen() {
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get("window").height - tabBarHeight;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState(
    filterTypes[0]?.id || "TP-01",
  );
  const [isSeekingVideo, setIsSeekingVideo] = useState(false);

  // Track which indices should render video players
  const [activeIndices, setActiveIndices] = useState(new Set([0, 1]));

  useEffect(() => {
    if (courseId) {
      // Defer until navigation animation completes
      const task = InteractionManager.runAfterInteractions(() => {
        setSelectedType(courseId);
        // Reset to first item when filter changes
        setCurrentIndex(0);
        setActiveIndices(new Set([0, 1]));
      });

      return () => task.cancel();
    }
  }, [courseId]);

  const filteredData = useMemo(() => {
    return learnData.filter((item) => item.type === selectedType);
  }, [selectedType]);

  // Update active indices based on current index
  useEffect(() => {
    const newActiveIndices = new Set<number>();

    // Keep previous, current, and next indices active
    if (currentIndex > 0) {
      newActiveIndices.add(currentIndex - 1); // Previous (cached for going back)
    }
    newActiveIndices.add(currentIndex); // Current (playing)
    if (currentIndex < filteredData.length - 1) {
      newActiveIndices.add(currentIndex + 1); // Next (buffering)
    }

    setActiveIndices(newActiveIndices);
  }, [currentIndex, filteredData.length]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0]?.index;
        if (newIndex !== null && newIndex !== undefined) {
          setCurrentIndex(newIndex);
        }
      }
    },
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    [height],
  );

  // Reset when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setActiveIndices(new Set([0, 1]));
  }, [selectedType]);

  return (
    <View style={{ flex: 1 }}>
      <TypeFilterBar
        types={filterTypes}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <LearnListItem
            learnItem={item}
            isActive={index === currentIndex}
            shouldRender={activeIndices.has(index)}
            containerHeight={height}
            onSeekingChange={setIsSeekingVideo}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${selectedType}-${index}`}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={getItemLayout}
        removeClippedSubviews={false}
        maxToRenderPerBatch={3}
        windowSize={3}
        initialNumToRender={2}
        scrollEnabled={!isSeekingVideo}
      />
    </View>
  );
}
