"use client";
import { PropsWithChildren } from "react";
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

interface invoicesInterface {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  symbol: string;
}
// interface invoicesInterface {
//   asset_id: string;
//   name: string;
//   // image: string;
//   price_usd: Number;
//   market_cap: string;
//   price_change_24h: string;
//   symbol: string;
// }

interface TableCryptoProps extends PropsWithChildren {
  heading: string;
  invoices?: Array<invoicesInterface>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function TableCrypto(props: TableCryptoProps) {
  const { children, heading, invoices, currentPage, setCurrentPage } = props;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>{heading}</CardTitle>
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
            {invoices?.map((invoice) => (
              <TableRow key={invoice.id} className="font-semibold">
                <TableCell className="font-medium flex items-center gap-2 w-max">
                  <Image
                    src={invoice.image}
                    alt="Image for token"
                    width={100}
                    height={100}
                    className="w-5 aspect-square"
                  />{" "}
                  {invoice.name}
                </TableCell>
                {/* <TableCell>{invoice.symbol.toUpperCase()}</TableCell> */}
                <TableCell className="">
                  $&nbsp;{invoice.current_price}
                </TableCell>
                {invoice.price_change_percentage_24h > 0 ? (
                  <TableCell className="text-green-400 flex w-max justify-center items-center">
                    <PlusSquareIcon size={16} className=" self-center" /> &nbsp;
                    {invoice.price_change_percentage_24h.toFixed(3)} %
                  </TableCell>
                ) : (
                  <TableCell className="text-red-400 flex w-max">
                    <MinusSquareIcon size={16} className="self-center" /> &nbsp;
                    {invoice.price_change_percentage_24h.toFixed(3)} %
                  </TableCell>
                )}
                <TableCell className="text-left">
                  {formatter.format(invoice.market_cap).slice(0, -1) +
                    " " +
                    formatter.format(invoice.market_cap).slice(-1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </PaginationPrevious>
                    <PaginationNext
                      onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </PaginationNext>
                  </PaginationContent>
                </Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
