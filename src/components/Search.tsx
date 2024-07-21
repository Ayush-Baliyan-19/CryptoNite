"use client";
import React, { useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { searchDatabase } from "@/lib/constant";
import { useRouter } from "next/navigation";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const router = useRouter();
    const [searchSuggestions, setSearchSuggestions] = React.useState<any[]>([]);
    const [searchValue, setSearchValue] = React.useState("");

    useEffect(() => {
      setSearchSuggestions([]);
      if (searchValue !== "") {
        const suggestions = searchDatabase.filter((key: any) =>
          key.name.toLowerCase().includes(searchValue.toLowerCase())
        ).map((key: any) => key);
        setSearchSuggestions(suggestions);
        console.log(suggestions);
      } else {
        setSearchSuggestions([]);
      }
    }, [searchValue]);

    return (
      <div className="relative flex flex-col items-center w-full h-max">
        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          <SearchIcon className="h-[16px] w-[16px]" />
          <input
            {...props}
            type="search"
            ref={ref}
            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {searchSuggestions.length > 0 && (
          <div className="absolute top-full mt-3 bg-white shadow-md w-2/4 z-10 rounded-md border border-gray-300 dark:bg-black">
            {searchSuggestions.map((suggestion: any, index: number) => (
              <div
                key={index}
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-950 cursor-pointer border-b border-gray-300 dark:border-gray-700"
                onClick={() => {
                  setSearchValue("");
                  router.push(suggestion.endPoint);
                }}
              >
                <div className="mr-3">
                  <Image
                    src={suggestion.image}
                    alt={suggestion.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </div>
                <p className="font-semibold dark:text-white">{suggestion.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
