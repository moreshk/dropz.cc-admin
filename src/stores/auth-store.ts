import { create } from "zustand";
import { produce } from "immer";
import { IsFetchingEnum } from "./store-types";
import { axios } from "@/lib/axios";

export interface SessionStore {
  status: IsFetchingEnum;
  session: Session | undefined;
  updateSession: (session: Session) => void;
  getSession: () => void;
}

export const useSessionStore = create<SessionStore>()((set) => ({
  status: IsFetchingEnum.loading,
  session: undefined,
  updateSession: (session: Session) => {
    set(
      produce((state: SessionStore) => {
        state.session = session;
        state.status = IsFetchingEnum.loaded;
      })
    );
  },
  getSession: async () => {
    try {
      const token = localStorage.getItem("x-dropz-token");
      if (token) {
        const { data } = await axios.get<{ user: Session }>("/user");
        if (data) {
          set(
            produce((state: SessionStore) => {
              state.session = data.user;
              state.status = IsFetchingEnum.loaded;
            })
          );
          return;
        }
      }
      localStorage.removeItem("x-dropz-token");
      set(
        produce((state: SessionStore) => {
          state.session = undefined;
          state.status = IsFetchingEnum.loaded;
        })
      );
    } catch (e) {
      localStorage.removeItem("x-dropz-token");
      produce((state: SessionStore) => {
        state.session = undefined;
        state.status = IsFetchingEnum.unloaded;
      });
    }
  },
}));
