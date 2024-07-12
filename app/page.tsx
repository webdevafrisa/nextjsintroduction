import { MapFilterItems } from "@/components/MapFilterItems";
import { SkeltonCard } from "@/components/SkeletonCard";
import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NoItems } from "@/components/Noitems";
import { ListingCard } from "@/components/ListingCard";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";

async function getData({
  searchParams,

}: {
 
  searchParams?: {
    filter?: string;
    // country?: string;
    // guest?: string;
    // room?: string;
    // bathroom?: string;
  };
}) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      userId:true,
    },
  });
  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    // country?: string;
    // guest?: string;
    // room?: string;
    // bathroom?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

interface Items {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}

async function ShowItems({ searchParams }: Items) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams});

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check another category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              userId={user?.id}
              homeOwner={item.userId}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 w-full">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
   
    </div>
  );
}
