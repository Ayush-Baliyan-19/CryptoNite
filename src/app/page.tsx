"use client";
import { Linechart } from "@/components/LinechartMultiple";
import { TableCrypto } from "@/components/Table-Crypto";
import { ChartConfig } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getHistoryData, getAllTokenData, handleTableData, filterAndGroupByHour } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { alltokenDataInterface, setAllTokenData } from "@/store/data-slice";
import { TableWatchList } from "@/components/Table-WatchList";
import { TableViewedRecently } from "@/components/Table-Recently";
import { cache } from "react";

export default function Home() {
  const [dataForTable, setDataForTable] = useState<alltokenDataInterface[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const appMgmt = useAppSelector((state) => state.appMgmt);
  const tokenData = useAppSelector((state) => state.data);
  const { currentPage } = appMgmt;
  const chartConfig = {
    bitcoin: {
      label: "Bitcoin",
      color: "rgb(249,115,22)",
    },
    ethereum: {
      label: "Ethereum",
      color: "rgb(209,213,219)",
    },
  } satisfies ChartConfig;
  useEffect(() => {
    if (currentPage === 1 && dataForTable.length === 0 && tokenData.allTokenData.length === 0) {
      getAllTokenData("usd", "market_cap_desc", 20, currentPage).then((res) => {
        dispatch(setAllTokenData(res));
        setDataForTable(res);
      });
    }
    else{
      setDataForTable(tokenData.allTokenData.slice((currentPage-1)*20, currentPage*20));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [dataChart, setdataChart] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData =cache( async () => {
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
        const ethereumResults = filterAndGroupByHour(results[1]);
        Object.keys(bitcoinResults).forEach((key) => {
          const val = bitcoinResults[key];
          const data = {
            hour: key,
            Bitcoin: val[0][1],
          };
          setdataChart((prev) => [...prev, data]);
          // dataChart.push(data);
        });
        Object.keys(ethereumResults).forEach((key) => {
          const val = ethereumResults[key];
          setdataChart((prev) => {
            let prevResult = prev;
            prevResult[parseInt(key)] = {
              ...prevResult[parseInt(key)],
              Ethereum: val[0][1],
            };
            return prevResult;
          });
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    })
    fetchData();
  }, []);

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
            data={dataForTable || []}
            {...{
              setDataForTable,
            }}
          />
        </div>
      </div>
      <div className="container rightContainer py-5 flex flex-col gap-5 w-1/3 pl-0 pr-3">
        <div className="exploreTable">
          <TableWatchList />
        </div>
        <div className="exploreTable">
          <TableViewedRecently />
        </div>
      </div>
    </main>
  );
}
