import React, { FC, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api/config";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "context/userContext";

export interface SetOtpProps {
  className?: string;
}

const SetOtp: FC<SetOtpProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const queryParams = new URLSearchParams(window.location.search);
  const emailParam = queryParams.get("email");
  if (!emailParam) {
    navigate("/login");
  }
  const VerifyOtp = async (values: any) => {
    setisLoading(true);
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const emailParam = queryParams.get("email");
      const response = await axios.post(`${API_URL}/users/verifyotp`, {
        otp: values.otp,
        email: emailParam,
      });
      const text = response.data.message;

      if (response.data.error === false) {
        localStorage.setItem("token", response.data.token);

        toast.success(text);
        setTimeout(() => {
          navigate("/");
          authContext.getAdminData();
        }, 1000);
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

  const ResendOTP = async (e: any) => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    try {
      const response = await axios.post(`${API_URL}/users/verify`, {
        email: emailParam,
      });

      const text = response.data.message;

      if (response.data.error === false) {
        navigate(`/verifyotp?email=${emailParam}`);
        toast.success(text);
      }
      if (response.data.error === true) {
        toast.error(text);
      }
    } catch (error) {
      toast.error("Error during login");
      console.error("Error during login:", error);
    }
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.number()
        .min(6, "OTP is a 6 digit number!")
        .required("OTP is required"),
    }),
    onSubmit: VerifyOtp,
  });
  return (
    <div className={`nc-SetOtp ${className}`} data-nc-id="SetOtp">
      <Helmet>
        <title>SetOtp / airbnb</title>
      </Helmet>
      <div className="container my-20 lg:mb-8 relative text-center">
        <h2 className="my-8 flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Verify OTP!
        </h2>
        <div className="max-w-md mx-auto space-y-10">
          <div className="relative text-center">
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800">
              {" "}
            </div>
          </div>

          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-8"
            onSubmit={validation.handleSubmit}
          >
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200"></span>
              <Input
                name="otp"
                type="number"
                className="mt-1 text-neutral-600"
                placeholder="Verification code"
                value={validation.values.otp}
                onChange={validation.handleChange}
              />
              {validation.touched.otp && validation.errors.otp ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.otp}
                </span>
              ) : null}
            </label>
            <ButtonPrimary disabled={isLoading} type="submit">
              Verify OTP
            </ButtonPrimary>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                className="flex justify-start  color-blue text-neutral-500 text-sm"
                onClick={ResendOTP}
              >
                Resend OTP
              </button>
              <Link
                to="/login"
                className="flex justify-start color-blue text-neutral-500 text-sm"
                type="link"
              >
                Back to login
              </Link>
            </div>
          </form>
          {/* ==== */}
        </div>
      </div>
    </div>
  );
};

export default SetOtp;
