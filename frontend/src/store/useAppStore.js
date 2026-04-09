import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useAppStore = create((set, get) => ({
  profiles: [],
  events: [],
  activeProfile: null,
  eventLogs: [],

  setActiveProfile: (profile) => set({ activeProfile: profile }),
  fetchProfiles: async () => {
    try {
      const response = await axios.get(`${API_URL}/profiles`);
      console.log(response, "RESPONSE");
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
  createEvent: async (eventData) => {
    try {
      await axios.post(`${API_URL}/events`, eventData);
      get().fetchEvents();
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Error creating event. Check console.");
    }
  },
  updateEvent: async (eventId, eventData) => {
    try {
      await axios.put(`${API_URL}/events/${eventId}`, eventData);
      get().fetchEvents();
    } catch (error) {
      console.error("Failed to update event:", error);
      alert("Error updating event.");
    }
  },
  fetchEventLogs: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/events/${eventId}/logs`);
      console.log(response.data , "LOGS RESPONSE");
      set({ eventLogs: response.data.logs });
    } catch (error) {
      console.error("Failed to fetch event logs:", error);
      alert("Error fetching event logs.");
    }
  },
}));
