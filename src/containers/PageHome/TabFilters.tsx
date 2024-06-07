import React, { FC, Fragment, useContext, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import convertNumbThousand from "utils/convertNumbThousand";
import { AuthContext } from "context/userContext";

// case "Homestays":
//         return "Homestays: A luxurious residence, often with expansive grounds, offering comfort, privacy, and upscale amenities.";
//       case "Villas":
//         return "Villa: A luxurious residence, often with expansive grounds, offering comfort, privacy, and upscale amenities.";
//       case "Hotels":
//         return "Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor";
//       case "PGs":
//         return "Cottage: A cozy dwelling, typically in a rural or semi-rural location, often used for vacations or retreats.";
//       default:
//         return "A catchy name usually includes: House name + Room name + Featured property + Tourist destination";
const typeOfPaces = [
  {
    defaultChecked: false,
    name: "Homestays",
    description: "Find your perfect hotel room",
  },
  {
    defaultChecked: false,
    name: "Hotels",
    description: "Find your perfect hotel room",
  },
  {
    defaultChecked: false,
    name: "Villas",
    description: "Rent luxurious villas for your stay",
  },
  {
    defaultChecked: false,
    name: "PGs",
    description: "Experience rustic cabins in scenic locations",
  }
];

const moreFilter1 = [
  { name: "Kitchen", defaultChecked: false },
  { name: "Air conditioning", defaultChecked: false },
  { name: "Heating", defaultChecked: false },
  { name: "Dryer", defaultChecked: false },
  { name: "Washer", defaultChecked: false },
  { name: "Wifi", defaultChecked: false },
  { name: "Indoor fireplace", defaultChecked: false },
  { name: "Breakfast", defaultChecked: false },
  { name: "Hair dryer", defaultChecked: false },
  { name: " Dedicated workspace", defaultChecked: false },
];

const moreFilter2 = [
  { name: "Free parking on premise", defaultChecked: false },
  { name: "Hot tub", defaultChecked: false },
  { name: "Gym", defaultChecked: false },
  { name: "Pool", defaultChecked: false },
  { name: "EV charger", defaultChecked: false },
];

const moreFilter3 = [
  { name: " House", defaultChecked: false },
  { name: "Bed and breakfast", defaultChecked: false },
  { name: "Apartment", defaultChecked: false },
  { name: " Boutique hotel", defaultChecked: false },
  { name: " Bungalow", defaultChecked: false },
  { name: " Chalet", defaultChecked: false },
  { name: " Condominium", defaultChecked: false },
  { name: " Cottage", defaultChecked: false },
  { name: " Guest suite", defaultChecked: false },
  { name: " Guesthouse", defaultChecked: false },
];

const moreFilter4 = [{ name: "Pets allowed" }, { name: "Smoking allowed" }];
export interface filterCardProps {
  className?: string;
  getPropertyFunc: any;
  propertiesData?: any;
  typeFilter?: string[];
  setTypefilter?: any;
  rangePrices?: {};
  setRangePrices?: any;
  beds?: number;
  setBeds?: any;
  bedrooms?: number;
  setBedrooms?: any;
  bathrooms?: number;
  setBathrooms?: any;
  amenitiesValues?: string[];
  setAmenitiesValues?: any;
  houseRulesValues?: string[];
  setHouseRulesValues?: any;
}

const TabFilters: FC<filterCardProps> = ({
  getPropertyFunc,
  typeFilter,
  setTypefilter,
  rangePrices,
  setRangePrices,
  beds,
  setBeds,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  amenitiesValues,
  setAmenitiesValues,
  houseRulesValues,
  setHouseRulesValues,
}) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  //
  const authContext = useContext(AuthContext);
  const getPropertyData = authContext.getPropertyData;
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

  const handleTypeCheckboxChange = (name: string, checked: boolean) => {
    if (checked) {
      setTypefilter((prevFilter: string[]) => {
        if (!prevFilter.includes(name)) {
          return [...prevFilter, name];
        }
        return prevFilter;
      });
    } else {
      setTypefilter((prevFilter: string[]) =>
        prevFilter.filter((item: string) => item !== name)
      );
    }
  };
  const handleAmenitiesCheckboxChange = (
    name: string,
    checked: boolean,
    state: any,
    setState: any
  ) => {
    if (checked) {
      setState((newArray: string[]) => {
        if (!newArray.includes(name)) {
          return [...newArray, name];
        }
        return newArray;
      });
    } else {
      setState((newArray: string[]) =>
        newArray.filter((item: string) => item !== name)
      );
    }
  };
  const handleCleartypefilter = () => {
    setTypefilter([]);
    getPropertyFunc("type");
  };
  const handleApplytypefilter = () => {
    getPropertyFunc();
  };
  const handleClearPricefilter = () => {
    setRangePrices({ min: 0, max: 0 });

    getPropertyFunc("price");
  };
  const handleApplyPricefilter = () => {
    getPropertyFunc();
  };
  const handleClearRoomsfilter = () => {
    setBeds(0);
    setBedrooms(0);
    setBathrooms(0);
    getPropertyFunc("rooms");
  };
  const handleApplyRoomsfilter = () => {
    getPropertyFunc();
  };
  const handleClearMorefilter = () => {
    setAmenitiesValues([]);
    setHouseRulesValues([]);
    closeModalMoreFilter();
    getPropertyFunc("more_filters");
  };
  const handleApplyMorefilter = () => {
    getPropertyFunc();
  };
  const handleApplyMorefilterMobile = () => {
    getPropertyFunc();
  };
  const renderXClear = (typez: String) => {
    return (
      <span
        className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer"
        onClick={() => {
          switch (typez) {
            case "more_filters":
              handleClearMorefilter();
              break;
            case "room_filters":
              handleClearRoomsfilter();
              break;
            case "price_filters":
              handleClearPricefilter();
              break;
            case "type_filters":
              handleCleartypefilter();
              break;
            default:
              handleClearMoreFilterMobile();
              getPropertyData();
              break;
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };
  const handleClearMoreFilterMobile = () => {
    setRangePrices({ min: 0, max: 0 });
    setTypefilter([]);
    setBeds(0);
    setBedrooms(0);
    setBathrooms(0);
    setAmenitiesValues([]);
    setHouseRulesValues([]);
  };
  const renderTabsTypeOfPlace = (
    data: {
      name: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
    flex items-center justify-center px-4 py-2 text-sm rounded-full border 
    border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 
    dark:hover:border-neutral-500 focus:outline-none ${
      open ? "!border-neutral-400" : ""
    } 
    ${
      typeFilter && typeFilter.length > 0
        ? "border-primary-500 text-primary-700"
        : ""
    }`}
            >
              <span>Type of place</span>
              {typeFilter && typeFilter.length > 0 ? (
                renderXClear("type_filters")
              ) : (
                <i className="las la-angle-down ml-2"></i>
              )}
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
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfPaces.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.description}
                          defaultChecked={
                            typeFilter?.includes(item.name) ?? false
                          }
                          onChange={(checked: boolean) =>
                            handleTypeCheckboxChange(item.name, checked)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        handleCleartypefilter();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        handleApplytypefilter();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsRoomAndBeds = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none ${
                open ? "!border-neutral-400" : ""
              } 
              ${
                (beds && beds > 0) ||
                (bedrooms && bedrooms > 0) ||
                (bathrooms && bathrooms > 0)
                  ? "border-primary-500 text-primary-700"
                  : ""
              }
              `}
            >
              <span>Rooms of Beds</span>
              {(beds && beds > 0) ||
              (bedrooms && bedrooms > 0) ||
              (bathrooms && bathrooms > 0) ? (
                renderXClear("room_filters")
              ) : (
                <i className="las la-angle-down ml-2"></i>
              )}
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
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <NcInputNumber
                      label="Beds"
                      max={10}
                      roomOFbeds={beds}
                      setRoomOFbeds={setBeds}
                    />
                    <NcInputNumber
                      label="Bedrooms"
                      max={10}
                      roomOFbeds={bedrooms}
                      setRoomOFbeds={setBedrooms}
                    />
                    <NcInputNumber
                      label="Bathrooms"
                      max={10}
                      roomOFbeds={bathrooms}
                      setRoomOFbeds={setBathrooms}
                    />
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        handleClearRoomsfilter();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        handleApplyRoomsfilter();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsPriceRage = (rangePrices: any, setRangePrices: any) => {
    const { min, max } = rangePrices;
    const handleSliderChange = (value: [number, number]) => {
      setRangePrices({ min: value[0], max: value[1] });
    };
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border 
    border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 
    dark:hover:border-neutral-500 focus:outline-none ${
      open ? "!border-neutral-400" : ""
    }  ${max && max > 0 ? "border-primary-500 text-primary-700" : ""}`}
            >
              <span>
                {`₹${convertNumbThousand(min)} - ₹${convertNumbThousand(max)}`}{" "}
              </span>
              {max && max > 0 ? (
                renderXClear("price_filters")
              ) : (
                <i className="las la-angle-down ml-2"></i>
              )}
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
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div
                  className={`overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700`}
                >
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price per day</span>
                      <Slider
                        range
                        className="text-red-400"
                        min={0}
                        max={25000}
                        defaultValue={[min, max]}
                        allowCross={false}
                        onChange={(value: any) => handleSliderChange(value)}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              ₹
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={min}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              ₹
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={max}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* copy */}
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        handleClearPricefilter();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        handleApplyPricefilter();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      defaultChecked?: boolean;
    }[],
    state: any[],
    setState: any
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              defaultChecked={state?.includes(item.name) ?? false}
              onChange={(checked: boolean) =>
                handleAmenitiesCheckboxChange(
                  item.name,
                  checked,
                  state,
                  setState
                )
              }
              label={item.name}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              defaultChecked={state?.includes(item.name) ?? false}
              onChange={(checked: boolean) =>
                handleAmenitiesCheckboxChange(
                  item.name,
                  checked,
                  state,
                  setState
                )
              }
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTabMoreFilter = (
    amenitiesValues: any,
    houseRulesValues: any,
    setAmenitiesValues: any,
    setHouseRulesValues: any
  ) => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 
    dark:hover:border-neutral-500 focus:outline-none  cursor-pointer ${
      (amenitiesValues && amenitiesValues.length > 0) ||
      (houseRulesValues && houseRulesValues.length > 0)
        ? "border-primary-500 text-primary-700"
        : ""
    }`}
          onClick={openModalMoreFilter}
        >
          <span>More filters (2)</span>
          {(amenitiesValues && amenitiesValues.length > 0) ||
          (houseRulesValues && houseRulesValues.length > 0) ? (
            renderXClear("more_filters")
          ) : (
            <i className="las la-angle-down ml-2"></i>
          )}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as="div"
                className="inline-block py-8 px-2 h-[50%] w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      More filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Amenities</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            moreFilter1,
                            amenitiesValues,
                            setAmenitiesValues
                          )}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">House rules</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            moreFilter4,
                            houseRulesValues,
                            setHouseRulesValues
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        closeModalMoreFilter();
                        handleClearMorefilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        closeModalMoreFilter();
                        handleApplyMorefilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const renderTabMoreFilterMobile = (
    rangePrices: any,
    setRangePrices: any,
    amenitiesValues: any,
    houseRulesValues: any,
    setAmenitiesValues: any,
    setHouseRulesValues: any
  ) => {
    const { min, max } = rangePrices;
    const handleSliderChange = (value: [number, number]) => {
      setRangePrices({ min: value[0], max: value[1] });
    };
    return (
      <div>
        <div
          className={`flex lg:hidden items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilterMobile}
        >
          <span>More filters (5)</span>
          {renderXClear("default")}
        </div>

        <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilterMobile}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as="div"
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      More filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilterMobile} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Type of place</h3>
                        <div className="mt-6 relative ">
                          {renderTabsTypeOfPlace(typeOfPaces)}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="space-y-5">
                            <Slider
                              range
                              className="text-red-400"
                              min={0}
                              max={25000}
                              defaultValue={[min, max]}
                              allowCross={false}
                              onChange={(value: any) =>
                                handleSliderChange(value)
                              }
                            />
                          </div>

                          <div className="flex justify-between space-x-5">
                            <div>
                              <label
                                htmlFor="minPrice"
                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                              >
                                Min price
                              </label>
                              <div className="mt-1 relative rounded-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-neutral-500 sm:text-sm">
                                    ₹
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="minPrice"
                                  disabled
                                  id="minPrice"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                  value={min}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="maxPrice"
                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                              >
                                Max price
                              </label>
                              <div className="mt-1 relative rounded-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-neutral-500 sm:text-sm">
                                    ₹
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  disabled
                                  name="maxPrice"
                                  id="maxPrice"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                  value={max}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Rooms and beds</h3>
                        <div className="mt-6 relative flex flex-col space-y-5">
                          <NcInputNumber
                            label="Beds"
                            max={10}
                            roomOFbeds={beds}
                            setRoomOFbeds={setBeds}
                          />
                          <NcInputNumber
                            label="Bedrooms"
                            max={10}
                            roomOFbeds={bedrooms}
                            setRoomOFbeds={setBedrooms}
                          />
                          <NcInputNumber
                            label="Bathrooms"
                            max={10}
                            roomOFbeds={bathrooms}
                            setRoomOFbeds={setBathrooms}
                          />
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Amenities</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            moreFilter1,
                            amenitiesValues,
                            setAmenitiesValues
                          )}
                        </div>
                      </div>
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">House rules</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            moreFilter4,
                            houseRulesValues,
                            setHouseRulesValues
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        closeModalMoreFilterMobile();
                        handleClearMoreFilterMobile();
                        getPropertyData();
                        // getPropertyFunc();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        closeModalMoreFilterMobile();
                        handleApplyMorefilterMobile();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">
        {renderTabsTypeOfPlace(typeOfPaces)}
        {renderTabsPriceRage(rangePrices, setRangePrices)}
        {renderTabsRoomAndBeds()}
        {renderTabMoreFilter(
          amenitiesValues,
          houseRulesValues,
          setAmenitiesValues,
          setHouseRulesValues
        )}
      </div>
      {renderTabMoreFilterMobile(
        rangePrices,
        setRangePrices,
        amenitiesValues,
        houseRulesValues,
        setAmenitiesValues,
        setHouseRulesValues
      )}
    </div>
  );
};

export default TabFilters;
