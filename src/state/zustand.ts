import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      usuarioUn: null,
      usuarioRol: null,
      setUser: (id, rol) => set({ usuarioUn: id, usuarioRol: rol }),
      clearUser: () => set({ usuarioUn: null, usuarioRol: null })
    }),
    {
      name: "userLoggedInData",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
