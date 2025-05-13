import React from "react";
import { KindeUserAuthButtons } from "../Kinde-UserAuthButtons";
import Link from "next/link";
import { INavLink } from "@/types/allTypes";



function SideBar() {
  const navLink: INavLink[] = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Post [beta-test]", path: "/dashboard/post" },
    { id: 3, name: "Events", path: "/dashboard/events" },
    { id: 4, name: "Guestlist", path: "/dashboard/guestlist" },
    { id: 5, name: "Hero", path: "/dashboard/hero-section" },
  ];
  return (
    <header className="h-screen flex flex-col align-middle justify-between bg-gray-400/20 border-r-blue-50 p-6 ">
      <div>
        <div>
          <p className="text-2xl">Wild and Free</p>
        </div>
        <div className="mt-20">
          <ul className="flex flex-col gap-4">
            {navLink.map((nav: INavLink, _) => (
              <Link key={_} href={nav.path}><li className="text-lg bg-amber-50/10 hover:bg-amber-50/30 p-3 font-bold" >
                {nav.name}
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <KindeUserAuthButtons />
      </div>
    </header>
  );
}

export default SideBar;
