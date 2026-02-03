import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  View,
  Animated,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native";

type CoursesListItemProps = {
  title: string;
  description: string;
  lessons: number;
  image: { uri: string };
  onPress: (event: GestureResponderEvent) => void;
};

export default function CoursesListItem({
  title,
  description,
  lessons,
  image,
  onPress,
}: CoursesListItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
        <ImageBackground
          source={image}
          style={styles.container}
          imageStyle={styles.image}
          resizeMode="cover"
          blurRadius={10}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.desc} numberOfLines={3}>
              {description}
            </Text>

            <Text style={styles.lessons}>{lessons} Lessons</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },

  container: {
    height: 200,
    justifyContent: "flex-end",
  },

  image: {
    borderRadius: 14,
  },

  overlay: {
    padding: 16,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.51)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
    marginBottom: 6,
  },

  desc: {
    color: "white",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.51)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
  },

  lessons: {
    color: "white",
    fontSize: 13,
    textAlign: "right",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.51)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
  },
});
