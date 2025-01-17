"use client";
import { Linechart } from "@/components/LineChartSingle";
import { Button } from "@/components/ui/button";
import { PlusSquare, ArrowUp,ArrowDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SliderForHighAndLow } from "@/components/HighandLow";
import { Separator } from "@/components/ui/separator";
import {
  filterAndGroupByHour,
  getHistoryData,
  getInfoAboutToken,
} from "@/lib/utils";
import { TableWatchList } from "@/components/Table-WatchList";
import { TableViewedRecently } from "@/components/Table-Recently";
import { useAppDispatch } from "@/store/hooks";
import {
  setRecentlyViewedTokens,
  setWatchListTokens,
} from "@/store/app-mgmt-slice";
import "./page.css";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface tokenInfo {
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_1y: number;
  price_change_percentage_24h: number;
  total_supply: number;
  circulating_supply: number;
  last_updated: string;
  description: string;
  image: string;
}
const Page = ({ params }: { params: { tokenName: string } }) => {
  const {toast} = useToast();
  const { tokenName } = params;
  const dispatch = useAppDispatch();
  const [tokenInfo, setTokenInfo] = useState<tokenInfo>({
    name: "",
    symbol: "",
    current_price: 0,
    market_cap: 0,
    total_volume: 0,
    high_24h: 0,
    low_24h: 0,
    price_change_percentage_1y: 0,
    price_change_percentage_24h: 0,
    total_supply: 0,
    circulating_supply: 0,
    last_updated: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    getInfoAboutToken(tokenName[0].toLowerCase(),toast).then((res:any) => {
      if(res)
      setTokenInfo((prevState) => {
        return {
          ...prevState,
          name: res.data.name,
          symbol: res.data.symbol,
          current_price: res.data.market_data.current_price.usd,
          market_cap: res.data.market_data.market_cap.usd,
          total_volume: res.data.market_data.total_volume.usd,
          high_24h: res.data.market_data.high_24h.usd,
          low_24h: res.data.market_data.low_24h.usd,
          total_supply: res.data.market_data.total_supply,
          circulating_supply: res.data.market_data.circulating_supply,
          price_change_percentage_1y:
            res.data.market_data.price_change_percentage_1y,
          price_change_percentage_24h:
            res.data.market_data.price_change_percentage_24h,
          last_updated: res.data.last_updated,
          description: res.data.description.en,
          image: res.data.image.small,
        };
      });
    }).catch((error) => {
      toast({title: "Error fetching data", description: "Please try again later",variant:"destructive"});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [chartData, setChartData] = useState<any[]>([]);
  const chartConfig = {
    [tokenName[0].toLowerCase()]: {
      label: tokenName[0].toLowerCase(),
      color: "#2563eb",
    },
  };
  useEffect(() => {
    dispatch(setRecentlyViewedTokens(tokenName[0].toLowerCase()));

    const fetchData = async () => {
      try {
        const results = await Promise.all([
          getHistoryData(tokenName[0].toLowerCase(), "usd", 1, "prices",toast),
        ]);
        results.forEach((result, index) => {
          result.forEach((data: Array<number | Date>) => {
            data[0] = new Date(data[0]);
          });
        });
        const tokenResults = filterAndGroupByHour(results[0]);
        Object.keys(tokenResults).forEach((key) => {
          const val = tokenResults[key];
          const data = {
            hour: key,
            [tokenName[0]]: val[0][1],
          };
          setChartData((prev) => [...prev, data]);
        });
      } catch (error) {
        toast({title: "Error fetching data", description: "Please try again later"})
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex py-5" id="tokenPageMain">
      <div className="container leftContainer flex flex-col w-2/3 gap-3">
          <Image src={tokenInfo.image} alt={tokenName[0]} width={30} height={30} />
        <div className="flex justify-between items-end w-full">
          <div className="value">
            <h1 className="text-lg opacity-30 font-bold">
              {tokenName[0][0].toUpperCase() + tokenName[0].slice(1)}
            </h1>
            <div className="flex justify-center items-center gap-4">
              <p className="text-3xl font-bold">
                ${tokenInfo.current_price.toFixed(2)}
              </p>
              <p className={`text-base font-semibold ${tokenInfo.price_change_percentage_24h> 0 ? "text-green-500 bg-green-200" :"text-red-500 bg-red-200"} flex items-center justify-center gap-1 px-1 py-0.5 rounded-md border `}>
                {
                  tokenInfo.price_change_percentage_24h > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                }
                {tokenInfo.price_change_percentage_24h.toFixed(3)}% in 24h
              </p>
            </div>
          </div>
          <div className="AddToList">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                dispatch(setWatchListTokens(tokenName[0]));
              }}
            >
              <PlusSquare />
            </Button>
          </div>
        </div>
        <div className="chart">
          <Linechart
            {...{ chartConfig, chartData }}
            nameOfToken={tokenInfo.name}
            id={tokenName[0]}
          />
        </div>
        <div className="performance w-full flex flex-col gap-4">
          <h3 className="font-semibold text-2xl">Performance</h3>
          <SliderForHighAndLow
            parameter="Today's"
            low={tokenInfo.low_24h}
            high={tokenInfo.high_24h}
            valueToday={tokenInfo.current_price}
          />
          {/* <SliderForHighAndLow
            parameter="52W"
            low={10.81}
            high={48}
            valueToday={17.3}
          /> */}
          {/* <Slider defaultValue={[33]} max={100} step={1} className="w-full" /> */}
        </div>
        <Separator className="my-10" />
        <div className="about">
          <p className="text-lg font-bold">About {tokenName}</p>
          <p
            className="tokenDescription underline-offset-2"
            dangerouslySetInnerHTML={{
              __html: tokenInfo.description,
            }}
          >
          </p>
        </div>
      </div>
      <div className="rightContainer container w-1/3 flex flex-col gap-4">
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
