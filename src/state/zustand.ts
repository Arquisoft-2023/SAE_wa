import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      usuarioUn: null,
      usuarioRol: null,
      setUser: (id) => set({ usuarioUn: id }),
      clearUser: () => set({ usuarioUn: null })
    }),
    {
      name: "userLoggedInData",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
