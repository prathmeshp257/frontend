import React, { FC, Fragment, useContext, useEffect, useState } from "react";
//
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import DialogTitle from "@mui/material/DialogTitle";
//
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Tab, Transition } from "@headlessui/react";
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
import moment from "moment";
import { AuthContext } from "context/userContext";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import StaySearchForm from "components/HeroSearchForm/(stay-search-form)/StaySearchForm";
import ButtonSubmit from "components/HeroSearchForm/ButtonSubmit";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";

const StayDetailPageContainer: FC<{}> = () => {
  const [configData, setConfigData] = useState<any>({});
  const [show, setShow] = useState<any>(false);
  const [propertyData, setPropertyData] = useState<any>({});
  const [totalOwnerProperty, setTotalOwnerProperty] = useState<number>(0);

  const authContext = useContext(AuthContext);
const {
  showSearchModal,
  setShowSearchModal,
  getPropertyData,
  searchLocationValue,
  setSearchLocationValue,
  showHeight,
  setGuestChildrenInputValue,
  setGuestInfantsInputValue,
  guests: guestSearch,
  setGuests,
  setInfo,
  userData,
  allReview,
  setAllReview,
  reviewValue,
  setReviewValue,
  ratingValue,
  setRatingValue,
  avgRating,
  setAvgRating,
} = authContext;

  const queryParams = new URLSearchParams(window.location.search);
  const propIdParam = queryParams.get("propID");
  const token = localStorage.getItem("token");

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

 // rating and review 

  //  const [allReview, setAllReview] = useState<any>([]);
  //  const [reviewValue, setReviewValue] = useState("");
  //  const [ratingValue, setRatingValue] = useState(5);
  //  const [avgRating, setAvgRating] = useState(0);
   const [errorEmptyReview, setErrorEmptyReview] = useState("");

  const pathname = window.location.pathname;
  //rating allReviews
  const getPropertyRatings = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/get-prop-review?propId=${propIdParam}`
      );
      if (response.data.error === false) {
        setAllReview(response.data?.allReviews);
        calculateAverageRating(response.data?.allReviews);
      }
    } catch (err) {
      console.error("error while fetching userInfo", err);
      toast.error(`${err}`);
    }
  };
  const calculateAverageRating = (allReview:any) => {
    if (allReview.length > 0) {
      const allRating = allReview.reduce((total: number, review: any) => {
        return total + review.rating;
      }, 0);
      const average = allRating / allReview.length;
      setAvgRating(Number(average.toFixed(1)));
    } else {
      setAvgRating(0);
    }
  };
  //
  const getOnePropertyDetails = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/property/get-propertyCard-details?id=${propIdParam}&userId=${userData._id}`
      );
      if (response.data.error === false) {
        if (response.data.getTransaction) {
          setShow(true);
        }
        setPropertyData(response.data.propertyDetails);
        setTotalOwnerProperty(response.data.countTotalProperties);
        getPropertyRatings();
      }
    } catch (err) {
      toast.error("Error while fetching property details");
      console.error("Error fetching details", err);
    }
  };
  //show phone number
  const getPhoneNumber = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("You need login to view phone number..");
    }
    const queryParams = new URLSearchParams(window.location.search);
    const propIdParam = queryParams.get("propID");
    try {
      const response = await axios.post(
        `${API_URL}/users/showphone?propId=${propIdParam}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.error === true) {
        setShow(false);
        return toast.error(`${response.data.message}`);
      }
      setShow(true);
      toast.success("phone number fetch successfully");
    } catch (err) {
      toast.error(`${err}`);
      setShow(false);
    }
    authContext.getAdminData();
  };
  //get coins from config
  const getConfigCoins = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/users/getConfigCoin`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.error === true) {
        return toast.error(`${response.data.message}`);
      }
      setConfigData(response.data.configDB);
    } catch (err) {
      toast.error(`${err}`);
    }
  };

    const handleChangeReview = (e: any) => {
      setReviewValue(e.target.value);
      setErrorEmptyReview("");
    };

    const handleSubmitReview = async () => {
      const token = localStorage.getItem("token");
      if (reviewValue === "") {
        setErrorEmptyReview("Please enter your thoughts.");
        return;
      } else {
        setErrorEmptyReview("");
      }
      try {
        const response = await axios.post(
          `${API_URL}/users/add-review`,
          {
            propId: propIdParam,
            review: reviewValue,
            rating: ratingValue,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        if (response.data.error === false) {
          toast.success(<>review posted!</>);
          getPropertyRatings();
          setReviewValue("");
          setRatingValue(5);
          getPropertyData();
        }
      } catch (err) {
        console.error("error while fetching userInfo", err);
        toast.error(`${err}`);
      }
    };

  useEffect(() => {
    getOnePropertyDetails();
  }, []);

  const handleConfirmPhoneNumber = () => {
    getPhoneNumber();
    setConfirmDialogVisible(false);
  };

  const handleCancelPhoneNumber = () => {
    setConfirmDialogVisible(false);
  };

  const {
    _id,
    type,
    subtype,
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
  const today = new Date().getDay();
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
    router(`${thisPathname}?modal=PHOTO_TOUR_SCROLLABLE&propID=${propIdParam}`);
  };
  const onClickShowPhoneNumber = () => {
    if (!token) {
      return toast.error("You need login to view phone number..");
    }
    getConfigCoins();
    setConfirmDialogVisible(true);
  };
    const {
      //rating
      ratingInfo,
    } = authContext;
  const avg = ratingInfo.filter((val: any) => val._id === _id);

  const reviewStart = avg.length;
  const address1 = `${street}, ${city} ${state}, ${country} ${postal_code}`;
  const address = room_number
    ? `${room_number}, ${street} ${city} ${state}, ${country} ${postal_code}`
    : `${street} ${city} ${state}, ${country} ${postal_code}`;

  //SEARCCH BAR DETAIL PAGE
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

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name={`${type} - ${subtype? subtype: ""}`} />
          <LikeSaveBtns propID={propIdParam} />
          {/* {subtype} */}
        </div>

        {/* 2 */}
        {propertyData && (
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {title}
          </h2>
        )}

        {/* 3 */}
        <div className="flex items-center space-x-4 ">
          {!!reviewStart && (
            <StartRating
              reviewCount={avg[0]?.count}
              point={avg[0]?.averageRating}
            />
          )}
          <span>·</span>
          {/* display: flex; align-items: baseline; justify-content:
          center; */}
          <span className="flex items-baseline justify-center ">
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
              {bathrooms} <span className="hidden sm:inline-block">baths</span>
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
            // .filter((_, i) => i < 5)
            .map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <i className={`text-3xl las ${item.icon}`}></i>
                <span className=" ">{item.name}</span>
              </div>
            ))}
        </div>

        {/* ----- */}
        {/* <div className="w-14 border-b border-neutral-200"></div> */}
        {/* {newAmmenities.length > 5 ? (
          <div>
            <ButtonSecondary onClick={openModalAmenities}>
              Show all {newAmmenities.length} amenities
            </ButtonSecondary>
          </div>
        ) : (
          ""
        )}
        {renderMotalAmenities()} */}
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
              <Dialog.Panel className="fixed inset-0 bg-black bg-opacity-40" />
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
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>{night_min}</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>{night_max}</span>
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
            <span>
              Joined in{" "}
              {moment(propertyData?.ownerID?.createdAt).format("MMMM YYYY")}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {/* <svg
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
            </svg> */}
            <MapPinIcon className="w-5 h-5 lg:w-6 lg:h-6" />

            <span>{totalOwnerProperty} places</span>
          </div>
        </div>

        {/* == */}
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div> */}
      </div>
    );
  };


  const renderSection6 = () => {
    return (
      <div
        className="listingSection__wrap"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">
          Reviews ({allReview.length} reviews)
        </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        {token && (
          <div className="space-y-5">
            <FiveStartIconForRate
              iconClass="w-6 h-6"
              className="space-x-0.5"
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
            />
            <div className="relative">
              <Input
                fontClass=""
                sizeClass="h-16 px-4 py-3"
                rounded="rounded-3xl"
                value={reviewValue}
                onChange={handleChangeReview}
                placeholder="Share your thoughts ..."
              />
              <ButtonCircle
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size=" w-12 h-12 "
                onClick={handleSubmitReview}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </ButtonCircle>
            </div>
            {errorEmptyReview && (
              <p className="text-red-500">{errorEmptyReview}</p>
            )}
          </div>
        )}

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {allReview
              .slice()
              .reverse()
              .map((review: any, index: number) => {
                return (
                  <CommentListing key={index} className="py-8" data={review} />
                );
              })}
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
                className="flex space-x-10 justify-between py-3 rounded-lg"
              >
                <span className="flex gap-4">
                  {item.rule ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Circle */}
                      <circle cx="50" cy="50" r="45" fill="#4CAF50" />

                      {/* Tick */}
                      <path
                        d="M30 45 L45 60 L75 30"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Circle */}
                      <circle cx="50" cy="50" r="45" fill="#FF0000" />

                      {/* Cross */}
                      <line
                        x1="30"
                        y1="30"
                        x2="70"
                        y2="70"
                        stroke="#FFFFFF"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <line
                        x1="70"
                        y1="30"
                        x2="30"
                        y2="70"
                        stroke="#FFFFFF"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* CONTENT */}
        <div>
          <div className="prose sm:prose">
            {additional_rules && additional_rules.length > 0 ? (
              <>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
                <h4 className="text-lg font-semibold">Additional Rules</h4>
                <ul className="mt-3 space-y-2">
                  {additional_rules.map((rule: string, index: number) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  };

  interface ConfirmationDialogProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
  }

  const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onConfirm,
    onCancel,
  }) => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {open && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={onCancel}
            ></div>
            <div
              style={{
                backgroundColor: "white",
                zIndex: 2000,
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                Show Phone Number
              </div>
              <div style={{ marginTop: "10px" }}>
                <p>
                  Are you sure you want to view phone number with{" "}
                  {configData.coin} coins?
                </p>
              </div>
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button onClick={onCancel}>No</Button>
                <span style={{ marginLeft: "10px" }}></span>
                <ButtonPrimary onClick={onConfirm}>Yes</ButtonPrimary>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            {arrayOfPrice.map((price, index) => {
              const dayOfWeek = getDayOfWeek(index);
              if (index === today - 1) {
                // Today's price
                return (
                  <div
                    key={index}
                    className={`p-4 flex justify-between items-center space-x-4 rounded-lg`}
                  >
                    <span>
                      {Number(price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                      })}
                    </span>
                    <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                      /day
                    </span>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </span>
          {!!reviewStart && (
            <StartRating
              reviewCount={avg[0]?.count}
              point={avg[0]?.averageRating}
            />
          )}
        </div>

        <ButtonPrimary
          //  href={"/checkout"}
          onClick={
            show
              ? () => {}
              : () => {
                  onClickShowPhoneNumber();
                }
          }
        >
          {show ? propertyData?.ownerID?.phoneNumber : "Show phone number"}
        </ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage py-8">
      {/*  HEADER */}
      {renderSearchBar()}
      {confirmDialogVisible && (
        <ConfirmationDialog
          open={confirmDialogVisible}
          onConfirm={handleConfirmPhoneNumber}
          onCancel={handleCancelPhoneNumber}
        />
      )}
      <header className="rounded-md sm:rounded-xl">
        <div
          className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2"
          style={PHOTOS.length === 1 ? { height: "530px", width: "100%" } : {}}
        >
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
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
          {/* { renderSearchBar() } */}
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
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
