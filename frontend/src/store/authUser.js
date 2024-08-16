import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,

  signUp: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`/api/v1/auth/sign-up`, credentials);
      set({ isSigningUp: false, user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(error.response.data.message || "Sign up failed.");
    }
  },

  logIn: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(`/api/v1/auth/log-in`, credentials);
      set({ isLoggingIn: false, user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Log in failed.");
    }
  },

  logOut: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axios.post("/api/v1/auth/log-out");
      set({ user: null, isLoggingOut: false });
      toast.success(response.data.message);
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Log out failed.");
    }
  },

  authCheck: async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`/api/v1/auth/auth-check`);
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      console.error(error.message);
    }
  },
}));
