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
  userData: UserData;
  onLogout: () => void;
  getAdminData: () => Promise<void>;
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
  reloadUserData: () => {},
  loading: false,
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
  const pathnameArray = ["login", "signup"];
  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    // const currentPathname = window?.location?.pathname.substring(1);
    // if (
    //   !pathnameArray.includes(currentPathname) &&
    //   currentPathname !== "" &&
    //   !hasToken
    // ) {
    //   onLogout();
    // }
    if (hasToken) {
      getAdminData();
    }
  }, []);
  const reloadUserData = () => {};

  const value: AuthContextProps = {
    userData,
    onLogout,
    getAdminData,
    reloadUserData,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
