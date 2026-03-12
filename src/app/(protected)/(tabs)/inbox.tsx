import NotificationListItem from "@/components/NotificationListItem";
import { View, FlatList, StyleSheet, useColorScheme, Text } from "react-native";
import { useState } from "react";
import { Notification } from "@/types/types";
import notificationsData from "../../../../assets/data/notifications.json";

export default function InboxScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  const [notifications, setNotifications] = useState<Notification[]>(
    notificationsData as Notification[],
  );

  const handleNotificationPress = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationListItem
            notification={item}
            onPress={handleNotificationPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: isDark ? "#000000" : "#ffffff",
    },
    listContent: {
      padding: 16,
    },
    header: {
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "700",
      color: isDark ? "#ffffff" : "#000000",
    },
  });
