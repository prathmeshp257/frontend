import { Popover, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ArrowTrendingUpIcon,
  ArrowsPointingInIcon,
  FingerPrintIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "context/userContext";
import React from "react";
import Avatar from "../Avatar/Avatar";
import default_Img  from "../../images/avatars/user_icon.png";

const solutions = [
  {
    name: "Log in",
    href: "/login",
    icon: FingerPrintIcon,
  },
  {
    name: "Sign up",
    href: "/signup",
    icon: UserPlusIcon,
  },
];

const solutionsFoot = [
  {
    name: "EZstay your home",
    href: "/",
    icon: HomeIcon,
  },
];
const AirbnbYourHome = () => {

  return (
    <div className="AvatarDropdown relative">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <div
                className="border flex gap-4 pl-3 pr-2 py-2"
                style={{ borderRadius: "35px", transition: "box-shadow 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 2px rgba(0, 0, 0, 0.5)")
                }
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex justify-center m-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="flex justify-center m-auto">
                  <Avatar
                    sizeClass="w-8 h-8 sm:w-7 sm:h-7"
                    imgUrl={default_Img}
                  />
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-12 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutions.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          {item.icon && (
                            <item.icon aria-hidden="true" className="w-6 h-6" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  {/* <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot && solutionsFoot.length > 0 &&  solutionsFoot.map((item: any, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          {item.icon && (
                            <item.icon aria-hidden="true" className="w-6 h-6" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
                            {item.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AirbnbYourHome;
