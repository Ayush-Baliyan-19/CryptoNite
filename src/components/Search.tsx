import React from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
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
        />
      </div>
    );
  }
);

SearchInput.displayName = "Search";

export default SearchInput;