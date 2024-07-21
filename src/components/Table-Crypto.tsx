"use client";
import { PropsWithChildren, useEffect } from "react";
import {
  Table,
  TableBody,
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
import { MinusSquareIcon, PlusSquareIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { alltokenDataInterface, setAllTokenData } from "@/store/data-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleTableData } from "@/lib/utils";
import { setExploredPages, setWatchListTokens } from "@/store/app-mgmt-slice";
import { useToast } from "./ui/use-toast";

interface TableCryptoProps extends PropsWithChildren {
  data: Array<alltokenDataInterface>;
  setDataForTable: (data: alltokenDataInterface[]) => any;
  selectedTable?: string;
  setSelectedTable?: (table: string) => any;
}

export function TableCrypto(props: TableCryptoProps) {
  const {toast} = useToast()
  const { data, setDataForTable,selectedTable,setSelectedTable } = props;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const appMgmt = useAppSelector((state) => state.appMgmt);
  const tokenData = useAppSelector((state) => state.data);
  const { currentPage } = appMgmt;
  return (
    <Card>
      <CardHeader className=" flex flex-col gap-4">
        <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Trending Market</CardTitle>
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
        </div>
        <div className="flex gap-5 justify-center items-center">
          <Button variant={selectedTable==="All Tokens" ? "outline" :"ghost"} className={`px-2 py-1 rounded-xl h-auto ${selectedTable==="All Tokens" && " outline outline-green-400 text-green-400"}`} onClick={(e)=>{
            setSelectedTable && setSelectedTable("All Tokens");
          }}>
            All Coins
          </Button>
          <Button variant={selectedTable==="Watchlist"?"outline":"ghost"} className={`px-2 py-1 rounded-xl h-auto ${selectedTable==="Watchlist" && "outline outline-green-400 text-green-400"}`} onClick={(e)=>{
            setSelectedTable && setSelectedTable("Watchlist");
          }}>
            Watchlist
          </Button>
          <Button variant={selectedTable==="Top Gainers"?"outline":"ghost"} className={`px-2 py-1 rounded-xl h-auto ${selectedTable==="Top Gainers" && "outline outline-green-400 text-green-400"}`} onClick={(e)=>{
            setSelectedTable && setSelectedTable("Top Gainers");
          }}>
            Top Gainers
          </Button>
          <Button variant={selectedTable==="Top Losers"?"outline":"ghost"} className={`px-2 py-1 rounded-xl h-auto ${selectedTable==="Top Losers" && "outline outline-green-400 text-green-400"}`} onClick={(e)=>{
            setSelectedTable && setSelectedTable("Top Losers");
          }}>
            Top Losers
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
            {data?.map((dataPoint) => (
              <TableRowForDrag
                key={dataPoint.id}
                className="font-semibold cursor-pointer"
                id={`crypto-${dataPoint.id}`}
                router={router}
                image={dataPoint.image}
                dispatch={dispatch}
              >
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
                    <PlusSquareIcon size={16} className=" self-center" /> &nbsp;
                    {dataPoint.price_change_percentage_24h.toFixed(3)} %
                  </TableCell>
                ) : (
                  <TableCell className="text-red-400 flex w-max">
                    <MinusSquareIcon size={16} className="self-center" /> &nbsp;
                    {dataPoint.price_change_percentage_24h.toFixed(3)} %
                  </TableCell>
                )}
                <TableCell className="text-left">
                  {formatter.format(dataPoint.market_cap).slice(0, -1) +
                    " " +
                    formatter.format(dataPoint.market_cap).slice(-1)}
                </TableCell>
              </TableRowForDrag>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious
                      className={`${currentPage === 1 ? "hidden" : ""}`}
                      onClick={() => {
                        handleTableData(
                          appMgmt,
                          setDataForTable,
                          tokenData.allTokenData,
                          dispatch,
                          setAllTokenData,
                          setExploredPages,
                          currentPage - 1,
                          toast
                        );
                      }}
                    >
                      Previous
                    </PaginationPrevious>
                    <PaginationNext
                      onClick={() => {
                        handleTableData(
                          appMgmt,
                          setDataForTable,
                          tokenData.allTokenData,
                          dispatch,
                          setAllTokenData,
                          setExploredPages,
                          currentPage + 1,
                          toast
                        );
                      }}
                    >
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

interface TableRowForDragProps extends React.PropsWithChildren {
  id: string;
  className?: string;
  onClick?: () => void;
  router: any;
  image: string;
  dispatch?: any;
}

const TableRowForDrag: React.FC<TableRowForDragProps> = ({
  children,
  className,
  id,
  router,
  image,
  dispatch,
}) => {
  useEffect(() => {
    const draggableItem = document.getElementById(id);
    let imageForDraggableItem: HTMLImageElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      imageForDraggableItem = document.createElement("img");
      imageForDraggableItem.src = image;
      imageForDraggableItem.id = "imageForDraggableItem";
      document.body.appendChild(imageForDraggableItem);
      imageForDraggableItem.classList.add(
        "absolute",
        "z-50",
        "bg-white",
        "shadow-md",
        "border",
        "border-gray-300",
        "rounded-md",
        "p-2"
      );
      imageForDraggableItem.style.width = "30px";
      imageForDraggableItem.style.height = "30px";
      imageForDraggableItem.style.left = `${e.clientX}px`;
      imageForDraggableItem.style.top = `${e.clientY}px`;
      imageForDraggableItem.style.position = "absolute";
      imageForDraggableItem.style.zIndex = "50";
      console.log("Start", imageForDraggableItem.getBoundingClientRect());
      const Empty = document.createElement("img");
      Empty.src = "";
      Empty.width = 0;
      Empty.height = 0;
      if (e.dataTransfer) {
        e.dataTransfer.setDragImage(Empty, 15, 15);
        e.dataTransfer.setData("text/plain", id);
      }
    };

    const handleDrag = (e: DragEvent) => {
      if (imageForDraggableItem) {
        imageForDraggableItem.style.left = `${e.clientX}px`;
        imageForDraggableItem.style.top = `${e.clientY}px`;
        console.log(imageForDraggableItem.getBoundingClientRect());
        const tableForWatchList = document.getElementById("tableForWatchList");
        if (tableForWatchList && imageForDraggableItem) {
          // imageForDraggableItem.style.left= e.clientX + "px";
          // imageForDraggableItem.style.top= e.clientY + "px";
          const tableRect = tableForWatchList.getBoundingClientRect();
          const imageForDraggableItemRect =
            imageForDraggableItem.getBoundingClientRect();
          console.log(tableRect, imageForDraggableItemRect);
          if (
            imageForDraggableItemRect.left >= tableRect.left &&
            imageForDraggableItemRect.right <= tableRect.right &&
            imageForDraggableItemRect.top >= tableRect.top &&
            imageForDraggableItemRect.bottom <= tableRect.bottom
          ) {
            console.log("Added to watchlist", id);
            dispatch(setWatchListTokens(id.split("-")[1]));
            imageForDraggableItem?.remove();
            return;
          }
        }
      }
    };

    if (draggableItem) {
      draggableItem.addEventListener("dragstart", handleDragStart);
      draggableItem.addEventListener("drag", handleDrag);
    }

    return () => {
      if (draggableItem) {
        draggableItem.removeEventListener("dragstart", handleDragStart);
        draggableItem.removeEventListener("drag", handleDrag);
      }
      imageForDraggableItem?.remove(); // Clean up the image if the component is unmounted
    };
  }, [id, image, dispatch]);

  return (
    <TableRow
      className={className}
      id={id}
      draggable
      onClick={() => router.push(`${id.split("-")[1]}`)}
    >
      {children}
    </TableRow>
  );
};
