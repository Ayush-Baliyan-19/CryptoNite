"use client";
import { Linechart } from "@/components/LinechartMultiple";
import { TableCrypto } from "@/components/Table-Crypto";
import { ChartConfig } from "@/components/ui/chart";
import { invoices } from "@/lib/constant";
import { Tablet } from "lucide-react";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { getHistoryData, getTableData } from "../lib/utils";

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
  const [dataForChart, setDataForChart] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const chartConfig = {
    bitcoin: {
      label: "Bitcoin",
      color: "#2563eb",
    },
    ethereum: {
      label: "Ethereum",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  useEffect(() => {
    getTableData("usd", "market_cap_desc", 20, currentPage).then((res) => {
      setDataForTable(res);
    });
  }, [currentPage]);
  function filterAndGroupByHour(results: any[]) {
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
  const [dataChart, setdataChart] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          getHistoryData("bitcoin", "usd", 1),
          getHistoryData("ethereum", "usd", 1),
          getHistoryData("dogecoin", "usd", 1),
        ]);
        results.forEach((result, index) => {
          result.forEach((data: Array<number | Date>) => {
            data[0] = new Date(data[0]);
          });
        });
        const bitcoinResults = filterAndGroupByHour(results[0]);
        console.log(bitcoinResults);
        const ethereumResults = filterAndGroupByHour(results[1]);

        Object.keys(bitcoinResults).forEach((key) => {
          const val = bitcoinResults[key];
          const data={
            hour: key,
            Bitcoin: val[0][1],
          }
          setdataChart((prev) => [...prev, data]);
          // dataChart.push(data);
        })
        Object.keys(ethereumResults).forEach((key) => {
          const val = ethereumResults[key];
          setdataChart((prev) => {
            let prevResult = prev
            prevResult[parseInt(key)] = {...prevResult[parseInt(key)], Ethereum: val[0][1]}
            return prevResult
          });
        })
        setDataForChart(results);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(dataChart);
  }, [dataChart]);

  return (
    <main className="flex gap-2">
      <div className="container leftContainer py-5 flex flex-col gap-5 w-2/3 pr-0 pl-3">
        <div className="chart h-3/5">
          {dataChart.length > 0 && (
            <Linechart {...{ chartConfig, dataChart }} chartData={dataChart} />
          )}
        </div>
        <div className="exploreTable">
          <TableCrypto
            heading={"Trending Market"}
            invoices={dataForTable || []}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="container rightContainer py-5 flex flex-col gap-5 w-1/3 pl-0 pr-3">
        <div className="exploreTable">
          <TableCrypto
            heading={"WatchList"}
            invoices={dataForTable.slice(0, 5)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="exploreTable">
          <TableCrypto
            heading={"Recently Viewed"}
            invoices={dataForTable.slice(0, 5)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
