"use client";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

interface SliderForHighAndLowProps extends SliderProps {
  parameter: string;
  low?: number;
  high?: number;
  valueToday?: number;
}
export function SliderForHighAndLow({
  className,
  ...props
}: SliderForHighAndLowProps) {
  const { parameter, low, high, valueToday } = props;
  const [currentValue, setCurrentValue] = useState(valueToday);
  const [percentageShift, setPercentageShift] = useState(0);
  useEffect(() => {
    if (currentValue && low && high) {
      const shift = ( (currentValue - low) / (high - low) ) * 100;
      setPercentageShift(shift);
    }
  }, [currentValue, high, low, props]);
  useEffect(() => {
    console.log(percentageShift)
    // setCurrentValue(valueToday);
  }, [percentageShift]);
  return (
    <div className="flex justify-center items-center relative w-full gap-10">
      <div className="low w-full text-left max-w-max flex flex-col gap-1">
        <p>{parameter} Low</p>
        <p>{low}</p>
      </div>
      <div className="w-full h-[4px] bg-blue-400 relative rounded-sm">
        <div
          className={`pointer absolute bottom-[-24px]`}
            style={{ left: `${percentageShift}%` }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 22H22L12 2Z" fill="#1e90ff" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>{currentValue}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="high w-full text-right max-w-max flex flex-col gap-1">
        <p>{parameter} High</p>
        <p>{high}</p>
      </div>
    </div>
  );
}
