import React, { useState, useEffect, FC, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../api/config";
import StayCard from "components/StayCard/StayCard";
import { StayDataType, StayDataCard } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";

interface SectionGridFilterCardProps {
  getPropertyFunc: any;
  allPropertyData?: StayDataType[];
  className?: string;
  propertiesData?: StayDataType[];
  typeFilter?: string[];
  setTypefilter?: any;
  fetchTypefilter?: any;
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
  favourite?: boolean;
  setFavourite?: any;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  getPropertyFunc,
  allPropertyData = [],
  className = "",
  typeFilter,
  setTypefilter,
  fetchTypefilter,
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
  favourite,
  setFavourite,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ItemsPerPage = 12;

  const scrollToView = () => {
    const PropertyTop = document.getElementById("PropertyTop");
    PropertyTop?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (Array.isArray(allPropertyData)) {
      setCurrentPage(1);
    }
  }, [allPropertyData]);

  const totalPages = Math.ceil(allPropertyData.length / ItemsPerPage);

  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = Math.min(startIndex + ItemsPerPage, allPropertyData.length);

  const currentData = allPropertyData.slice(startIndex, endIndex);
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    scrollToView();
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToView();
  };

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      {/* <Heading2 /> */}
      <div className="mb-8 lg:mb-11 flex justify-center">
        {typeFilter && (
          <TabFilters
            getPropertyFunc={getPropertyFunc}
            typeFilter={typeFilter}
            setTypefilter={setTypefilter}
            rangePrices={rangePrices}
            setRangePrices={setRangePrices}
            beds={beds}
            setBeds={setBeds}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            amenitiesValues={amenitiesValues}
            setAmenitiesValues={setAmenitiesValues}
            houseRulesValues={houseRulesValues}
            setHouseRulesValues={setHouseRulesValues}
          />
        )}
      </div>

      <div>
        {currentData && currentData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentData.map((property) => (
              <StayCard
                key={property._id}
                currentProperty={property}
                data={property}
                className="shadow-2xl"
                size={"default"}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[400px] text-lg">
            No Data Found For This Search Field.
          </div>
        )}
      </div>

      <div className="flex mt-16 justify-center items-center">
        <Pagination
          className="mt-4"
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollToView={scrollToView}
          onNext={nextPage}
          onPrev={prevPage}
        />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
