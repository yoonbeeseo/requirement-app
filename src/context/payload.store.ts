import { create } from "zustand";

export type PayloadStore<T = any> = {
  payload: null | T;
  setPayload: (payload: T | null) => void;
};

export const usePayloadStore = create<PayloadStore>((set) => ({
  payload: null,
  setPayload: (payload) => set({ payload }),
}));
