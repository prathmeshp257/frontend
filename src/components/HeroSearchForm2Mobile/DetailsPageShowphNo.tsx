import React, { Fragment, useState, useContext } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import DialogTitle from "@mui/material/DialogTitle";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ButtonSubmit from "./ButtonSubmit";
import { useTimeoutFn } from "react-use";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import { AuthContext } from "context/userContext";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import LocationInput from "components/HeroSearchFormSmall/LocationInput";
import GuestsInput from "components/HeroSearchFormSmall/GuestsInput";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { toast } from "react-toastify";
import { API_URL } from "api/config";
import axios from "axios";

const DetailPageShowPhNo = () => {
  const authContext = useContext(AuthContext);

  // searchbar detail page  const show = authContext.show;
  //  const show = authContext.show;
  //  const setShow = authContext.setShow;
  const showModalPh = authContext.showModalPh;
  const setShowModalPh = authContext.setShowModalPh;

  const [showDialog, setShowDialog] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //

  //
  function closeModal() {
    console.log("closed modal");
    setShowModalPh(false);
  }

  function openModal() {
    setShowModalPh(false);
    console.log("modal opened");
  }
  //show phone number
  // const getPhoneNumber = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     return toast.error("You need login to view phone number..");
  //   }
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const propIdParam = queryParams.get("propID");
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/users/showphone?propId=${propIdParam}`,
  //       {},
  //       {
  //         headers: {
  //           token: token,
  //         },
  //       }
  //     );
  //     if (response.data.error === true) {
  //       setShow(false);
  //       return toast.error(`${response.data.message}`);
  //     }
  //     setShow(true);
  //     toast.success("phone number fetch successfully");
  //   } catch (err) {
  //     toast.error(`${err}`);
  //     setShow(false);
  //   }
  // };
  const renderButtonOpenModal = () => {
    return (
      <>
        <Dialog
          className=" relative z-max container"
          open={true}
          onClose={closeModal}
        >
          {/* <DialogTitle>{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure, you want to delete this Property?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <ButtonPrimary onClick={() => deleteProperty(currentProp)}>
              Delete
            </ButtonPrimary>
          </DialogActions> */}
          <DialogTitle>{"Show Phone Number"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to spend 5 coins?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>No</Button>
            <ButtonPrimary
            //  onClick={getPhoneNumber}
            >5 coins</ButtonPrimary>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  return <div>{renderButtonOpenModal()}</div>;
};

export default DetailPageShowPhNo;

// <Transition appear show={showSearchModal} as={Fragment}>
//   <Dialog
//     as="div"
//     className="HeroSearchFormMobile__Dialog relative z-max"
//     onClose={() => setShowSearchModal(false)}
//   >
//     {/* ... existing code ... */}
//     <div className="flex h-full">
//       {/* ... existing code ... */}
//       <Transition.Child
//         enter="ease-out transition-transform"
//         enterFrom="opacity-0 translate-y-full"
//         enterTo="opacity-100 translate-y-0"
//         leave="ease-in transition-transform"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 translate-y-full"
//       >
//         <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-center items-center">
//           {showSearchModal && (
//             <Tab.Group manual>
//               {/* ... existing code ... */}
//               <Tab.Panels className="flex-1 overflow-y-auto hiddenScrollbar py-4">
//                 <Tab.Panel>
//                   <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
//                     {showSearchModal && (
//                       <Transition.Child
//                         enter="ease-out transition-transform"
//                         enterFrom="opacity-0 translate-y-full"
//                         enterTo="opacity-100 translate-y-0"
//                         leave="ease-in transition-transform"
//                         leaveFrom="opacity-100 translate-y-0"
//                         leaveTo="opacity-0 translate-y-full"
//                       >
//                         <SectionHeroArchivePage
//                           getPropertyFunc={getPropertyData}
//                           searchLocationValue={searchLocationValue}
//                           setSearchLocationValue={setSearchLocationValue}
//                           guests={guests}
//                           setGuests={setGuests}
//                           currentPage="Stays"
//                           currentTab="Stays"
//                           className=" pb-12 lg:pb-14"
//                         />

//                         {/* <HeroSearchForm
//                           // currentPage={currentPage}
//                           // currentTab={currentTab}
//                           // getPropertyFunc={getPropertyFunc}
//                           searchLocationValue={searchLocationValue}
//                           setSearchLocationValue={setSearchLocationValue}
//                           guests={guests}
//                           setGuests={setGuests}
//                         /> */}
//                       </Transition.Child>
//                     )}
//                   </div>
//                 </Tab.Panel>
//               </Tab.Panels>
//               {/* ... existing code ... */}
//             </Tab.Group>
//           )}
//         </Dialog.Panel>
//       </Transition.Child>{" "}
//       {/* ... existing code ... */}
//     </div>
//     {/* ... existing code ... */}
//   </Dialog>
// </Transition>
