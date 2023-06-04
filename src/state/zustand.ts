import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  usuarioUn: string | null;
  usuarioRol: string | null;
  setUser: (id: string, rol: string) => void;
  clearUser: () => void;
}

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      usuarioUn: null,
      usuarioRol: null,
      setUser: (id, rol) => set({ usuarioUn: id, usuarioRol: rol }),
      clearUser: () => set({ usuarioUn: null, usuarioRol: null })
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default userStore;
