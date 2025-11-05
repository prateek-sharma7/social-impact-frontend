import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserResponse } from "@/types/user.types";
import { STORAGE_KEYS } from "@/utils/constants";
import { isTokenExpired } from "@/utils/helpers";

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: UserResponse, token: string) => void;
  updateUser: (user: UserResponse) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

/**
 * Authentication Store with persistence
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      },

      updateUser: (user) => {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
        set({ user });
      },

      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const state = get();
        if (!state.token) return false;

        // Check if token is expired
        if (isTokenExpired(state.token)) {
          get().logout();
          return false;
        }

        return true;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Check auth validity after rehydration
        if (state) {
          state.checkAuth();
        }
      },
    }
  )
);
