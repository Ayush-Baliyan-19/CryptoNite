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

export const Linechart = (props:any) => {
    const { chartConfig, chartData } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={[63000,65000]}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Bitcoin"
              type="monotone"
              stroke="var(--color-bitcoin)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Ethereum"
              type="monotone"
              stroke="var(--color-etherium)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
