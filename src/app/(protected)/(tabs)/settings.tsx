import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GENERAL</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <MaterialIcons
              name="card-membership"
              size={24}
              color={isDark ? "#FFFFFF" : "#333"}
            />
            <Text style={styles.menuItemText}>Manage Subscription</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#9CA3AF" : "#999"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <AntDesign
              name="heart"
              size={24}
              color={isDark ? "#FFFFFF" : "#333"}
            />
            <Text style={styles.menuItemText}>Update Interests</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#9CA3AF" : "#999"}
          />
        </TouchableOpacity>
      </View>

      {/* Support & Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUPPORT & LEGAL</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={isDark ? "#FFFFFF" : "#333"}
            />
            <Text style={styles.menuItemText}>Help & Support</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#9CA3AF" : "#999"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <MaterialIcons
              name="privacy-tip"
              size={24}
              color={isDark ? "#FFFFFF" : "#333"}
            />
            <Text style={styles.menuItemText}>Privacy & Terms</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#9CA3AF" : "#999"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={isDark ? "#FFFFFF" : "#333"}
            />
            <Text style={styles.menuItemText}>About</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#9CA3AF" : "#999"}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000000" : "#ffffff",
      paddingTop: 10,
    },
    section: {
      // marginTop: 20,
      marginHorizontal: 16,
      overflow: "hidden",
      borderRadius: 12,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "600",
      color: isDark ? "#9CA3AF" : "#007a06",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: isDark ? "#202020" : "#fafafa",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#161616" : "#f8f8f8",
    },
    menuItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    menuItemText: {
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#333",
      fontWeight: "500",
    },
    signOutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#d10000",
      borderRadius: 12,
      marginHorizontal: 16,
      marginTop: 30,
      paddingVertical: 16,
    },
    signOutText: {
      fontSize: 16,
      color: "#ffffff",
      fontWeight: "600",
    },
    versionText: {
      fontSize: 14,
      color: isDark ? "#6B7280" : "#999",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 40,
    },
  });
