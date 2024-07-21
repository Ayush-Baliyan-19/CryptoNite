import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { TokenState, alltokenDataInterface } from "@/store/data-slice";
import {
  appMgmtSlice,
  appMgmtState,
  setCurrentPage,
} from "@/store/app-mgmt-slice";
import { AppDispatch } from "@/store/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { cache } from "react";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHistoryData = cache(
  async (id: string, vs_currency: string, days: number) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=0`
    );
    return res.data.market_caps;
  }
);

export const getAllTokenData = cache(
  async (
    vs_currency: string,
    order: string,
    per_page: number,
    page: number
  ) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=false`,
      {
        headers: {
          x_cg_pro_api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return res.data;
  }
);

export function handleTableData(
  appMgmt: appMgmtState,
  setDataForTable: (data: alltokenDataInterface[]) => any,
  data: alltokenDataInterface[],
  dispatch: AppDispatch,
  setAllTokenData: (data: alltokenDataInterface[]) => UnknownAction,
  setExploredPages: (data: number) => UnknownAction,
  currentPage: number
) {
  console.log("Function called");
  console.log("Explored Pages", appMgmt.exploredPages);
  console.log("Current Page", currentPage);
  if (appMgmt.exploredPages.includes(currentPage)) {
    console.log("Yes the page is explored");
    console.log("Data", data);
    setDataForTable(data.slice((currentPage - 1) * 20, currentPage * 20));
    dispatch(setCurrentPage(currentPage));
    return;
  }
  getAllTokenData("usd", "market_cap_desc", 20, currentPage).then((res) => {
    dispatch(setAllTokenData(res));
    dispatch(setExploredPages(currentPage));
    setDataForTable(res);
    dispatch(setCurrentPage(currentPage));
  });
}

export const getInfoAboutToken = cache(async (id: string) => {
  return await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
});

export function filterAndGroupByHour(results: any[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set to start of tomorrow

  const hourlyGroups: any = {};

  results.forEach((result: (string | number | Date)[]) => {
    const date = new Date(result[0]);
    if (date >= today && date < tomorrow) {
      const hour = date.getHours();
      if (!hourlyGroups[hour]) {
        hourlyGroups[hour] = [];
      }
      if (hourlyGroups[hour].length == 0) hourlyGroups[hour].push(result);
    }
  });

  return hourlyGroups;
}
