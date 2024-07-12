import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  //if no user from kinde server something went wrong
  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong,Please try again");
  }
  //check if the user already exists in supabase
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  //if no user in supabase then create a new user
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        id: user.id,
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }
  //redirect to home page
  return NextResponse.redirect("http://localhost:3000"); //the string changes in production environment to the website root url
}
