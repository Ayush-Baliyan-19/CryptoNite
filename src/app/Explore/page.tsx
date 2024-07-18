import { TableCrypto } from "@/components/Table-Crypto";
import React from "react";
import { invoices } from "@/lib/constant";
const Page = () => {
  return (
    <main className="flex gap-2">
      <div className="container leftContainer py-5 flex flex-col gap-5 w-2/3 pr-0 pl-3">
        <div className="chart h-3/5">
          <TableCrypto heading={"Trending Market"} invoices={[]} />
        </div>
      </div>
      <div className="container rightContainer py-5 flex flex-col gap-5 w-1/3 pl-0 pr-3">
        <div className="exploreTable">
          <TableCrypto heading={"WatchList"} invoices={[]} />
        </div>
        <div className="exploreTable">
          <TableCrypto
            heading={"Recently Viewed"}
            invoices={[]}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
