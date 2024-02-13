import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { StayDataCard, StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";

export interface StayCardProps {
  key: String;
  currentProperty: any;
  data: any;
  size: String;
  className: String;
}

const StayCard: FC<StayCardProps> = ({
  key,
  currentProperty,
  data,
  size,
  className,
}) => {
  const {
    _id,
    type,
    title,
    country,
    street,
    room_number,
    city,
    state,
    postal_code,
    lattitude,
    longitude,
    acreage,
    guests,
    bedrooms,
    beds,
    bathrooms,
    kitchen,
    amenities,
    pet,
    party_organizing,
    cooking,
    smoking,
    drinking,
    additional_rules,
    place_descriptions,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    night_min,
    night_max,
    cover_image,
    galleryImgs,
  } = data;
    const address = room_number
      ? `${room_number}, ${street} ${city} ${state}, ${country} ${postal_code}`
      : `${street} ${city} ${state}, ${country} ${postal_code}`;
  const renderSliderGallery = () => {
    const combinedArray = [cover_image || "", ...(galleryImgs || [])];

    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${_id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={combinedArray}
          href={`/detail?propID=${_id}`}
        />
        <BtnLikeIcon isLiked={pet} className="absolute right-3 top-3 z-[1]" />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {type} . {beds} beds
          </span>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ₹{monday}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )}
          </span>
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
     
    >
      {renderSliderGallery()}
      <Link to={cover_image}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;