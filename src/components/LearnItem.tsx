import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useState } from "react";

export default function LearnItem() {
  const [isExpanded, setIsExpanded] = useState(false);

  const videoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const height = Dimensions.get("window").height;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

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
        <Text style={styles.title}>Title Goes Here</Text>
        <Text
          style={styles.description}
          numberOfLines={isExpanded ? undefined : 2}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
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
  },
});
