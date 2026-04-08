import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useAppStore = create((set, get) => ({
  profiles: [],
  events: [],
  activeProfile: null, 
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  fetchProfiles: async () => {
    try {
      const response = await axios.get(`${API_URL}/profiles`);
      console.log(response , "RESPONSE")
      set({ profiles: response.data.profiles });
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  },
  createProfile: async (name, timezone) => {
    try {
      await axios.post(`${API_URL}/profiles`, { name, timezone });
      get().fetchProfiles(); 
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  },

  fetchEvents: async () => {
    try {
      const res = await axios.get(`${API_URL}/events`);
      set({ events: res.data.events });
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  },
}));