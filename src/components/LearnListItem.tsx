import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useCallback, useState, useEffect, useRef } from "react";
import { Post } from "@/types/types";
import { useFocusEffect } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type LearnItemProps = {
  learnItem: Post;
  isActive: boolean;
};

export default function LearnListItem({ learnItem, isActive }: LearnItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCleanedUp = useRef(false);

  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get("window").height - tabBarHeight;

  const { video_url, title, description } = learnItem;

  const player = useVideoPlayer(video_url, (player) => {
    player.loop = true;
  });

  // Reset cleanup flag when component mounts
  useEffect(() => {
    isCleanedUp.current = false;
    return () => {
      isCleanedUp.current = true;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!player || isCleanedUp.current) return;

      try {
        if (isActive) {
          player.play();
        } else {
          player.pause();
        }
      } catch (error) {
        console.log(error);
      }
      return () => {
        if (isCleanedUp.current) return;

        try {
          player.pause();
        } catch (error) {}
      };
    }, [isActive, player]),
  );

  return (
    <>
      <View style={{ height: height }}>
        <VideoView
          style={{ flex: 1 }}
          player={player}
          contentFit="cover"
          nativeControls={false}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.description}
          numberOfLines={isExpanded ? undefined : 2}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {description ? description : " "}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 8,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.51)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
  },

  description: {
    fontSize: 13,
    color: "white",
    textAlign: "justify",
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.51)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
  },
});
