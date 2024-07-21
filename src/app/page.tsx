"use client";
import { Linechart } from "@/components/LinechartMultiple";
import { TableCrypto } from "@/components/Table-Crypto";
import { ChartConfig } from "@/components/ui/chart";
import { use, useEffect, useState } from "react";
import { getHistoryData, getAllTokenData, handleTableData, filterAndGroupByHour } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { alltokenDataInterface, setAllTokenData } from "@/store/data-slice";
import { TableWatchList } from "@/components/Table-WatchList";
import { TableViewedRecently } from "@/components/Table-Recently";
import { cache } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastProvider } from "@/components/ui/toast";
export default function Home() {
  const { toast } = useToast();
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
  const [selectedTable, setSelectedTable] = useState("All Tokens");
  useEffect(() => {
    if (currentPage === 1 && dataForTable.length === 0 && tokenData.allTokenData.length === 0) {
      getAllTokenData("usd", "market_cap_desc", 20, currentPage,toast).then((res) => {
        dispatch(setAllTokenData(res));
        setDataForTable(res);
      }).catch((error) => {
        toast({title: "Error fetching data", description: "Please try again later",variant:"destructive"});
      })
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
          getHistoryData("bitcoin", "usd", 1,"market_caps",toast),
          getHistoryData("ethereum", "usd", 1,"market_caps",toast),
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
        toast({title: "Error fetching data", description: "Please try again later",variant:"destructive"});
      }
    })
    fetchData();
  }, []);
  useEffect(() => {
    if (selectedTable === "All Tokens") {
      setDataForTable(tokenData.allTokenData.slice((currentPage-1)*20, currentPage*20));
    } else if(selectedTable === "Watchlist"){
      setDataForTable([]);
      tokenData.allTokenData.forEach((dataPoint) => {
        if (appMgmt.watchListTokens.includes(dataPoint.id)) {
          setDataForTable((prev) => [...prev, dataPoint]);
        }
      });
    } else if(selectedTable === "Top Gainers"){
      setDataForTable([]);
      const topGainers = [...tokenData.allTokenData].sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      console.log(topGainers);
      setDataForTable(topGainers);
    } else if(selectedTable === "Top Losers"){
      setDataForTable([]);
      const topLosers = [...tokenData.allTokenData].sort((a,b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
      console.log(topLosers);
      setDataForTable(topLosers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedTable]);
  return (
    <main className="flex gap-2">
      <div className="container leftContainer py-5 flex flex-col gap-5">
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
              setSelectedTable,
              selectedTable,
            }}
          />
        </div>
      </div>
      <div className="container rightContainer py-5 flex flex-col gap-5 w-1/3 pl-0 pr-3">
        <div className="exploreTable">
          <TableWatchList className="lg:w-full"/>
        </div>
        <div className="exploreTable">
          <TableViewedRecently />
        </div>
      </div>
    </main>
  );
}
