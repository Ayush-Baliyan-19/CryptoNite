"use client";
import { TableCrypto } from "@/components/Table-Crypto";
import { TableViewedRecently } from "@/components/Table-Recently";
import { TableWatchList } from "@/components/Table-WatchList";
import { getAllTokenData } from "@/lib/utils";
import { alltokenDataInterface, setAllTokenData } from "@/store/data-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
const Page = () => {
  const { toast } = useToast();
  const [dataForTable, setDataForTable] = useState<alltokenDataInterface[]>([]);
  const dispatch = useAppDispatch();
  const appMgmt = useAppSelector((state) => state.appMgmt);
  const tokenData = useAppSelector((state) => state.data);
  const { currentPage } = appMgmt;
  const [selectedTable, setSelectedTable] = useState("All Tokens");
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
  useEffect(() => {
    if (
      currentPage === 1 &&
      dataForTable.length === 0 &&
      tokenData.allTokenData.length === 0
    ) {
      // fetch data
      getAllTokenData("usd", "market_cap_desc", 20, currentPage, toast)
        .then((res) => {
          dispatch(setAllTokenData(res));
          setDataForTable(res);
        })
        .catch((error) => {
          toast({
            title: "Error fetching data",
            description: "Please try again later",
            variant: "destructive",
          });
        });
    } else {
      setDataForTable(
        tokenData.allTokenData.slice((currentPage - 1) * 20, currentPage * 20)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="flex gap-2">
      <div className="container leftContainer py-5 flex flex-col gap-5 w-2/3 pr-0 pl-3">
        <div className="chart h-3/5">
          <TableCrypto data={dataForTable} setDataForTable={setDataForTable} {...{selectedTable,setSelectedTable}} />
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
};

export default Page;
