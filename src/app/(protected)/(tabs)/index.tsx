import { View, FlatList, Dimensions, ViewToken } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRef, useState, useMemo } from "react";

import learnData from "@assets/data/posts.json";
import filterTypes from "@assets/data/filterTypes.json";
import LearnListItem from "@/components/LearnListItem";
import TypeFilterBar from "@/components/TypeFilterBar";

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get("window").height - tabBarHeight;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState(
    filterTypes[0]?.id || "TP-01",
  );
  const filteredData = useMemo(() => {
    return learnData.filter((item) => item.type === selectedType);
  }, [selectedType]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0]?.index || 0);
      }
    },
  );

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
          <LearnListItem learnItem={item} isActive={index === currentIndex} />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate={"fast"}
        disableIntervalMomentum={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}
