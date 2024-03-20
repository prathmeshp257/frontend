import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { API_URL } from "../api/config";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

interface UserData {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: any;
  phoneNumber: string;
  image: string;
  wallet_balance: any;
}

interface AuthContextProps {
  getPropertyData: any;
  setFavPropData: any;
  favPropData: any;
  userData: UserData;
  onLogout: () => void;
  getAdminData: () => Promise<void>;
  getFavouriteProps: () => Promise<void>;
  addtoSavedList: (idd: any) => Promise<void>;
  delFromSavedList: (idd: any) => Promise<void>;
  reloadUserData: () => void;
  loading: boolean;
  searchLocationValue: string;
  setSearchLocationValue: React.Dispatch<React.SetStateAction<string>>;
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  info: any[]; // Include the info state
  setInfo: React.Dispatch<React.SetStateAction<any[]>>;
  //
  guestAdultsInputValue: number; // Add guestAdultsInputValue state
  setGuestAdultsInputValue: React.Dispatch<React.SetStateAction<number>>;
  guestChildrenInputValue: number; // Add guestChildrenInputValue state
  setGuestChildrenInputValue: React.Dispatch<React.SetStateAction<number>>;
  guestInfantsInputValue: number; // Add guestInfantsInputValue state
  setGuestInfantsInputValue: React.Dispatch<React.SetStateAction<number>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  showHeight: boolean;
  setShowHeight: React.Dispatch<React.SetStateAction<boolean>>;
  // show: boolean;
  // setShow: React.Dispatch<React.SetStateAction<boolean>>;
  showModalPh: boolean;
  setShowModalPh: React.Dispatch<React.SetStateAction<boolean>>;
  // Add the new state values here:
  typevalues: string[];
  setTypevalues: React.Dispatch<React.SetStateAction<string[]>>;
  rangePrices: { min: number; max: number };
  setRangePrices: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  beds: number;
  setBeds: React.Dispatch<React.SetStateAction<number>>;
  bedrooms: number;
  setBedrooms: React.Dispatch<React.SetStateAction<number>>;
  bathrooms: number;
  setBathrooms: React.Dispatch<React.SetStateAction<number>>;
  amenitiesValues: string[];
  setAmenitiesValues: React.Dispatch<React.SetStateAction<string[]>>;
  houseRulesValues: string[];
  setHouseRulesValues: React.Dispatch<React.SetStateAction<string[]>>;
  clearAllFilterValues: any;
  //rating and reviews
  allReview: any[];
  setAllReview: Dispatch<SetStateAction<any[]>>;
  reviewValue: string;
  setReviewValue: Dispatch<SetStateAction<string>>;
  ratingValue: number;
  setRatingValue: Dispatch<SetStateAction<number>>;
  avgRating: number;
  setAvgRating: Dispatch<SetStateAction<number>>;
  ///
  ratingInfo: any[];
  setRatingInfo: Dispatch<SetStateAction<any[]>>;
}

const initialState: AuthContextProps = {
  userData: {
    _id: "",
    name: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    image: "",
    wallet_balance: "",
  },
  onLogout: () => {},
  getAdminData: async () => {},
  getFavouriteProps: async () => {},
  reloadUserData: () => {},
  loading: false,
  favPropData: [],
  setFavPropData: async () => {},
  addtoSavedList: async (idd: any) => {},
  delFromSavedList: async (idd: any) => {},
  searchLocationValue: "",
  setSearchLocationValue: () => {},
  guests: 0,
  setGuests: () => {},
  info: [], // Initialize info state
  setInfo: () => {},
  getPropertyData: () => {},
  //
  guestAdultsInputValue: 0, // Initialize guestAdultsInputValue
  setGuestAdultsInputValue: () => {},
  guestChildrenInputValue: 0, // Initialize guestChildrenInputValue
  setGuestChildrenInputValue: () => {},
  guestInfantsInputValue: 0, // Initialize guestInfantsInputValue
  setGuestInfantsInputValue: () => {},
  showModal: false,
  setShowModal: () => {},
  //searchbar detail page
  showSearchModal: false,
  setShowSearchModal: () => {},
  showHeight: false,
  setShowHeight: () => {},
  // show: false,
  // setShow: () => {},
  showModalPh: false,
  setShowModalPh: () => {},
  // Add the new state values here:
  typevalues: [],
  setTypevalues: () => {},
  rangePrices: { min: 0, max: 0 },
  setRangePrices: () => {},
  beds: 0,
  setBeds: () => {},
  bedrooms: 0,
  setBedrooms: () => {},
  bathrooms: 0,
  setBathrooms: () => {},
  amenitiesValues: [],
  setAmenitiesValues: () => {},
  houseRulesValues: [],
  setHouseRulesValues: () => {},
  clearAllFilterValues: () => {},
  // Other existing properties...
  allReview: [],
  setAllReview: () => {},
  reviewValue: "",
  setReviewValue: () => {},
  ratingValue: 5,
  setRatingValue: () => {},
  avgRating: 0,
  setAvgRating: () => {},
  //rating
  ratingInfo: [],
  setRatingInfo: () => {},
};

