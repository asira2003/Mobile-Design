import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {types.map((type) => (
        <TouchableOpacity
          key={type.id}
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
