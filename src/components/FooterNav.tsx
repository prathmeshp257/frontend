import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowsPointingOutIcon,
  ArrowTopRightOnSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PathName } from "routers/types";
import MenuBar from "shared/MenuBar/MenuBar";
import isInViewport from "utils/isInViewport";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { AuthContext } from "../context/userContext";

let WIN_PREV_POSITION = window.pageYOffset;

interface NavItem {
  name: string;
  active_id: string;
  link?: PathName;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: "Explore",
    active_id: "/home",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Profile",
    active_id: "/account",
    link: "/account",
    icon: UserCircleIcon,
  },
  {
    name: "Logout",
    active_id: "logout",
    link: "/",
    icon: ArrowTopRightOnSquareIcon,
  },
  // {
  //   name: "Wishlists",
  //   link: "/account-savelists",
  //   icon: HeartIcon,
  // },
];
const NAV2: NavItem[] = [
  {
    name: "Explore",
    active_id: "/home",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Login",
    active_id: "/login",
    link: "/login",
    icon: UserCircleIcon,
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
  const authContext = useContext(AuthContext);
  const handleLogoutClick = () => {
    authContext.onLogout();
  };
  const [active, setActive] = useState<string>("/home");
  // const activeButtonDefault = () =>{
  //   hasToken?setActive("/home"):setActive("/login");
  // } 
  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
    // activeButtonDefault();
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
  const handleClick = (activeId: string) => {
    setActive(activeId);
    if (activeId === "logout") {
      handleLogoutClick();
    }
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
              const isActive = active === item.active_id;
              if (item.link && !excludedRoutes.includes(item.name)) {
                return (
                  <Link
                    key={index}
                    to={item.link || ""}
                    onClick={() => handleClick(item.active_id)}
                    className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                      isActive ? "text-red-500" : ""
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${isActive ? "text-red-500" : ""}`}
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
          : 
            NAV2.map((item, index) => {
              const isActive = active === item.active_id;
              if (item.link && !excludedRoutes.includes(item.name)) {
                return (
                  <Link
                    key={index}
                    to={item.link || ""}
                    onClick={() => handleClick(item.active_id)}
                    className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                      isActive ? "text-red-500" : ""
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${isActive ? "text-red-500" : ""}`}
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
            })}
      </div>
    </div>
  );
};

export default FooterNav;
