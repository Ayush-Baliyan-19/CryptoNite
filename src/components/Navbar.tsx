import Link from "next/link";
import { Button } from "./ui/button";
import SearchInput from "./Search";
import { ThemeToggle } from "./Theme-Toggle";
import { PropsWithChildren } from "react";
import { BitcoinIcon } from "lucide-react";
type THeaderProps = PropsWithChildren<{
    themeToggle?: boolean;
  }>;
export const Navbar = ({themeToggle = false, children}: THeaderProps) => {
  return (
    <nav className="inset-x-0 top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <BitcoinIcon className="h-6 w-6" />
            {/* <MountainIcon className="h-6 w-6" /> */}
            <span className="sr-only">Acme Inc</span>
          </Link>
          <SearchInput className="w-2/4"/>
          <div className="flex items-center gap-4">
          {themeToggle ? <ThemeToggle /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
