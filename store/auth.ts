import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  setAuth: (auth: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,

  setAuth: (auth) => set(() => ({ isAuth: auth })),
}));
