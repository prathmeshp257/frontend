"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";
import LocationInput from "./LocationInput";
import GuestsInput from "./GuestsInput";

export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  getPropertyFunc?: any;
  searchLocationValue?: any;
  setSearchLocationValue?: any;
  guests?: any;
  setGuests?: any;
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  getPropertyFunc,
  searchLocationValue,
  setSearchLocationValue,
  guests,
  setGuests,
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <LocationInput
          className="flex-[1.5]"
          searchLocationValue={searchLocationValue}
          setSearchLocationValue={setSearchLocationValue}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="flex-1"
          getPropertyFunc={getPropertyFunc}
          guests={guests}
          setGuests={setGuests}
        />
      </form>
    </div>
  );
};

export default HeroSearchForm;
