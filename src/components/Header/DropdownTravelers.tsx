import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PathName } from "routers/types";



export default function DropdownTravelers() {
  return (
    <div>
      <Popover className="relative border">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`${open ? "" : "text-opacity-90"}
               inline-flex items-center text-opacity-90 group py-2 text-sm sm:text-base font-medium hover:text-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-25 text-sm ml-4 hover:bg-neutral-100 dark:bg-neutral-800 rounded-full p-4`}
            >
              <Link to={"/"}>
                <div className={` inline-flex items-center `} role="button">
                  <span>Home</span>
                </div>
              </Link>
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
              <Popover.Panel className="absolute z-40 w-screen max-w-xs px-4 mt-4 transform -translate-x-1/2 left-1/2 sm:px-0"></Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}


