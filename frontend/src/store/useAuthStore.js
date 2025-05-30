import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("check auth response", res.data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });

    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log("error in sinning up", error);
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set: ({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log("error logging in", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("error in logging out", error);
    }
  },
}));
