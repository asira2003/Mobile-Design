import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useRef, useEffect, useState } from "react";

interface FilterType {
  id: string;
  title: string;
}

interface TypeFilterBarProps {
  types: FilterType[];
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function TypeFilterBar({
  types,
  selectedType,
  onSelectType,
}: TypeFilterBarProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [buttonLayouts, setButtonLayouts] = useState<{
    [key: string]: number;
  }>({});

  const handleLayout = (id: string, x: number) => {
    setButtonLayouts((prev) => ({ ...prev, [id]: x }));
  };

  useEffect(() => {
    // Scroll to selected type when it changes
    if (buttonLayouts[selectedType] !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: buttonLayouts[selectedType] - 16, // Scroll with some padding on the left
        animated: true,
      });
    }
  }, [selectedType, buttonLayouts]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {types.map((type) => (
        <View
          key={type.id}
          onLayout={(event) => {
            const { x } = event.nativeEvent.layout;
            handleLayout(type.id, x);
          }}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedType === type.id && styles.filterButtonActive,
            ]}
            onPress={() => onSelectType(type.id)}
          >
            <Text
              style={[
                styles.filterText,
                selectedType === type.id && styles.filterTextActive,
              ]}
            >
              {type.title}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    position: "absolute",
    top: 60,
    zIndex: 10,
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 0,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e0e0e07e",
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: "#008f37",
  },
  filterText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#FFF",
  },
});
