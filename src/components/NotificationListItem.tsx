import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  useColorScheme,
} from "react-native";
import { Notification } from "../types/types";

interface NotificationListItemProps {
  notification: Notification;
  onPress: (id: string) => void;
}

const NotificationListItem: React.FC<NotificationListItemProps> = React.memo(
  ({ notification, onPress }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const styles = createStyles(isDark, notification.isRead);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const getCategoryColor = (category: string): string => {
      switch (category.toLowerCase()) {
        case "lessons":
          return "#4CAF50";
        case "achievements":
          return "#FFC107";
        case "messages":
          return "#2196F3";
        case "reminders":
          return "#FF9800";
        default:
          return "#9C27B0";
      }
    };

    const getCategoryIcon = (category: string): string => {
      switch (category.toLowerCase()) {
        case "lessons":
          return "📚";
        case "achievements":
          return "🏆";
        case "messages":
          return "💬";
        case "reminders":
          return "⏰";
        default:
          return "📌";
      }
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={() => onPress(notification.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.container}
        >
          <View style={styles.content}>
            {/* Left Side - Icon */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getCategoryColor(notification.category) },
              ]}
            >
              <Text style={styles.iconText}>
                {getCategoryIcon(notification.category)}
              </Text>
              {!notification.isRead && <View style={styles.unreadDot} />}
            </View>

            {/* Right Side - Content */}
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={1}>
                  {notification.title}
                </Text>
                <Text style={styles.timestamp}>{notification.timestamp}</Text>
              </View>
              <Text style={styles.description} numberOfLines={2}>
                {notification.description}
              </Text>
              {notification.actionText && (
                <View style={styles.actionButtonContainer}>
                  <Text style={styles.actionButton}>
                    {notification.actionText}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  },
);

const createStyles = (isDark: boolean, isRead: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark
        ? isRead
          ? "#1e1e1e"
          : "#202020"
        : isRead
          ? "#fafafa"
          : "#ffffff",
      borderRadius: 14,
      marginBottom: 14,
      shadowColor: isDark ? "#000" : "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: isDark ? 2 : 3,
    },
    content: {
      flexDirection: "row",
      padding: 16,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    iconText: {
      fontSize: 24,
    },
    unreadDot: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#25d366",
      borderWidth: 2,
      borderColor: isDark ? "#202020" : "#ffffff",
    },
    textContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: "center",
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: isRead ? "500" : "700",
      color: isDark
        ? isRead
          ? "#9CA3AF"
          : "#ffffff"
        : isRead
          ? "#6B7280"
          : "#000000",
      flex: 1,
      marginRight: 8,
    },
    timestamp: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    description: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
      lineHeight: 20,
      marginBottom: 8,
    },
    actionButtonContainer: {
      alignSelf: "flex-start",
      marginTop: 4,
    },
    actionButton: {
      fontSize: 14,
      fontWeight: "600",
      color: "#10b956",
    },
  });

export default NotificationListItem;
