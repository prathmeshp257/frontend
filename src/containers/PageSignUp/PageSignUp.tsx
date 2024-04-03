import React, { FC, useContext, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api/config";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "context/userContext";

export interface PageSignUpProps {
  className?: string;
}

// const loginSocials = [
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];


const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try{
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
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
                  }, 500);
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

      }catch(err){
        console.log(err);
      }
    },
  });
  const handleSignup = async (values: any) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, values);

      const text = response.data.message;

      if (response.data.error === false) {
        toast.success(text);
        setTimeout(() => {
          navigate("/login");
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
    setisLoading(false);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "name should be of atleast 2 words")
        .required("Name should not be empty!"),
      email: Yup.string().email().required("Email should not be empty!"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])\w+/,
          "Password ahould contain at least one uppercase and lowercase character"
        )
        .matches(/\d/, "Password should contain at least one number")
        .matches(
          /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
          "Password should contain at least one special character"
        )
        .required("Password field is required!"),
      dateOfBirth: Yup.date().required("Date of birth is required"),
      phoneNumber: Yup.number()
        .typeError("Phone number must be a number")
        .positive("Phone number must be a positive number")
        .integer("Phone number must be an integer")
        .min(1000000000, "Please enter a 10-digit phone number")
        .max(9999999999, "Please enter a 10-digit phone number")
        .required("Phone number is required"),
    }),
    onSubmit: handleSignup,
  });

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container my-20 lg:mb-8 relative text-center">
        <h2 className="my-8 flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        {/* <GoogleLogin
          onSuccess={(credentialResponse: any) => {
            const credentialDecoded = jwtDecode(credentialResponse.credential);
            console.log(credentialDecoded, "haaaaaaaahaaaaaaaaaaaa");
            // console.log(
            //   credentialResponse.credential,
            //   "haaaaaaaahaaaaaaaaaaaa"
            // );
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
        {/* onClick={() => login()}  loginWithGoogle*/}
        <div className="max-w-md mx-auto space-y-6 ">
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
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={validation.handleSubmit}
            method="post"
          >
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Name
              </span>
              <Input
                name="name"
                type="text"
                className="mt-1 text-neutral-600"
                value={validation.values.name}
                onChange={validation.handleChange}
              />
              {validation.touched.name && validation.errors.name ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.name}
                </span>
              ) : null}
            </label>
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

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Date of Birth
              </span>
              <Input
                name="dateOfBirth"
                type="date"
                className="mt-1 text-neutral-600"
                value={validation.values.dateOfBirth}
                onChange={validation.handleChange}
              />
              {validation.touched.dateOfBirth &&
              validation.errors.dateOfBirth ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.dateOfBirth}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Phone Number
              </span>
              <Input
                name="phoneNumber"
                type="text"
                className="mt-1 text-neutral-600"
                value={validation.values.phoneNumber}
                onChange={validation.handleChange}
              />
              {validation.touched.phoneNumber &&
              validation.errors.phoneNumber ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.phoneNumber}
                </span>
              ) : null}
            </label>
            <ButtonPrimary disabled={isLoading} type="submit">
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-start text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
