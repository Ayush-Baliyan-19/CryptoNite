import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type appMgmtState = {
  exploredPages: Array<number>;
  currentPage: number;
  watchListTokens: (string | any[])[];
  recentlyViewedTokens: (string | any[])[];
};

const initialState: appMgmtState = {
  exploredPages: [1],
  currentPage: 1,
  watchListTokens: [],
  recentlyViewedTokens: [],
};

export const appMgmtSlice = createSlice({
  name: "appMgmt",
  initialState,
  reducers: {
    setExploredPages(state, action: PayloadAction<number>) {
      state.exploredPages.push(action.payload);
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      console.log("Setting Current Page to:", action.payload);
      state.currentPage = action.payload;
    },
    setWatchListTokens(state, action: PayloadAction<(string | any[])[]>) {
      state.watchListTokens.push(action.payload);
    },
    setRecentlyViewedTokens(state, action: PayloadAction<(string | any[])[]>) {
      state.recentlyViewedTokens.push(action.payload);
    },
  },
});

export const { setExploredPages, setCurrentPage, setWatchListTokens } =
  appMgmtSlice.actions;

export const getExploredPages = (state: { appMgmt: appMgmtState }) =>
  state.appMgmt.exploredPages;
export const getCurrentPage = (state: { appMgmt: appMgmtState }) =>
  state.appMgmt.currentPage;
export const getWatchListTokens = (state: { appMgmt: appMgmtState }) =>
  state.appMgmt.watchListTokens;

export default appMgmtSlice.reducer;
