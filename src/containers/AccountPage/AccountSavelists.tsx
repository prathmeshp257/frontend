import { Tab } from "@headlessui/react";
import StayCard from "components/StayCard/StayCard";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
// import { useNavigation } from '@react-navigation/native';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/userContext";

const AccountSavelists = () => {
  const authContext = useContext(AuthContext);
  const dataFavourite = authContext.favPropData;

  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/");
  };
  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Save lists</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                {dataFavourite && dataFavourite.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {dataFavourite
                      .filter((_: any, i: number) => i < 8)
                      .map((property: any) => (
                        <StayCard
                          key={property?._id}
                          currentProperty={property}
                          data={property}
                          className="shadow-2xl"
                          size={"default"}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[252px] text-lg">
                    There Is No Favourite Property Availabe
                  </div>
                )}

                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary onClick={handleShowMore}>
                    Show me more
                  </ButtonSecondary>
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
