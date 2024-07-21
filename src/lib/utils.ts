import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { alltokenDataInterface } from "@/store/data-slice";
import { appMgmtState, setCurrentPage } from "@/store/app-mgmt-slice";
import { AppDispatch } from "@/store/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { cache } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHistoryData = cache(
  async (
    id: string,
    vs_currency: string,
    days: number,
    requested: string,
    toast: any
  ) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=0`
    );
    if (res.status !== 200) {
      toast({
        title: "Error fetching data",
        description: "Please try again later",
      });
      return {};
    }
    if (requested === "prices") return res.data.prices;
    else if (requested === "market_caps") return res.data.market_caps;
  }
);

export const getAllTokenData = cache(
  async (
    vs_currency: string,
    order: string,
    per_page: number,
    page: number,
    toast: any
  ) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=false`,
      {
        headers: {
          x_cg_pro_api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    if (res.status !== 200) {
      toast({
        title: "Error fetching data",
        description: "Please try again later",
      });
    }
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
  currentPage: number,
  toast: any
) {
  if (appMgmt.exploredPages.includes(currentPage)) {
    setDataForTable(data.slice((currentPage - 1) * 20, currentPage * 20));
    dispatch(setCurrentPage(currentPage));
    return;
  }
  getAllTokenData("usd", "market_cap_desc", 20, currentPage, toast)
    .then((res) => {
      dispatch(setAllTokenData(res));
      dispatch(setExploredPages(currentPage));
      setDataForTable(res);
      dispatch(setCurrentPage(currentPage));
    })
    .catch((error) => {
      toast({
        title: "Error fetching data",
        description: "Please try again later",
        variant: "destructive",
      });
    });
}

export const getInfoAboutToken = cache(async (id: string, toast: any) => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!res) {
      toast({
        title: "Error fetching data",
        description: "Please try again later",
        variant: "destructive",
      });
    }
    return res;
  } catch (error) {
    toast({
      title: "Error fetching data",
      description: "Please try again later",
      variant: "destructive",
    });
  }
});

export function filterAndGroupByHour(results: any[]) {
  const now = new Date();
  const tenHoursAgo = new Date(now.getTime() - 10 * 60 * 60 * 1000); // 10 hours ago

  const hourlyGroups: any = {};

  results.forEach((result: (string | number | Date)[]) => {
    const date = new Date(result[0]);
    if (date >= tenHoursAgo && date <= now) {
      const formattedHour = formatHour(date);
      if (!hourlyGroups[formattedHour]) {
        hourlyGroups[formattedHour]= []
        hourlyGroups[formattedHour].push(result); // Store the first result for this hour
      }
    }
  });

  return hourlyGroups;
}

function formatHour(date: Date): string {
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const strTime = hours + ' ' + ampm; // Show only the hour and AM/PM
  return strTime;
}
