import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";

import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import React, { useState, FC, useEffect, useContext } from "react";
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
  const [typevalues, setTypevalues] = useState<string[]>([]);
  const [rangePrices, setRangePrices] = useState({ min: 0, max: 0 });
  const [beds, setBeds] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [amenitiesValues, setAmenitiesValues] = useState<string[]>([]);
  const [houseRulesValues, setHouseRulesValues] = useState<string[]>([]);
  //search bar feature
  // const [searchLocationValue, setSearchLocationValue] = useState<string>("");
  // const [guests, setGuests] = useState(0);
  //like feature
  const [favourite, setFavourite] = useState(false);
  const authContext = useContext(AuthContext);
  const functFavourite = authContext.getFavouriteProps;
  const searchLocationValue = authContext.searchLocationValue;
  const setSearchLocationValue = authContext.setSearchLocationValue;
  const guests = authContext.guests;
  const setGuests = authContext.setGuests;
  const setInfo = authContext.setInfo;
  const info = authContext.info;

  const hasToken = !!localStorage.getItem("token");
  const getPropertyData = async (filter_type: String) => {
    try {
      // console.log(guests, "hahaha");
      if (hasToken){
        await functFavourite();
      } 
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

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>easystays || Booking React Template</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* HERO SECTION */}
        <SectionHeroArchivePage
          getPropertyFunc={getPropertyData}
          searchLocationValue={searchLocationValue}
          setSearchLocationValue={setSearchLocationValue}
          guests={guests}
          setGuests={setGuests}
          currentPage="Stays"
          currentTab="Stays"
          className="pt-4 pb-12 lg:pb-14 lg:pt-8 "
        />

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
