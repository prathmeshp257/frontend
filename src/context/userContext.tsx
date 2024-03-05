import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction} from "react";
import axios from "axios";
import { API_URL } from "../api/config";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

interface UserData {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  image: string;
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
}

const initialState: AuthContextProps = {
  userData: {
    _id: "",
    name: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    image: "",
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
  } as any);
  const [favPropData, setFavPropData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  //search bar feature
  const [info, setInfo] = useState<any[]>([]);
  const [searchLocationValue, setSearchLocationValue] = useState<string>("");
  const [guests, setGuests] = useState(0);

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);
  const totalGuests = guestAdultsInputValue + guestChildrenInputValue;
  const [showModal, setShowModal] = useState(false);
  // console.log(guests, "guessssssss");
  // console.log(totalGuests, "totaaaaaal");

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
  const getPropertyData = async (filter_type: String) => {
    console.log("ssssssssssssssssssssss", filter_type);
    console.log("ssssssssssssssssssss");
    try {
      const response = await axios.post(`${API_URL}/property/get-property`, {
        locationSearch: filter_type === "clear" ? "" : searchLocationValue,
        guestsSearch: filter_type === "clear" ? 0 : totalGuests,
      });
      if (response.data.error === false) {
        setInfo(response.data.propertydata);
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
    guestAdultsInputValue, // Include guestAdultsInputValue state
    setGuestAdultsInputValue,
    guestChildrenInputValue, // Include guestChildrenInputValue state
    setGuestChildrenInputValue,
    guestInfantsInputValue, // Include guestInfantsInputValue state
    setGuestInfantsInputValue,
    showModal,
    setShowModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
