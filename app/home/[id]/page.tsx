import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

async function getData(homeid: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      userId: true,
      user: true,
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  const { getUser } = getKindeServerSession();
  const LoggedInUser = await getUser();

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={`https://qfmioovobgtrmlgkuvdw.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">Kenya</h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.bedrooms} Bedrooms</p> *{data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6 ">
            <Image
              width={44}
              height={44}
              src={
                data?.user?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted by {data?.user?.firstName} {data?.user?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.categoryName}</p>

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />
        </div>

        {/* <form action={createReservation}>
            <input type="hidden" name="homeId" value={params.id} />
            <input type="hidden" name="userId" value={user?.id} />

         

            {user?.id ? (
              <ReservationSubmitButton />
            ) : (
              <Button className="w-full" asChild>
                <Link href="/api/auth/login">Make a Reservation</Link>
              </Button>
            )}
          </form> */}
      </div>
    </div>
  );
}
