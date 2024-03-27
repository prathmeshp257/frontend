import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import React, { useState, FC, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../../api/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "context/userContext";

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const [loading, setLoading] = useState(false);
  //like feature
  const [favourite, setFavourite] = useState(false);
  const authContext = useContext(AuthContext);
  //filter page funct
  const {
    //
    showSearchModal,
    setShowSearchModal,
    showHeight,
    //
    typevalues,
    setTypevalues,
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
  } = authContext;

  //searchbar funct
  const {
    guests: guestSearch,
    getFavouriteProps: functFavourite,
    searchLocationValue,
    setSearchLocationValue,
    guests,
    setGuests,
    setInfo,
    info,
  } = authContext;

  const hasToken = !!localStorage.getItem("token");
  const getPropertyData = async (filter_type: String) => {
    try {
      // if (hasToken) {
      //   await functFavourite();
      // }
      const response = await axios.post(`${API_URL}/property/get-property`, {
        type: filter_type === "type" ? [] : typevalues,
        min: filter_type === "price" ? 0 : rangePrices.min,
        max: filter_type === "price" ? 0 : rangePrices.max,
        beds: filter_type === "rooms" ? 0 : beds > 0 ? beds : undefined,
        bedrooms:
          filter_type === "rooms" ? 0 : bedrooms > 0 ? bedrooms : undefined,
        bathrooms:
          filter_type === "rooms" ? 0 : bathrooms > 0 ? bathrooms : undefined,
        amenities:
          filter_type === "more_filters"
            ? []
            : amenitiesValues.length > 0
            ? amenitiesValues
            : undefined,
        houseRulesValues:
          filter_type === "more_filters"
            ? []
            : houseRulesValues.length > 0
            ? houseRulesValues
            : undefined,
        locationSearch: searchLocationValue,
        guestsSearch: guests,
      });
      if (response.data.error === false) {
        setInfo(response.data.propertydata);
      }
    } catch (err) {
      toast.error("Error while fetching properties data");
      console.error("Error while fetching properties data", err);
    }
  };

  // const dataFavourite = authContext.favPropData;
  useEffect(() => {
    getPropertyData("");
  }, []);
  const renderSearchBar = () => {
    return (
      <div
        style={{
          backgroundColor: showSearchModal
            ? "rgba(0, 0, 0, 0.5)"
            : "transparent",
          opacity: showSearchModal ? 0.9 : 1,
          position: "fixed",
          top: 90,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 50,
          display: showSearchModal ? "block" : "none",
        }}
      >
        <div className={`HeroSearchForm2Mobile`}>
          <Transition appear show={showSearchModal} as={Fragment}>
            <Dialog
              className="HeroSearchFormMobile__Dialog relative z-max"
              onClose={() => setShowSearchModal(false)}
            >
              <div
                className="fixed inset-0 bg-dark-100 dark:bg-neutral-900 opacity-90"
                onClick={() => setShowSearchModal(false)}
              >
                <div className="flex">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out transition-transform"
                    enterFrom="opacity-0 scale-75"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in transition-transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-75"
                  >
                    <Dialog.Panel
                      className="relative h-20vh flex-1 flex flex-col justify-between"
                      style={{
                        minHeight: showHeight ? "75vh" : undefined,
                        backgroundColor: "transparent",
                      }}
                    >
                      {showSearchModal && (
                        <Tab.Group manual>
                          <div
                            className="flex-1 mx-4
                           sm:px-4 flex"
                            style={{ marginLeft: "0px" }}
                          >
                            <Tab.Panels
                              className="flex-1 overflow-y-auto hiddenScrollbar pt-4 container"
                              style={{ marginTop: "6rem" }}
                            >
                              <Tab.Panel>
                                <div className="transition-opacity animate-[myblur_0.4s_ease]">
                                  {showSearchModal && (
                                    <SectionHeroArchivePage
                                      getPropertyFunc={getPropertyData}
                                      searchLocationValue={searchLocationValue}
                                      setSearchLocationValue={
                                        setSearchLocationValue
                                      }
                                      guests={guestSearch}
                                      setGuests={setGuests}
                                      currentPage="Stays"
                                      currentTab="Stays"
                                      className="lg:pb-1"
                                    />
                                  )}
                                </div>
                              </Tab.Panel>
                            </Tab.Panels>
                          </div>
                        </Tab.Group>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className} gap-10`}
      data-nc-id="ListingStayPage"
      // style={{ height: "90vh" }}
    >
      <Helmet>
        <title>easystays || Booking</title>
      </Helmet>
      {/* <BgGlassmorphism /> */}

      <div className="container relative overflow-hidden">
        <h2
          className="font-[600] text-black text-3xl sm:text-4xl md:text-4xl lg:text-2xl xl:text-7xl !leading-[115%] justify-center m-auto text-center p-6"
          style={{
            fontSize: "55px",
            letterSpacing: "-2px",
            wordSpacing: "2px",
          }}
        >
          Travel anywhere, <br /> your getaway, your way!
        </h2>
        {/* HERO SECTION */}
        <SectionHeroArchivePage
          getPropertyFunc={getPropertyData}
          searchLocationValue={searchLocationValue}
          setSearchLocationValue={setSearchLocationValue}
          guests={guests}
          setGuests={setGuests}
          currentPage="Stays"
          currentTab="Stays"
          className="pt-4 pb-12 lg:pb-14 lg:pt-8"
        />
        {renderSearchBar()}
        {/* PROPERTY SECTION */}
        <SectionGridFilterCard
          getPropertyFunc={getPropertyData}
          allPropertyData={info}
          typeFilter={typevalues.length > 0 ? typevalues : []}
          setTypefilter={setTypevalues}
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
          className="pb-24 lg:pb-28"
          propertiesData={info.length > 0 ? info : []}
          //feat like
          favourite={favourite}
          setFavourite={setFavourite}
        />
      </div>
    </div>
  );
};

export default ListingStayPage;
