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

export const Linechart = (props: any) => {
  const { chartConfig, chartData } = props;
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
      "Bitcoin": [minBitcoin-1000, maxBitcoin+1000],
      "Ethereum": [minEthereum-100, maxEthereum+100],
    });
  }, [chartData]);

  const [selectedToken, setSelectedToken] = useState<string>("Bitcoin");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart</CardTitle>
        <CardDescription>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedToken("Bitcoin");
              }}
            >
              Bitcoin
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedToken("Ethereum");
              }}
            >
              Ethereum
            </Button>
            {/* <Button variant="ghost" size="sm">Solana</Button> */}
          </div>
        </CardDescription>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={selectedToken==="Bitcoin"?domain["Bitcoin"]:domain["Ethereum"]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={selectedToken}
              type="monotone"
              stroke="var(--color-bitcoin)"
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
