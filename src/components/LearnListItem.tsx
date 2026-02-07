import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { useCallback, useState, useEffect, useRef } from "react";
import { Post } from "@/types/types";
import { useFocusEffect } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Slider from "@react-native-community/slider";

type LearnItemProps = {
  learnItem: Post;
  isActive: boolean;
  containerHeight?: number;
};

export default function LearnListItem({
  learnItem,
  isActive,
  containerHeight,
}: LearnItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCleanedUp = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  // Try to get tab bar height, fallback to 0 if not in a tab navigator
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    // Not in a tab navigator, use default
  }

  const height =
    containerHeight ?? Dimensions.get("window").height - tabBarHeight;

  const { video_url, title, description } = learnItem;

  const player = useVideoPlayer(video_url, (player) => {
    player.loop = true;
  });

  // Reset cleanup flag when component mounts
  useEffect(() => {
    isCleanedUp.current = false;
    return () => {
      isCleanedUp.current = true;
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  // Animate controls visibility
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showControls ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Auto-hide controls after 3 seconds
    if (showControls) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      hideTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [showControls, fadeAnim]);

  // Update duration and current time
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (!isCleanedUp.current) {
        setCurrentTime(player.currentTime);
        setDuration(player.duration);
        setIsPlaying(player.playing);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player]);

  // Control handlers
  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
    setShowControls(true);
  };

  const handleSeek = (value: number) => {
    player.currentTime = value;
    setCurrentTime(value);
    setShowControls(true);
  };

  const handleRewind = () => {
    const newTime = Math.max(0, player.currentTime - 10);
    player.currentTime = newTime;
    setCurrentTime(newTime);
    setShowControls(true);
  };

  const handleForward = () => {
    const newTime = Math.min(player.duration, player.currentTime + 10);
    player.currentTime = newTime;
    setCurrentTime(newTime);
    setShowControls(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

        {/* Tap area to show/hide controls */}
        <Pressable
          style={styles.tapArea}
          onPress={() => setShowControls(!showControls)}
        >
          <Animated.View
            style={[
              styles.controlsContainer,
              {
                opacity: fadeAnim,
                pointerEvents: showControls ? "auto" : "none",
              },
            ]}
          >
            {/* Control buttons */}
            <View style={styles.buttonsContainer}>
              {/* Rewind 10s */}
              <Pressable
                onPress={handleRewind}
                style={({ pressed }) => [
                  styles.controlButton,
                  pressed && styles.controlButtonPressed,
                ]}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>↺</Text>
                  <Text style={styles.secondsText}>10</Text>
                </View>
              </Pressable>

              {/* Play/Pause */}
              <Pressable
                onPress={handlePlayPause}
                style={({ pressed }) => [
                  styles.playButton,
                  pressed && styles.controlButtonPressed,
                ]}
              >
                <Text style={styles.playIcon}>{isPlaying ? "❚❚" : "▶"}</Text>
              </Pressable>

              {/* Forward 10s */}
              <Pressable
                onPress={handleForward}
                style={({ pressed }) => [
                  styles.controlButton,
                  pressed && styles.controlButtonPressed,
                ]}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>↻</Text>
                  <Text style={styles.secondsText}>10</Text>
                </View>
              </Pressable>
            </View>

            {/* Progress bar at bottom */}
            {/* <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration || 1}
                value={currentTime}
                onSlidingComplete={handleSeek}
                onSlidingStart={() => setShowControls(true)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor="#FFFFFF"
              />
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View> */}
          </Animated.View>
        </Pressable>
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
  tapArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    flex: 1,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  controlButtonPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    transform: [{ scale: 0.95 }],
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: -8,
  },
  secondsText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
    opacity: 0.9,
  },
  playIcon: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 12,
  },
  timeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    minWidth: 42,
    textAlign: "center",
  },
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
