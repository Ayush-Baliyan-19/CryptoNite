"use client";
import { Linechart } from "@/components/LinechartMultiple";
import { TableCrypto } from "@/components/Table-Crypto";
import { ChartConfig } from "@/components/ui/chart";
import { invoices } from "@/lib/constant";
import { Tablet } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [dataForTable, setDataForTable] = useState([]);
  const chartData = [
    { month: "January", desktop: 186, mobile: 80, Tablet: 100 },
    { month: "February", desktop: 305, mobile: 200, Tablet: 150 },
    { month: "March", desktop: 237, mobile: 120, Tablet: 200 },
    { month: "April", desktop: 73, mobile: 190, Tablet: 100 },
    { month: "May", desktop: 209, mobile: 130, Tablet: 150 },
    { month: "June", desktop: 214, mobile: 140, Tablet: 200 },
  ];
  const [dataForChart, setDataForChart] = useState([]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
    Tablet: {
      label: "Tablet",
      color: "#93c5fd",
    },
  } satisfies ChartConfig;
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
        // ,// "https://rest.coinapi.io/v1/assets",
        // {
        //   headers:{
        //     'X-CoinAPI-Key':process.env.NEXT_PUBLIC_API_KEY
        //   },
        //   params:{
        //     limit:20
        //   }
        // }
      )
      .then((res) => {
        setDataForTable(res.data);
      });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&sparkline=false&interval=hourly&range=6"
  //     )
  //     .then((res) => {
  //     setDataForChart(res.data);
  //     });
  // }, []);
  return (
    <main className="flex gap-2">
      <div className="container leftContainer py-5 flex flex-col gap-5 w-2/3 pr-0 pl-3">
        <div className="chart h-3/5">
          <Linechart {...{ chartConfig, chartData }} />
        </div>
        <div className="exploreTable">
          <TableCrypto
            heading={"Trending Market"}
            invoices={dataForTable || []}
          />
        </div>
      </div>
      <div className="container rightContainer py-5 flex flex-col gap-5 w-1/3 pl-0 pr-3">
        <div className="exploreTable">
          <TableCrypto
            heading={"WatchList"}
            invoices={dataForTable.slice(0, 5)}
          />
        </div>
        <div className="exploreTable">
          <TableCrypto
            heading={"Recently Viewed"}
            invoices={dataForTable.slice(0, 5)}
          />
        </div>
      </div>
    </main>
  );
}
