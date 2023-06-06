import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  usuarioUn: string | null;
  usuarioRol: string | null;
  token: string | null;
  setUser: (id: string, rol: string, tok: string) => void;
  clearUser: () => void;
}

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      usuarioUn: null,
      usuarioRol: null,
      token: null,
      setUser: (id, rol, tok) =>
        set({ usuarioUn: id, usuarioRol: rol, token: tok }),
      clearUser: () => set({ usuarioUn: null, usuarioRol: null, token: null })
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default userStore;
