import store from "@/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InitialApiState<Data> = {
  loading: boolean;
  error: boolean;
  payload: Data | null;
};
