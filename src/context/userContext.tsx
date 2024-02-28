import React, { useState, useEffect, createContext, ReactNode } from "react";
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
    // setLoading(true);
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
      console.error("error while fetching userInfo", err);
      toast.error(
        <>
          Please login
          <br />
          To save get properties nnnnnnnnnn
        </>
      );
      // setLoading(false);
    }
  };
  const addtoSavedList = async (idd: any) => {
    const token = localStorage.getItem("token");
    // setLoading(true);
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
        console.log(response, "add fav");
        toast.success(<>Property Saved!</>);
        getFavouriteProps();
      }
    } catch (err) {
      console.error("error while fetching userInfo", err);
      toast.error(`${err}`);
      // setLoading(false);
    }
    // console.log(dataFavourite, "dataFavourite");
  };
  const delFromSavedList = async (idd: any) => {
    const token = localStorage.getItem("token");
    // setLoading(true);
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
      // setLoading(false);
    }
  };
  const pathnameArray = ["login", "signup", "detail"];
  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    const currentPathname = window?.location?.pathname.substring(1);
    // if (
    //   !pathnameArray.includes(currentPathname) &&
    //   currentPathname !== "" &&
    //   !hasToken
    // ) {
    //   onLogout();
    // }
    const isValidPathname =
      !pathnameArray.includes(currentPathname) && currentPathname !== "";
    // && currentPathname !== "detail";

    if (isValidPathname && !hasToken) {
      onLogout();
    }
    if (hasToken) {
      getAdminData();
      // getFavouriteProps();
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
