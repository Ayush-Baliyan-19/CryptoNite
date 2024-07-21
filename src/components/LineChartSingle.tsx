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
import { PropsWithChildren, useEffect, useState } from "react";

interface LineChartProps extends PropsWithChildren {
    id: string;
    chartConfig: ChartConfig;
    chartData: Array<any>;
    nameOfToken: string;
}

export const Linechart = (props: LineChartProps) => {
  const { chartConfig, chartData,id } = props;
  const [domain, setDomain] = useState([0, 100]);
  useEffect(() => {
    let maxValue = -Infinity;
    let minValue = Infinity;

    chartData.forEach((data: any) => {
      if (data[id] > maxValue) {
        maxValue = data[id];
      }
      if (data[id] < minValue) {
        minValue = data[id];
      }
    });

    setDomain([minValue-1000, maxValue+1000]);
  }, [chartData, id]);

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Chart</CardTitle> */}
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
            <YAxis domain={domain} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={id}
              type="monotone"
              stroke={`var(--color-${id.toLowerCase()})`}
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
