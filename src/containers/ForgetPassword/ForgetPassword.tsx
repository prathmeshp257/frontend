import React, { FC } from "react";
import { useState, useEffect } from "react";
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

export interface ForgetLoginProps {
  className?: string;
}

const ForgetLogin: FC<ForgetLoginProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const handleForget = async (values: any) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/verify`, {
        email: values.email,
      });

      const text = response.data.message;

      if (response.data.error === false) {
        navigate(`/verifyotp?email=${values.email}`);
        toast.success(text);
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
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email should not be empty!"),
    }),
    onSubmit: handleForget,
  });
  return (
    <div className={`nc-ForgetLogin ${className}`} data-nc-id="ForgetLogin">
      <Helmet>
        <title>ForgetLogin / airbnb</title>
      </Helmet>
      <div className="container my-20 lg:mb-8 relative text-center">
        <h2 className="my-8 flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forget password
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
            <ButtonPrimary disabled={isLoading} type="submit">
              Send OTP
            </ButtonPrimary>

            <Link
              to="/login"
              className="flex justify-start color-blue text-neutral-500 text-sm"
              type="link"
            >
              Back to login
            </Link>
          </form>
          {/* ==== */}
        </div>
      </div>
    </div>
  );
};

export default ForgetLogin;
