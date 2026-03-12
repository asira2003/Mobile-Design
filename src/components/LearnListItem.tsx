import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Post } from "@/types/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type LearnItemProps = {
  learnItem: Post;
  isActive: boolean;
  shouldRender: boolean;
  containerHeight?: number;
  onSeekingChange?: (isSeeking: boolean) => void;
};

function LearnListItem({
  learnItem,
  isActive,
  shouldRender,
  containerHeight,
  onSeekingChange,
}: LearnItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [progressBarX, setProgressBarX] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressHeightAnim = useRef(new Animated.Value(3)).current;
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    // Not in a tab navigator
  }

  const height =
    containerHeight ?? Dimensions.get("window").height - tabBarHeight;

  const { video_url, title, description } = learnItem;

  const player = useVideoPlayer(shouldRender ? video_url : null, (player) => {
    if (player) {
      player.loop = true;
    }
  });

  useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showControls ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (showControls) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      hideTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [showControls, fadeAnim]);

  useEffect(() => {
    if (!player || !shouldRender) return;

    const interval = setInterval(() => {
      setCurrentTime(player.currentTime);
      setDuration(player.duration);
      setIsPlaying(player.playing);

      // Hide loading when video has duration and is actually playing
      if (player.duration > 0 && player.playing) {
        setIsBuffering(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, shouldRender]);

  useEffect(() => {
    if (!player || !shouldRender) return;

    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player, shouldRender]);

  // Reset buffering state when shouldRender changes
  useEffect(() => {
    if (!shouldRender) {
      setIsBuffering(true);
    }
  }, [shouldRender]);

  const handlePlayPause = () => {
    if (!player) return;
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
    setShowControls(true);
  };

  const handleRewind = () => {
    if (!player) return;
    const newTime = Math.max(0, player.currentTime - 10);
    player.currentTime = newTime;
    setCurrentTime(newTime);
    setShowControls(true);
  };

  const handleForward = () => {
    if (!player) return;
    const newTime = Math.min(player.duration, player.currentTime + 10);
    player.currentTime = newTime;
    setCurrentTime(newTime);
    setShowControls(true);
  };

  const handleSeekStart = (event: any) => {
    setIsSeeking(true);
    onSeekingChange?.(true);
    Animated.spring(progressHeightAnim, {
      toValue: 24,
      useNativeDriver: false,
    }).start();

    // Calculate position immediately on touch start
    if (!player || duration === 0 || progressBarWidth === 0) return;
    const pageX = event.nativeEvent.pageX;
    const relativeX = pageX - progressBarX;
    const percentage = Math.max(0, Math.min(1, relativeX / progressBarWidth));
    const newTime = percentage * duration;
    setSeekTime(newTime);
  };

  const handleSeekMove = (event: any) => {
    if (!player || duration === 0 || progressBarWidth === 0) return;
    const pageX = event.nativeEvent.pageX;
    const relativeX = pageX - progressBarX;

    // Calculate seek time based on touch position
    const percentage = Math.max(0, Math.min(1, relativeX / progressBarWidth));
    const newTime = percentage * duration;
    setSeekTime(newTime);
  };

  const handleSeekEnd = () => {
    if (!player) {
      // Still collapse even if player is not ready
      setIsSeeking(false);
      onSeekingChange?.(false);
      Animated.spring(progressHeightAnim, {
        toValue: 3,
        useNativeDriver: false,
      }).start();
      return;
    }
    player.currentTime = seekTime;
    setCurrentTime(seekTime);
    setIsBuffering(true); // Show buffering when seeking
    setIsSeeking(false);
    onSeekingChange?.(false);
    Animated.spring(progressHeightAnim, {
      toValue: 3,
      useNativeDriver: false,
    }).start();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <View style={{ height: height }}>
        {shouldRender && player ? (
          <>
            <VideoView
              style={{ flex: 1, backgroundColor: "#000" }}
              player={player}
              contentFit="contain"
              nativeControls={false}
            />

            {/* Show loading indicator while buffering */}
            {isBuffering && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            )}

            <Pressable
              style={styles.tapArea}
              onPress={() => setShowControls(!showControls)}
              disabled={isSeeking}
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
                <View style={styles.controlsInner}>
                  <View style={styles.buttonsContainer}>
                    {/* <Pressable
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
                    </Pressable> */}

                    <Pressable
                      onPress={handlePlayPause}
                      style={({ pressed }) => [
                        styles.playButton,
                        pressed && styles.controlButtonPressed,
                      ]}
                    >
                      <Text style={styles.playIcon}>
                        {isPlaying ? "❚❚" : "▶"}
                      </Text>
                    </Pressable>

                    {/* <Pressable
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
                    </Pressable> */}
                  </View>
                </View>
              </Animated.View>
            </Pressable>

            {/* TikTok-style horizontal progress bar */}
            <Animated.View
              style={[styles.progressBar, { height: progressHeightAnim }]}
            >
              <Pressable
                style={styles.progressPressable}
                onTouchStart={handleSeekStart}
                onTouchMove={handleSeekMove}
                onTouchEnd={handleSeekEnd}
                onTouchCancel={handleSeekEnd}
                onLayout={(event) => {
                  const { width, x } = event.nativeEvent.layout;
                  setProgressBarWidth(width);
                  // Measure absolute position
                  event.target.measure((fx, fy, width, height, px, py) => {
                    setProgressBarX(px);
                  });
                }}
                hitSlop={{ top: 10, bottom: 40, left: 0, right: 0 }}
              >
                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: `${duration > 0 ? ((isSeeking ? seekTime : currentTime) / duration) * 100 : 0}%`,
                      },
                    ]}
                  />
                </View>
                {isSeeking && (
                  <View style={styles.seekTimeContainer}>
                    <Text style={styles.seekTimeText}>
                      {formatTime(seekTime)} / {formatTime(duration)}
                    </Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          </>
        ) : (
          // Loading indicator instead of placeholder
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>

      <View style={[styles.titleContainer, { opacity: isSeeking ? 0 : 1 }]}>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  controlsInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
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
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 8,
    right: 8,
    height: 3,
    justifyContent: "center",
    zIndex: 100,
    elevation: 100,
    borderRadius: 20,
  },
  progressPressable: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  progressTrack: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
    borderRadius: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  seekTimeContainer: {
    position: "absolute",
    top: -40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  seekTimeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  titleContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 8,
    padding: 16,
    zIndex: 1,
    pointerEvents: "box-none",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 13,
    color: "white",
    textAlign: "justify",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(LearnListItem);
