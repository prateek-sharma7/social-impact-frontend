import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeSidebar: () => void;
  closeMobileMenu: () => void;
}

/**
 * UI State Store
 */
export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isMobileMenuOpen: false,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