const AuthContext = createContext<AuthContextProps>(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    _id: "",
    name: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    image: "",
    wallet_balance: 0,
  } as any);
  //rating and reviews
  const [allReview, setAllReview] = useState<any>([]);
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [avgRating, setAvgRating] = useState(0);
  //favourites and loading
  const [favPropData, setFavPropData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  //filter page funct
  const [typevalues, setTypevalues] = useState<any>([]);
  const [rangePrices, setRangePrices] = useState({ min: 0, max: 0 });
  const [beds, setBeds] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [amenitiesValues, setAmenitiesValues] = useState<string[]>([]);
  const [houseRulesValues, setHouseRulesValues] = useState<string[]>([]);
  //search bar funct
  const [info, setInfo] = useState<any[]>([]);
  // setRatingInfo;
  const [ratingInfo, setRatingInfo] = useState<any[]>([]);

  const [searchLocationValue, setSearchLocationValue] = useState<string>("");
  const [guests, setGuests] = useState(0);

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);
  const totalGuests = guestAdultsInputValue + guestChildrenInputValue;
  const [showModal, setShowModal] = useState(false);
  const [showHeight, setShowHeight] = useState(false);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showModalPh, setShowModalPh] = useState(false);
  // const [show, setShow] = useState(false);

  // searchbar details page

  useEffect(() => {
    if (!searchLocationValue && searchLocationValue==='') {
      getPropertyData("clear");
    }
  }, [searchLocationValue]);
  const onLogout = () => {
    setUserData(initialState.userData);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };
  const getAdminData = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users/getuser`, {
        headers: {
          token: token,
        },
      });
      if (response.data.error === false) {
        const info = response.data.userdata;
        setUserData({
          _id: info._id,
          name: info.name,
          email: info.email,
          dateOfBirth: info.dateOfBirth,
          phoneNumber: info.phoneNumber,
          image: info.image,
          wallet_balance: info.wallet_balance,
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("error while fetching userInfo", err);
      toast.error(
        <>
          Last session expired!
          <br />
          Please login again
        </>
      );
      onLogout();
      setLoading(false);
    }
  };
  const getFavouriteProps = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/users/get-fav`, {
        headers: {
          token: token,
        },
      });
      if (response.data.error === false) {
        setFavPropData(response.data.favourites);
      }
    } catch (err) {
      console.error("Error fetching saved properties", err);
    }
  };
  const addtoSavedList = async (idd: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_URL}/users/add-fav`,
        {
          propId: idd,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.error === false) {
        toast.success(<>Property Saved!</>);
        getFavouriteProps();
      }
    } catch (err) {
      console.error("error while fetching userInfo", err);
      toast.error(`${err}`);
    }
  };
  const delFromSavedList = async (idd: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_URL}/users/del-fav`,
        {
          propId: idd,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.error === false) {
        toast.error(<>Property removed!</>);
      }
    } catch (err) {
      console.error("error removing property from favourite", err);
      toast.error(`${err}`);
    }
  };
  const clearAllFilterValues = () => {
    setTypevalues([]);
    setRangePrices({ min: 0, max: 0 });
    setBeds(0);
    setBedrooms(0);
    setBathrooms(0);
    setAmenitiesValues([]);
    setHouseRulesValues([]);
    // getPropertyData("clear");
  };
  const getPropertyData = async (filter_type: String) => {
    const hasToken = localStorage.getItem("token");

     if (hasToken) {
       await getFavouriteProps();
     }
    try {
      const response = await axios.post(`${API_URL}/property/get-property`, {
        locationSearch:searchLocationValue,
          // filter_type === "clear" && !searchLocationValue
          //   ? ""
          //   : searchLocationValue,
        guestsSearch: filter_type === "clear" ? 0 : totalGuests,
      });
      if (response.data.error === false) {
        setInfo(response.data.propertydata);
        setRatingInfo(response.data.ratingData);
      }
    } catch (err) {
      toast.error("Error while fetching properties data");
      console.error("Error while fetching properties data", err);
    }
  };
  const pathnameArray = ["/login", "/signup", "/detail"];
  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    const currentPathname = window?.location?.pathname;
    const isValidPathname =
      !pathnameArray.includes(currentPathname) && currentPathname !== "/";

    if (isValidPathname && !hasToken) {
      onLogout();
    }
    if (hasToken) {
      getAdminData();
    }
  }, []);
  const reloadUserData = () => {};

  const value: AuthContextProps = {
    userData,
    onLogout,
    getAdminData,
    getFavouriteProps,
    reloadUserData,
    loading,
    favPropData,
    setFavPropData,
    addtoSavedList,
    delFromSavedList,
    searchLocationValue,
    setSearchLocationValue,
    guests,
    setGuests,
    setInfo,
    info,
    getPropertyData,
    guestAdultsInputValue,
    setGuestAdultsInputValue,
    guestChildrenInputValue,
    setGuestChildrenInputValue,
    guestInfantsInputValue,
    setGuestInfantsInputValue,
    showModal,
    setShowModal,
    //searchbar detail page
    showSearchModal,
    setShowSearchModal,
    showHeight,
    setShowHeight,
    // show,
    // setShow,
    showModalPh,
    setShowModalPh,
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
    //
    clearAllFilterValues,
    //
    allReview,
    setAllReview,
    reviewValue,
    setReviewValue,
    ratingValue,
    setRatingValue,
    avgRating,
    setAvgRating,
    //rating
    ratingInfo,
    setRatingInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
