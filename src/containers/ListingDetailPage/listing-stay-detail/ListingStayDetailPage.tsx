import React, { FC, Fragment, useEffect, useState } from "react";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../api/config";
import axios from "axios";
import DetailPagetLayout from "../Layout";

const StayDetailPageContainer: FC<{}> = () => {
  const [propertyData, setPropertyData] = useState<any>({});
  const queryParams = new URLSearchParams(window.location.search);
  const propIdParam = queryParams.get("propID");

  const pathname = window.location.pathname;

  const getOnePropertyDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/property/get-propertyCard-details?id=${propIdParam}`
      );
      if (response.data.error === false) {
        setPropertyData(response.data.propertyDetails);
      }
    } catch (err) {
      toast.error("Error while fetching properties data");
      console.error("error while fetching properties data", err);
    }
  };
  //
  useEffect(() => {
    getOnePropertyDetails();
  }, []);
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
  } = propertyData;
  //photos
  const arrayOfPrice = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  ];
  const getDayOfWeek = (index: number): string => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return daysOfWeek[index];
  };
  const PHOTOS: string[] = [];
  if (cover_image) {
    PHOTOS.push(cover_image);
  }
  if (galleryImgs) {
    PHOTOS.push(...galleryImgs);
  }

  const Amenities_demos = [
    { name: "Washing machine", icon: "la-utensils" },
    { name: "Makeup table", icon: "la-hot-tub" },
    { name: "Detergent", icon: "la-spa" },
    { name: "Cloth hook", icon: "la-tshirt" },
    { name: "Fridge", icon: "la-ice-cream" },
    { name: "Free toiletries", icon: "la-bath" },
    { name: "Wifi", icon: "la-wifi" },
    { name: "Internet", icon: "la-globe" },
    { name: "TV", icon: "la-tv" },
    { name: "Air conditioning", icon: "la-thermometer-half" },
    { name: "Fan", icon: "la-fan" },
    { name: "Private entrance", icon: "la-door-closed" },
    { name: "Heater", icon: "la-fire" },
    { name: "Clothes dryer", icon: "la-tshirt" },
    { name: "Baby cot", icon: "la-baby" },
    { name: "Desk", icon: "la-desktop" },
    { name: "Dryer", icon: "la-wind" },
    { name: "Wardrobe", icon: "la-tshirt" },
    { name: "Extra cushion", icon: "la-couch" },
    { name: "Gas stove", icon: "la-fire-alt" },
    { name: "Toilet paper", icon: "la-toilet-paper" },
    { name: "Hot pot", icon: "la-coffee" },
    { name: "Bathroom heaters", icon: "la-shower" },
    { name: "Kettle", icon: "la-coffee" },
    { name: "Dishwasher", icon: "la-dumpster" },
    { name: "BBQ grill", icon: "la-fire" },
    { name: "Toaster", icon: "la-bread-slice" },
    { name: "Towel", icon: "la-bath" },
    { name: "Dining table", icon: "la-chair" },
    { name: "Fire siren", icon: "la-bell" },
    { name: "Fire extinguisher", icon: "la-fire-extinguisher" },
    { name: "Anti-theft key", icon: "la-key" },
    { name: "Safe vault", icon: "la-lock" },
  ];

  interface Amenity {
    name: string;
    icon: string;
  }
  const newAmmenities: Amenity[] = [];
  {
    amenities &&
      Amenities_demos.forEach((amenity) => {
        if (amenities.includes(amenity.name)) {
          newAmmenities.push({
            name: amenity.name,
            icon: amenity.icon,
          });
        }
      });
  }

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const thisPathname = useLocation().pathname;
  const router = useNavigate();

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
  };
  const address1 = `${city} ${state}, ${country} ${postal_code}`;
  const address = room_number
    ? `${room_number}, ${street} ${city} ${state}, ${country} ${postal_code}`
    : `${street} ${city} ${state}, ${country} ${postal_code}`;
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name={type} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        {propertyData && (
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {title}
          </h2>
        )}

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            {propertyData && <span className="ml-1"> {address1}</span>}
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar
            hasChecked
            sizeClass="h-10 w-10"
            radius="rounded-full"
            userName={propertyData?.ownerID?.name || ""}
            imgUrl={propertyData?.ownerID?.image || ""}
          />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {propertyData?.ownerID?.name || "Not found"}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {guests} <span className="hidden sm:inline-block">guests</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              {beds} <span className="hidden sm:inline-block">beds</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bath text-2xl"></i>
            <span className=" ">
              {bathrooms}
              <span className="hidden sm:inline-block">baths</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-door-open text-2xl"></i>
            <span className=" ">
              {bedrooms}{" "}
              <span className="hidden sm:inline-block">bedrooms</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Stay information</h2>
        <span className="text-neutral-6000 dark:text-neutral-300">
          {place_descriptions}
        </span>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {newAmmenities
            .filter((_, i) => i < 5)
            .map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <i className={`text-3xl las ${item.icon}`}></i>
                <span className=" ">{item.name}</span>
              </div>
            ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        {newAmmenities.length > 5 ? (
          <div>
            <ButtonSecondary onClick={openModalAmenities}>
              Show all {newAmmenities.length} amenities
            </ButtonSecondary>
          </div>
        ) : (
          ""
        )}
        {renderMotalAmenities()}
      </div>
    );
  };

  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {newAmmenities
                      .filter((_, i) => i < 1212)
                      .map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                        >
                          <i
                            className={`text-4xl text-neutral-6000 las ${item.icon}`}
                          ></i>
                          <span>{item.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
        </div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            {arrayOfPrice.map((price, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-800" : ""
                } flex justify-between items-center space-x-4 rounded-lg`}
              >
                <span>{getDayOfWeek(index)}</span>
                <span>
                  {Number(price).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            ))}

            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>{night_min} night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>{night_max} nights</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
            userName={propertyData?.ownerID?.name || ""}
            imgUrl={propertyData?.ownerID?.image || ""}
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {propertyData?.ownerID?.name || "Not found"}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    const latitude = 19.3507866;
    const longitude = 72.8072246;
    //     Latitude: 19.4049° N
    // Longitude: 72.8614° E
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {address}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              title="x"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=${latitude},${longitude}&zoom=14`}
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    const arrayofRules = [
      { name: "Pet", rule: pet },
      { name: "Party Organizing", rule: party_organizing },
      { name: "Cooking", rule: cooking },
      { name: "Smoking", rule: smoking },
      { name: "Drinking", rule: drinking },
    ];
    const convertToAllowedString = (allowed: Boolean) =>
      allowed ? "Allowed" : "Not allowed";
    const convertedRules = arrayofRules.map((rule: any) => ({
      ...rule,
      time: convertToAllowedString(rule),
    }));
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Rules Of Property</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">House Rules</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            {arrayofRules.map((item, index) => (
              <div
                key={index}
                className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
              >
                {/* <span className="font-semibold">{item.name}</span> */}
                <span>{item.name}</span>
                <span>{convertToAllowedString(item.rule)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Additional Rules</h4>
          <div className="prose sm:prose">
            {additional_rules && additional_rules.length > 0 ? (
              <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                {additional_rules.map((rule: string, index: number) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            ) : (
              <span className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                No Additional Rules
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        {renderSection4()}
        {/* SUBMIT */}
        <ButtonPrimary href={"/checkout"}>Show Phone no.</ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
            onClick={handleOpenModalImageGallery}
          >
            <img
              className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
              src={PHOTOS[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                index >= 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <img
                  className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                  src={item || ""}
                  alt=""
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {/* {renderSection4()} */}
          {/* <SectionDateRange /> */}
          {renderSection5()}
          {renderSection6()}
          {/* {renderSection7()} */}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className=" lg:block flex-grow mt-5 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default function ListingStayDetailPage() {
  return (
    <DetailPagetLayout>
      <StayDetailPageContainer />
    </DetailPagetLayout>
  );
}
