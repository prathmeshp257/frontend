import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC, useContext } from "react";
import ClearDataButton from "./ClearDataButton";
import { AuthContext } from "context/userContext";
import { useLocation, useNavigate } from "react-router-dom";

export interface LocationInputProps {
  getPropertyFunc?: any;
  searchLocationValue?: any;
  setSearchLocationValue?: any;
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
  getPropertyFunc,
  searchLocationValue,
  setSearchLocationValue,
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(autoFocus);
  const authContext = useContext(AuthContext);
  const clearAllFilterValues = authContext.clearAllFilterValues;
  const setShowSearchModal = authContext.setShowSearchModal;

  const searchLocationFunction = () => {
    if (searchLocationValue && "") {
      getPropertyFunc();
    }
  };
  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const SearchProperty = () => {
  //   const redirectToHome = pathname.includes("/detail");
  //   getPropertyData();
  //   setShowSearchModal(false);
  //   clearAllFilterValues();
  //   if (redirectToHome) {
  //     navigate("/");
  //   }
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  const handleChangeData = (e: any) => {
    const redirectToHome = pathname.includes("/detail");
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchLocationValue(e.currentTarget.value);
      getPropertyFunc();
      setShowSearchModal(false);
      clearAllFilterValues();
       if (redirectToHome) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (e.currentTarget.value.trim() === "") {
      getPropertyFunc();
    }
  };

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };
  const handleSelectLocation = (item: string) => {
    setValue(item);
    setShowPopover(false);
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        {/* <div className="flex-grow">
          <span className="block xl:text-sm font-semibold">
            {totalGuests || ""} Guests
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {totalGuests ? "Guests" : "Add total guests"}
          </span>
        </div> */}
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 pl-1 focus:outline-none focus:placeholder-neutral-300 xl:text-md font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate p-0`}
            style={{ padding: "0" }}
            placeholder={placeHolder}
            value={searchLocationValue}
            autoFocus={showPopover}
            type="text"
            onChange={(e) => {
              setSearchLocationValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              handleChangeData(e);
            }}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1 ">
              {!!value ? placeHolder : desc}
            </span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setSearchLocationValue("");
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}
    </div>
  );
};

export default LocationInput;
