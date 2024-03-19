import Label from "components/Label/Label";
import React, { useRef, FC, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../api/config";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "context/userContext";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";
import moment from "moment";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const [name, setName] = useState("" as any);
  const [email, setEmail] = useState("" as any);
  const [dateOfBirth, setDateOfBirth] = useState("" as any);
  const [phoneNumber, setPhoneNumber] = useState("" as any);
  const [image, setImage] = useState("" as any);
  const [isLoading, setisLoading] = useState(false);

  const token = localStorage.getItem("token");

  const authContext = useContext(AuthContext);
  const dataAdmin = authContext.userData;
  const handleUpdate = async (values: any) => {
    setisLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/users/updateInfo?id=${dataAdmin._id}`,
        {
          name: values.name,
          email: values.email,
          dateOfBirth: values.dateOfBirth,
          phoneNumber: values.phoneNumber,
          image: image ? image : dataAdmin.image,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      const text = response.data.message;

      if (response.data.error === false) {
        authContext.getAdminData();
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
      name: dataAdmin.name,
      email: dataAdmin.email,
      dateOfBirth: moment(dataAdmin.dateOfBirth).format("YYYY-MM-DD"),
      phoneNumber: dataAdmin.phoneNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name should not be empty!"),
      email: Yup.string().email().required("Email should not be empty!"),
      phoneNumber: Yup.number()
        .typeError("Phone number must be a number")
        .positive("Phone number must be a positive number")
        .integer("Phone number must be an integer")
        .min(1000000000, "Please enter a 10-digit phone number")
        .max(9999999999, "Please enter a 10-digit phone number")
        .required("Phone number is required"),
      dateOfBirth: Yup.date().required("Date of birth is required"),
    }),
    onSubmit: handleUpdate,
  });

  // modal and crop code
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shouldCrop, setShouldCrop] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check if the file size is under 1MB
      if (file.size <= 1024 * 1024) {
        const base = await convertImageToBase64(file);
        openModal();
        setImage(base);
      } else {
        // Show a toast or perform any desired action for files exceeding 1MB
        toast.error("image size should be under 1MB");
      }
    }
  };
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    setShouldCrop(true);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedBase64 = cropper.getCroppedCanvas().toDataURL();
      setImage(croppedBase64);
      closeModal();
    }
    setShouldCrop(false);
  };

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
        {/* {loading ? (
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : ( */}

        <form
          className="space-y-4 sm:space-y-6 flex"
          onSubmit={validation.handleSubmit}
        >
          {/* image */}{" "}
          <div className="flex flex-col md:flex-row w-full">
            {/* <div className="flex flex-col md:flex-row"> */}
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar
                  sizeClass="w-32 h-32"
                  imgUrl={image ? image : dataAdmin?.image}
                  userName={dataAdmin?.name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    content: {
                      top: "50%",
                      left: "50%",
                      right: "auto",
                      bottom: "auto",
                      marginRight: "-50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                >
                  {modalIsOpen && (
                    // <h1>fffffffff</h1>
                    <>
                      <Cropper
                        src={image}
                        style={{ height: 200, width: "100%" }}
                        initialAspectRatio={1 / 1}
                        guides={true}
                        crop={shouldCrop ? onCrop : undefined}
                        ref={cropperRef}
                      />
                      {shouldCrop ? undefined : (
                        <div className="flex justify-center pt-1">
                          <ButtonPrimary onClick={onCrop}>Crop</ButtonPrimary>
                        </div>
                      )}
                    </>
                  )}
                </Modal>
              </div>
            </div>
            {/* form */}
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  className="mt-1.5"
                  value={validation.values.name}
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                />
                {validation.touched.name && validation.errors.name ? (
                  <span className="text-red-500 text-sm">
                    {validation.errors.name}
                  </span>
                ) : null}
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  className="mt-1.5"
                  value={validation.values.email}
                  onChange={validation.handleChange}
                />
                {validation.touched.email && validation.errors.email ? (
                  <span className="text-red-500 text-sm">
                    {validation.errors.email}
                  </span>
                ) : null}
              </div>

              <div>
                {/* Add other input fields here */}
                <Label>Date of birth</Label>
                <Input
                  name="dateOfBirth"
                  className="mt-1.5"
                  type="date"
                  value={validation.values.dateOfBirth}
                  onChange={validation.handleChange}
                />
                {validation.touched.dateOfBirth &&
                validation.errors.dateOfBirth ? (
                  <span className="text-red-500 text-sm">
                    {validation.errors.dateOfBirth}
                  </span>
                ) : null}
              </div>

              <div>
                <Label>Phone number</Label>
                <Input
                  name="phoneNumber"
                  type="number"
                  className="mt-1.5"
                  value={validation.values.phoneNumber}
                  onChange={validation.handleChange}
                />
                {validation.touched.phoneNumber &&
                validation.errors.phoneNumber ? (
                  <span className="text-red-500 text-sm">
                    {validation.errors.phoneNumber}
                  </span>
                ) : null}
              </div>
              <div className="pt-2">
                <ButtonPrimary
                  disabled={isLoading}
                  type="submit"
                  onClick={authContext.getAdminData}
                >
                  Update info
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </form>
        {/* )} */}
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
