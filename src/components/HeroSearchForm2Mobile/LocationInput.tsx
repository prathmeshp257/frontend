import {
  ClockIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "context/userContext";
import React, { useState, useEffect, useRef, FC, useContext } from "react";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
}

const LocationInput: FC<Props> = ({
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Where to?",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");

  const authContext = useContext(AuthContext);
  const searchLocationValue = authContext.searchLocationValue;
  const setShowModal = authContext.setShowModal;
  const setSearchLocationValue = authContext.setSearchLocationValue;
  const getPropertyFunc = authContext.getPropertyData;

  const handleChangeData = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchLocationValue(e.currentTarget.value);
      setShowModal(false);
      getPropertyFunc();
    } else if (e.currentTarget.value.trim() === "") {
      getPropertyFunc();
    }
  };

  const handleSelectLocation = (item: string) => {
    setValue(item);
  };
  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string;
    items: string[];
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {items.map((item) => {
            return (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm"
                onClick={() => handleSelectLocation(item)}
                key={item}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  const renderRecentSearches = () => {
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <div className="mt-2">
          {[
            "Hamptons, Suffolk County, NY",
            "Las Vegas, NV, United States",
            "Ueno, Taito, Tokyo",
            "Ikebukuro, Toshima, Tokyo",
          ].map((item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item}
              className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              </span>
              <span className=" block text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={"Search destinations"}
            value={searchLocationValue}
            onChange={(e) => {
              setSearchLocationValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              handleChangeData(e);
            }}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        {/* {renderRecentSearch ? renderRecentSearches(): ""} */}
      </div>
    </div>
  );
};

export default LocationInput;
