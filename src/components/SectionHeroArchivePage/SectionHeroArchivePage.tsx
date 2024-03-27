import React, { FC, ReactNode } from "react";
import imagePng from "images/hero-right2.png";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";

export interface SectionHeroArchivePageProps {
  getPropertyFunc?: any;
  searchLocationValue?: any;
  setSearchLocationValue?: any;
  guests?: any;
  setGuests?: any;
  className?: string;
  listingType?: ReactNode;
  currentPage: "Stays" | "Experiences" | "Cars" | "Flights";
  currentTab: SearchTab;
  rightImage?: string;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  getPropertyFunc,
  searchLocationValue,
  setSearchLocationValue,
  guests,
  setGuests,
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className} gap-10`}
      data-nc-id="SectionHeroArchivePage"
    >
      <h2
        className="font-[600] text-black text-3xl sm:text-4xl md:text-4xl lg:text-2xl xl:text-7xl !leading-[115%] justify-center m-auto text-center"
        style={{
          fontSize: "55px",
          letterSpacing: "-2px",
          wordSpacing: "2px",
        }}
      >
        Travel anywhere, <br /> your getaway, your way!
      </h2>
      <div className="hidden lg:flow-root w-full">
        <div className="z-10 lg:-mt-10 xl:-mt-12 w-full">
          <HeroSearchForm
            currentPage={currentPage}
            currentTab={currentTab}
            getPropertyFunc={getPropertyFunc}
            searchLocationValue={searchLocationValue}
            setSearchLocationValue={setSearchLocationValue}
            guests={guests}
            setGuests={setGuests}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
