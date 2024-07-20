import { configureStore } from "@reduxjs/toolkit";
import {dataSlice} from "./data-slice"
import { appMgmtSlice } from "./app-mgmt-slice";
export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    appMgmt: appMgmtSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;