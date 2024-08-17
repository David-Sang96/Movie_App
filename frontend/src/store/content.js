import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));
