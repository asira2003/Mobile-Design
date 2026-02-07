import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import usersData from "@assets/data/users.json";
import { AuthUser, LoginResult, UsersData } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<LoginResult> => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const data = usersData as UsersData;
          const foundUser = data.users.find(
            (u) => u.email === email && u.password === password,
          );

          if (foundUser) {
            const authUser: AuthUser = {
              id: foundUser.id,
              email: foundUser.email,
            };

            set({
              user: authUser,
              isAuthenticated: true,
            });

            return { success: true };
          }

          return {
            success: false,
            message: "Invalid email or password",
          };
        } catch (error) {
          console.error("Login error:", error);
          return {
            success: false,
            message: "An error occurred during login",
          };
        }
      },

      logout: async () => {
        try {
          set({
            user: null,
            isAuthenticated: false,
          });
          console.log("User logged out successfully");
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
