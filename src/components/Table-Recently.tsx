"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusSquare, MinusSquareIcon, PlusSquareIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { UnknownAction } from "@reduxjs/toolkit";
import { alltokenDataInterface, setAllTokenData } from "@/store/data-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function TableViewedRecently() {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const appMgmt = useAppSelector((state) => state.appMgmt);
  const tokenData = useAppSelector((state) => state.data);
  const { recentlyViewedTokens } = appMgmt;
  const { allTokenData } = tokenData;
  const [dataForTable, setDataForTable] = useState<alltokenDataInterface[]>([]);
  useEffect(() => {
    setDataForTable([]);
    allTokenData.forEach((dataPoint) => {
      if (recentlyViewedTokens.includes(dataPoint.id)) {
        setDataForTable((prev) => [...prev, dataPoint]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Viewed Recently</CardTitle>
          <CardDescription>July 2024</CardDescription>
        </div>
        <div>
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/Explore");
            }}
            className="text-blue-500"
          >
            View More Coins
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-max">Token</TableHead>
              {/* <TableHead className="w-max">Symbol</TableHead> */}
              <TableHead className="w-max text-nowrap">Last Price</TableHead>
              <TableHead className="w-max text-nowrap">24H Change</TableHead>
              <TableHead className="w-max text-nowrap">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataForTable.length === 0 ? (
              <TableRow>
                <TableCell className="text-center" colSpan={4}>
                  No tokens in watchlist
                </TableCell>
              </TableRow>
            ) : (
              dataForTable?.map((dataPoint) => (
                <TableRow key={dataPoint.id} className="font-semibold">
                  <TableCell className="font-medium flex items-center gap-2 w-max">
                    <Image
                      src={dataPoint.image}
                      alt="Image for token"
                      width={100}
                      height={100}
                      className="w-5 aspect-square"
                    />{" "}
                    {dataPoint.name}
                  </TableCell>
                  {/* <TableCell>{dataPoint.symbol.toUpperCase()}</TableCell> */}
                  <TableCell className="">
                    $&nbsp;{dataPoint.current_price}
                  </TableCell>
                  {dataPoint.price_change_percentage_24h > 0 ? (
                    <TableCell className="text-green-400 flex w-max justify-center items-center">
                      <PlusSquareIcon size={16} className=" self-center" />{" "}
                      &nbsp;
                      {dataPoint.price_change_percentage_24h.toFixed(3)} %
                    </TableCell>
                  ) : (
                    <TableCell className="text-red-400 flex w-max">
                      <MinusSquareIcon size={16} className="self-center" />{" "}
                      &nbsp;
                      {dataPoint.price_change_percentage_24h.toFixed(3)} %
                    </TableCell>
                  )}
                  <TableCell className="text-left">
                    {formatter.format(dataPoint.market_cap).slice(0, -1) +
                      " " +
                      formatter.format(dataPoint.market_cap).slice(-1)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
