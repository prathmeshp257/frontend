import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowsPointingOutIcon,ArrowTopRightOnSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PathName } from "routers/types";
import MenuBar from "shared/MenuBar/MenuBar";
import isInViewport from "utils/isInViewport";
import ButtonPrimary from "shared/Button/ButtonPrimary";

let WIN_PREV_POSITION = window.pageYOffset;

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: "Explore",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Profile",
    link: "/account",
    icon: UserCircleIcon,
  },
  {
    name: "Logout",
    link: "/",
    icon: ArrowTopRightOnSquareIcon,
  },
  // {
  //   name: "Wishlists",
  //   link: "/account-savelists",
  //   icon: HeartIcon,
  // },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const excludedRoutes = ["/login", "/signup"];
  const hasToken = !!localStorage.getItem("token");

  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(showHideHeaderMenu);
  };

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        {hasToken
          ? NAV.map((item, index) => {
              const active = window.location.pathname === item.link;
              if (item.link && !excludedRoutes.includes(item.link)) {
                return (
                  <Link
                    key={index}
                    to={item.link}
                    className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                      active ? "text-neutral-900 dark:text-neutral-100" : ""
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${active ? "text-red-600" : ""}`}
                    />
                    <span className="text-[11px] leading-none mt-1">
                      {item.name}
                    </span>
                  </Link>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                      active ? "text-neutral-900 dark:text-neutral-100" : ""
                    }`}
                  >
                    <item.icon iconClassName="w-6 h-6" className={``} />
                    <span className="text-[11px] leading-none mt-1">
                      {item.name}
                    </span>
                  </div>
                );
              }
            })
          : !excludedRoutes.includes(window.location.pathname) && (
              <ButtonPrimary
                sizeClass="px-2 py-2 sm:px-2 sm:py-2"
                fontSize="text-xs sm:text-sm font-medium"
                href="/login"
                className="w-full"
              >
                Login
              </ButtonPrimary>
            )}
      </div>
    </div>
  );
};

export default FooterNav;


