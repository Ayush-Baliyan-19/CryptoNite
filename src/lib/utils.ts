import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getHistoryData(
  id: string,
  vs_currency: string,
  days: number
) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=0`
  );
  return res.data.prices;
}

export async function getTableData(
  vs_currency: string,
  order: string,
  per_page: number,
  page: number
) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=false`
  );
  return res.data;
}