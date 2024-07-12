import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import { addToFavoriteAction } from "@/app/actions";

export interface iAppProps {
  imagePath: string;
  description: string;
  homeOwner: string;
  price: number;
  userId: string | undefined;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  description,
  imagePath,
  price,
  userId: LoggedInUserId,
  homeId,
  pathName,
  homeOwner,
}: iAppProps) {
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Link href={`/home/${homeId}`} className="mt-2">
          <Image
            src={`https://qfmioovobgtrmlgkuvdw.supabase.co/storage/v1/object/public/images/${imagePath}`}
            alt="Image of House"
            fill
            className="rounded-lg h-full object-cover"
          />
        </Link>
      </div>
      <div className="flex justify-between items-end">
        <Link href={`/home/${homeId}`} className="mt-2">
          <p className="text-muted-foreground text-sm line-clamp-2 ">
            {description}
          </p>
          <p className="pt-2 text-muted-foreground">
            <span className="font-medium">${price}</span> Night
          </p>
        </Link>

        {LoggedInUserId && LoggedInUserId !== homeOwner && (
          <div className="z-10">
            <form action={addToFavoriteAction}>
              <input type="hidden" name="homeId" value={homeId} />
              <input
                type="hidden"
                name="LoggedInUserId"
                value={LoggedInUserId}
              />
              <input type="hidden" name="pathName" value={pathName} />

              {/* temporarily disbaled till favorite table and server action complete */}
              <Button disabled>Add to Favorite</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
