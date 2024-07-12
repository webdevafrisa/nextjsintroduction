"use server";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";

export const CreateHome = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //   const homeData = await prisma.home.findFirst({
  //     where: {
  //       userId: user?.id,
  //     },
  //     orderBy: {
  //       createdAT: "desc",
  //     },
  //   });

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.home.create({
    data: {
      userId: user?.id,
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      categoryName:category,

      photo: imageData?.path,
    },
  });

  return redirect(`/`); //revalidate the path??
};

export const addToFavoriteAction = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("LoggedInUserId") as string;
  const pathName = formData.get("pathName") as string; //passed through the form as hidden input can use bind function too

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
};
