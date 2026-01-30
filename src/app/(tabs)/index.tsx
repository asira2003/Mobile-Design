import LearnListItem from "@/components/LearnListItem";
import { View, FlatList, Dimensions, ViewToken } from "react-native";
import learnData from "@assets/data/posts.json";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRef, useState } from "react";

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get("window").height - tabBarHeight;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0]?.index || 0);
      }
    },
  );
  return (
    <View>
      <FlatList
        data={learnData}
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
