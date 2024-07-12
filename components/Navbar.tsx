import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import DesktopLogo from "../public/airbnb-desktop.png";
import MobileLogo from "../public/airbnb-mobile.webp";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserNav } from "./UserNav";

// import { UserNav } from "./UserNav";
// import { SearchModalCompnent } from "./SearchComponent";

type Props = {};

const Navbar = async (props: Props) => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const authenticated = await isAuthenticated();



  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32 hidden lg:block"
          />

          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-12"
          />
        </Link>
        <div className="flex items-center space-x-4">
          {/* <SearchModalCompnent /> */}
          <ThemeSwitcher />

          <UserNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
