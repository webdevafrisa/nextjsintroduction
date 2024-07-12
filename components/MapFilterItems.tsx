"use client";
import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { categoryItems } from "./categoryItems";
import { FaGlobeAfrica } from "react-icons/fa";

export function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  console.log(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-10 mt-5 w-full lg:w-fit mx-auto overflow-x-scroll no-scrollbar">
      <Link
        href="/"
        className={cn(
          search === null
            ? "border-b-2 border-primary pb-2 flex-shrink-0"
            : "opacity-70 flex-shrink-0",
          "flex flex-col gap-y-2  items-center"
        )}
      >
        <FaGlobeAfrica className="h-6 w-6" />

        <p className="text-xs font-medium">All</p>
      </Link>
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "border-b-2 border-primary  flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-2 items-center text-default"
          )}
        >
          <div className="">{item.icon}</div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
