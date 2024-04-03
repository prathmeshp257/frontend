import React, { FC, useContext } from "react";
import { useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api/config";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
//
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "context/userContext";
export interface PageLoginProps {
  className?: string;
}
const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

    const loginWithGoogle = useGoogleLogin({
      onSuccess: async (response) => {
        try {
          const res = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
              },
            }
          );
          // const UserSignup = await axios.post(
          // signupwithgoogle;
          // )
          try {
            const response = await axios.post(
              `${API_URL}/users/signupwithgoogle`,
              {
                name: res.data.name,
                email: res.data.email,
                image: res.data.picture,
              }
            );

            const text = response.data.message;

            if (response.data.error === false) {
              localStorage.setItem("token", response.data.token);

              toast.success(text);
              setTimeout(async () => {
                navigate("/");
                await authContext.getFavouriteProps();
                authContext.getAdminData();
              }, 1000);
            }
            if (response.data.error === true && !!response.data.result) {
              toast.error(response.data.result.msg);
            }

            if (response.data.error === true) {
              toast.error(text);
            }
          } catch (error) {
            toast.error("Error during login");
            console.error("Error during login:", error);
          }
        } catch (err) {
          console.log(err);
        }
      },
    });

  const handleLogin = async (values: any) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, values);

      const text = response.data.message;

      if (response.data.error === false) {
        localStorage.setItem("token", response.data.token);

        toast.success(text);
        setTimeout(async() => {
          navigate("/");
        await authContext.getFavouriteProps();
          authContext.getAdminData();
        }, 500);
      }
      if (response.data.error === true) {
        toast.error(text);
      }
    } catch (error) {
      toast.error("Error during login");
      console.error("Error during login:", error);
    }

    setisLoading(false);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email should not be empty!"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password feild is required!"),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login / airbnb</title>
      </Helmet>

      <div className="container my-20 lg:mb-8 relative text-center">
        <h2 className="my-8 flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-10">
          <div className="grid gap-3">
            <button
              className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              onClick={() => loginWithGoogle()}
            >
              <img
                className="flex-shrink-0"
                src={googleSvg}
                alt={"Continue with Google"}
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                Continue with Google
              </h3>
            </button>
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
          </div>

          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={validation.handleSubmit}
            method="post"
          >
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                name="email"
                type="email"
                className="mt-1 text-neutral-600"
                value={validation.values.email}
                onChange={validation.handleChange}
              />
              {validation.touched.email && validation.errors.email ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.email}
                </span>
              ) : null}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>

              <Input
                name="password"
                type="password"
                className="mt-1"
                value={validation.values.password}
                onChange={validation.handleChange}
              />
              {validation.touched.password && validation.errors.password ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.password}
                </span>
              ) : null}
            </label>
            <ButtonPrimary disabled={isLoading} type="submit">
              Login
            </ButtonPrimary>
          </form>
          {/* ==== */}
          <div className="grid gap-3 text-sm">
            <span className="block text-start text-neutral-700 dark:text-neutral-300">
              <Link to="/verify">Forget passoword?</Link>
            </span>
            <span className="block text-start text-neutral-700 dark:text-neutral-300">
              <Link to="/signup">Create new account</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
