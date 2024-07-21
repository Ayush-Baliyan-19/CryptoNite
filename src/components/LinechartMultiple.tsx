"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export const Linechart = (props: any) => {
  const { chartConfig, chartData } = props;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const [domain, setDomain] = useState({
    "Bitcoin": [0, 100],
    "Ethereum": [0, 100],
  });
  useEffect(() => {
    let maxBitcoin = -Infinity;
    let minBitcoin = Infinity;
    let maxEthereum = -Infinity;
    let minEthereum = Infinity;

    chartData.forEach((data: any) => {
      data.Bitcoin = parseInt(data.Bitcoin);
      if (data.Bitcoin > maxBitcoin) {
        maxBitcoin = data.Bitcoin;
      }
      if (data.Bitcoin < minBitcoin) {
        minBitcoin = data.Bitcoin;
      }
      if (data.Ethereum > maxEthereum) {
        maxEthereum = data.Ethereum;
      }
      if (data.Ethereum < minEthereum) {
        minEthereum = data.Ethereum;
      }
    });

    setDomain({
      "Bitcoin": [minBitcoin-1000000000, maxBitcoin+1000000000],
      "Ethereum": [minEthereum-1000000000, maxEthereum+1000000000],
    });
  }, [chartData]);

  const [selectedToken, setSelectedToken] = useState<string>("Bitcoin");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Market Cap Data</CardTitle>
        <CardDescription>
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedToken("Bitcoin");
              }}
              className="flex justify-center items-center gap-3 rounded-lg px-2 py-1 h-auto bg-orange-200 text-orange-500 hover:bg-orange-300 hover:text-orange-500"
            >
              <Image src="/tokenImages/bitcoin.webp" alt="BitcoinImage" width={15} height={15} className="self-center"/>
              Bitcoin
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedToken("Ethereum");
              }}
              className="flex justify-center items-center gap-3 rounded-lg px-2 py-1 h-auto bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-7 00"
            >
              <Image src="/tokenImages/ethereum.webp" alt="EthereumImage" width={15} height={15}/>
              Ethereum
            </Button>
            {/* <Button variant="ghost" size="sm">Solana</Button> */}
          </div>
        </CardDescription>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="overflow-visible">
        <ChartContainer config={chartConfig} className="overflow-visible">
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={selectedToken==="Bitcoin"?domain["Bitcoin"]:domain["Ethereum"]} tickFormatter={tick => {
              return formatter.format(tick)
            }}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={selectedToken}
              type="monotone"
              stroke={`${selectedToken==="Bitcoin"? "var(--color-bitcoin)":"var(--color-ethereum)"}`}
              strokeWidth={2}
              dot={false}
            />
            {/* <Line
              dataKey="Ethereum"
              type="monotone"
              stroke="var(--color-etherium)"
              strokeWidth={2}
              dot={false}
            /> */}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
