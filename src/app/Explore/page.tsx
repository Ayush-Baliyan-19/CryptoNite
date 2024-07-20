"use client";
import { TableCrypto } from "@/components/Table-Crypto";
import { TableViewedRecently } from "@/components/Table-Recently";
import { TableWatchList } from "@/components/Table-WatchList";
import { getAllTokenData } from "@/lib/utils";
import { alltokenDataInterface, setAllTokenData } from "@/store/data-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
const Page = () => {
  const [dataForTable, setDataForTable] = useState<alltokenDataInterface[]>([]);
  const dispatch = useAppDispatch();
  const appMgmt = useAppSelector((state) => state.appMgmt);
  const tokenData = useAppSelector((state) => state.data);
  const { currentPage } = appMgmt;
  useEffect(() => {
    if(currentPage === 1 && dataForTable.length === 0 && tokenData.allTokenData.length === 0){
      // fetch data
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
  return (
    <main className="flex gap-2">
      <div className="container leftContainer py-5 flex flex-col gap-5 w-2/3 pr-0 pl-3">
        <div className="chart h-3/5">
          <TableCrypto data={dataForTable} setDataForTable={setDataForTable} />
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
