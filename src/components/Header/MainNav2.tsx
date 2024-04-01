import React, { FC, useContext, useEffect, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import { WalletIcon } from "@heroicons/react/24/outline";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWallet } from "@fortawesome/free-solid-svg-icons";
import AvatarDropdown from "./AvatarDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import { Link, useLocation } from "react-router-dom";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import AirbnbYourHome from "shared/Abnb/Abnb";
import { AuthContext } from "context/userContext";
// import HeroSearchForm2Mobile from "components/HeroSearchForm2Mobile/HeroSearchForm2Mobile";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "api/config";
import HeroSearchFormDetailPage from "components/HeroSearchForm2Mobile/HeroSearchFormDetailPage";
export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
    const [showSearchBarOnScroll, setShowSearchBarOnScroll] = useState(false);

  const hasToken = !!localStorage.getItem("token");
const { pathname } = useLocation();
const showSearchBarDetailPage = pathname.includes("/detail");
  const authContext = useContext(AuthContext);

  // searchbar detail page
  const showSearchModal = authContext.showSearchModal;
//  const navLinks = [
//    { to: "/", label: "Home" },
//   //  { to: "/ezstays", label: "EZstays Your Home" },
//  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setShowSearchBarOnScroll(true);
      } else {
        setShowSearchBarOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`nc-MainNav1 nc-MainNav2 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-4 relative flex justify-between items-center border-b border-gray-200">
        <Logo />
        <div
          className="hidden md:flex justify-end flex-1 items-center space-x-3 sm:space-x-8 lg:space-x-10 "
          style={{ paddingRight: "4rem" }}
        >
          {/* This div should be at the end of the parent div */}
          <div className="flex justify-center flex-[2] max-w-lg">
            {showSearchBarDetailPage ||
              showSearchBarOnScroll ? (
                // !showSearchModal &&
                <div
                  className="mx-auto md:px-3"
                  style={{
                    transition: "width 2s ease",
                    width: "155%",
                  }}
                >
                  <HeroSearchFormDetailPage />
                </div>
              ): null}
          </div>

          {/* This div should be in the center of the parent div */}
          <div className="flex justify-center items-center cursor-pointer">
            <a
              href="https://easystays-owners.infinydev.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 className="text-sm ml-4 hover:bg-neutral-100 dark:bg-neutral-800 rounded-full py-2 px-4">
                EZstays Your Home
              </h4>
            </a>
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
function functFavourite() {
  throw new Error("Function not implemented.");
}

function setInfo(propertydata: any) {
  throw new Error("Function not implemented.");
}

