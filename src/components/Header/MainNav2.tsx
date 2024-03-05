import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import { Link, useLocation } from "react-router-dom";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import AirbnbYourHome from "shared/Abnb/Abnb";
export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const hasToken = !!localStorage.getItem("token");
  const { pathname } = useLocation();
  
 const navLinks = [
   { to: "/", label: "Home" },
  //  { to: "/ezstays", label: "EZstays Your Home" },
 ];
  return (
    <div className={`nc-MainNav1 nc-MainNav2 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-4 relative flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex justify-between flex-1 items-center space-x-3 sm:space-x-8 lg:space-x-10 px-4">
          <div className="hidden lg:flex justify-center items-center flex-1 ml-44 gap-4">
            {/* Mapping over the navLinks array */}
            {navLinks.map((link, index) => (
              <Link key={index} to={link.to}>
                <div
                  className={` inline-flex items-center text-opacity-90 group py-2 px-4 text-sm sm:text-base font-medium hover:bg-neutral-100 dark:bg-neutral-800 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-opacity-25 rounded-[30px]
                  text-black bg-neutral-100 dark:bg-neutral-800`}
                  role="button"
                >
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-start cursor-pointer">
            <h4 className="text-sm ml-4 hover:bg-neutral-100 dark:bg-neutral-800 rounded-full py-2 px-4">
              EZstays Your Home
            </h4>
          </div>
        </div>

        <div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden items-center lg:flex space-x-1">
            {hasToken ? <AvatarDropdown /> : <AirbnbYourHome />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
