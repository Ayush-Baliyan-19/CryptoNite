import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface alltokenDataInterface {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  symbol: string;
}

interface tokenHistoryInterface {
  hour: number;
  value: number;
}

export type TokenState = {
  allTokenData: alltokenDataInterface[];
  tokenHistory: {
    [key: string]: {
      CurrentValue: number;
      History: tokenHistoryInterface[];
    };
  };
};

const initialState: TokenState = {
  allTokenData: [],
  tokenHistory: {},
};

export const dataSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAllTokenData(state, action: PayloadAction<alltokenDataInterface[]>) {
      //Push payload to all token data
      console.log("Setting all token data");
      state.allTokenData.push(...action.payload);
    },
    setTokenHistory(
      state,
      action: PayloadAction<{ id: string; history: tokenHistoryInterface[] }>
    ) {
      state.tokenHistory[action.payload.id] = {
        CurrentValue: action.payload.history[0].value,
        History: action.payload.history,
      };
    },
  },
});

export const { setAllTokenData, setTokenHistory } = dataSlice.actions;

export const getAllTokenData = (state: { token: TokenState }) =>
  state.token.allTokenData;
export const getTokenHistory = (state: { token: TokenState }) =>
  state.token.tokenHistory;

export default dataSlice.reducer;
