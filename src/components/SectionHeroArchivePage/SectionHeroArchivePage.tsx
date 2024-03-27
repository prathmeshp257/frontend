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
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
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
