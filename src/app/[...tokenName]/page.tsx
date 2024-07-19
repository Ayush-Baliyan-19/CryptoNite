import { Linechart } from "@/components/LinechartMultiple";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import React from "react";
import { chartData, chartConfig, invoices } from "@/lib/constant";
import { TableCrypto } from "@/components/Table-Crypto";
import { SliderForHighAndLow } from "@/components/HighandLow";
import { Separator } from "@/components/ui/separator";
const Page = ({ params }: { params: { tokenName: string } }) => {
  const { tokenName } = params;
  return (
    <main className="flex py-5">
      <div className="container flex flex-col w-2/3 gap-3">
        <div className="flex justify-between items-end w-full">
          <div className="value">
            <h1 className="text-lg opacity-30 font-bold">{tokenName}</h1>
            <p className="text-3xl font-bold">$58,614.77</p>
          </div>
          <div className="AddToList">
            <Button variant="ghost" size="sm">
              <PlusSquare />
            </Button>
          </div>
        </div>
        <div className="chart">
          <Linechart {...{ chartConfig, chartData }} />
        </div>
        <div className="performance w-full flex flex-col gap-4">
          <h3 className="font-semibold text-2xl">Performance</h3>
          <SliderForHighAndLow
            parameter="Today's"
            low={16.52}
            high={17.9}
            valueToday={17.3}
          />
          <SliderForHighAndLow
            parameter="52W"
            low={10.81}
            high={48}
            valueToday={17.3}
          />
          {/* <Slider defaultValue={[33]} max={100} step={1} className="w-full" /> */}
        </div>
        <Separator className="my-10" />
        <div className="about">
          <p className="text-lg font-bold">About {tokenName}</p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            similique nostrum, dolorem laudantium distinctio vero accusantium
            explicabo commodi numquam voluptatum, dolore maiores consequuntur
            minima harum. Asperiores aspernatur, non sit deserunt corrupti quos
            possimus quisquam dolorem aperiam aliquam voluptatum commodi! Enim
            soluta amet ratione debitis architecto ullam ad corrupti, aliquid
            dolor.
          </p>
        </div>
      </div>
      <div className="rightContainer container w-1/3 flex flex-col gap-4">
        <div className="exploreTable">
          <TableCrypto heading={"WatchList"} invoices={[]} />
        </div>
        <div className="exploreTable">
          <TableCrypto heading={"Recently Viewed"} invoices={[]} />
        </div>
      </div>
    </main>
  );
};

export default Page;
