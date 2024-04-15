import React, { Fragment, useEffect, useState, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { GuestsObject } from "./type";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "context/userContext";

export interface GuestsInputProps {
  getPropertyFunc?: any;
  guests?: any;
  setGuests?: any;
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: string;
  hasButtonSubmit?: boolean;
}

const GuestsInput: FC<GuestsInputProps> = ({
  getPropertyFunc,
  guests,
  setGuests,
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  buttonSubmitHref = "/listing-stay-map",
  hasButtonSubmit = true,
}) => {
  // const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  // const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  // const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);
  const authContext = useContext(AuthContext);
  // searchbar detail page
  const showHeight = authContext.showHeight;
  const setShowHeight = authContext.setShowHeight;
  const guestAdultsInputValue = authContext.guestAdultsInputValue;
  const setGuestAdultsInputValue = authContext.setGuestAdultsInputValue;
  const guestChildrenInputValue = authContext.guestChildrenInputValue;
  const setGuestChildrenInputValue = authContext.setGuestChildrenInputValue;
  const guestInfantsInputValue = authContext.guestInfantsInputValue;
  const setGuestInfantsInputValue = authContext.setGuestInfantsInputValue;
  const totalGuests = guestChildrenInputValue + guestAdultsInputValue;
  const getPropertyData = authContext.getPropertyData;
  const clearAllFilterValues = authContext.clearAllFilterValues;
  const setShowSearchModal = authContext.setShowSearchModal;

  useEffect(() => {
    setGuests(totalGuests);
  }, [totalGuests]);

      const { pathname } = useLocation();
      const navigate = useNavigate();
  const SearchProperty =()=>{
      const redirectToHome = pathname.includes("/detail");
      getPropertyData();
      setShowSearchModal(false);
      clearAllFilterValues();
      if (redirectToHome) {
          navigate("/");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
  }
return (
  <Popover className={`flex relative ${className}`}>
    {({ open }) => {
      if (open) {
        setShowHeight(true);
      } else {
        setShowHeight(false);
      }

      return (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none justify-end ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            {/* <Popover.Button
              type="button"
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
              onClickCapture={() => {
                document.querySelector("html")?.click();
              }}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-sm font-semibold">
                  {totalGuests || ""} Guests
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {totalGuests ? "Guests" : "Add total guests"}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestInfantsInputValue(0);
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                    getPropertyData("clear");
                    // SearchProperty();
                  }}
                />
              )}
            </Popover.Button> */}

            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4 flex flex-end">
                <button
                  type="button"
                  className="h-10 md:h-12 w-full md:w-12 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                  onClick={SearchProperty}
                >
                  <span className="mr-3 md:hidden">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-1 bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={0}
                max={10}
                roomOFbeds={guestAdultsInputValue}
                setRoomOFbeds={setGuestAdultsInputValue}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={0}
                max={4}
                roomOFbeds={guestChildrenInputValue}
                setRoomOFbeds={setGuestChildrenInputValue}
                label="Children"
                desc="Ages 2–12"
              />

              <NcInputNumber
                className="w-full mt-6"
                defaultValue={0}
                max={4}
                roomOFbeds={guestInfantsInputValue}
                setRoomOFbeds={setGuestInfantsInputValue}
                label="Infants"
                desc="Ages 0–2"
              />
            </Popover.Panel>
          </Transition>
        </>
      );
    }}
  </Popover>
);
};

export default GuestsInput;
