import { Tab } from "@headlessui/react";
// import CarCard from "components/CarCard/CarCard";
// import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StayCard from "components/StayCard/StayCard";
// import {
//   DEMO_CAR_LISTINGS,
//   DEMO_EXPERIENCES_LISTINGS,
//   DEMO_STAY_LISTINGS,
// } from "data/listings";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { AuthContext } from "context/userContext";

const AccountSavelists = () => {
  let [categories] = useState(["Stays", "Experiences", "Cars"]);
  
  const authContext = useContext(AuthContext);
  const functFavourite = authContext.getFavouriteProps;
  const dataFavourite = authContext.favPropData;
  useEffect(()=>{
// functFavourite();
console.log(dataFavourite, "favvvvvvvvvvvvvvvvvv");
  },[])

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Save lists</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            {/* <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List> */}
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {dataFavourite
                    .filter((_: any, i: number) => i < 8)
                    .map((property: any) => (
                      <StayCard
                        key={property._id}
                        currentProperty={property}
                        data={property}
                        className="shadow-2xl"
                        size={"default"}
                      />
                    ))}
                  {/* map favourites here.. */}
                  {/* {dataFavourite.map((property) => (
                    <StayCard
                      key={property._id}
                      currentProperty={property}
                      data={property}
                      className="shadow-2xl"
                      size={"default"}
                      favourite={favourite}
                      setFavourite={setFavourite}
                    />
                  ))} */}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;
