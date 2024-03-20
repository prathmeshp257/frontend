import Label from "components/Label/Label";
import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../api/config";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext} from "context/userContext";

const AccountPass = () => {
  const [userInfo, setuserInfo] = useState({} as any);
  const [isLoading, setisLoading] = useState(false);

  const token = localStorage.getItem("token");

  const authContext = useContext(AuthContext);
  const dataAdmin = authContext.userData;

  const handlePasswordChange = async (values: any) => {
    setisLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/users/updatePass?id=${dataAdmin._id}`,
        {
          password: values.password,
        }
      );

      const text = response.data.message;

      if (response.data.error === false) {
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

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
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
      cpassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: handlePasswordChange,
  });

  return (
    <div>
      <CommonLayout>
        <form
          className="space-y-6 sm:space-y-8 h-[440px]"
          onSubmit={validation.handleSubmit}
        >
          <div className=" max-w-xl space-y-6">
            <div className="max-w-sm">
              <Label>New password</Label>
              <Input
                name="password"
                type="password"
                className="mt-1.5"
                value={validation.values.passoword}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
              />
              {validation.touched.password && validation.errors.password ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.password}
                </span>
              ) : null}
            </div>
            <div className="max-w-sm">
              <Label>Confirm password</Label>
              <Input
                name="cpassword"
                type="password"
                className="mt-1.5"
                value={validation.values.cpassoword}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
              />
              {validation.touched.cpassword && validation.errors.cpassword ? (
                <span className="text-red-500 text-sm">
                  {validation.errors.cpassword}
                </span>
              ) : null}
            </div>
            <div className="pt-2 max-w-sm">
              <ButtonPrimary disabled={isLoading} type="submit">
                Update password
              </ButtonPrimary>
            </div>
          </div>
        </form>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
