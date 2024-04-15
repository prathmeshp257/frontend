import React, { Fragment, useState, useContext } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
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

const HeroSearchFormDetailPage = () => {
  // const [showSearchModal, setShowSearchModal] = useState(false);

  const authContext = useContext(AuthContext);

  // searchbar detail page
  const showSearchModal = authContext.showSearchModal;
  const setShowSearchModal = authContext.setShowSearchModal;

  const getPropertyData = authContext.getPropertyData;
  const showModal = authContext.showModal;
  const setShowModal = authContext.setShowModal;
  const searchLocationValue = authContext.searchLocationValue;
  const setSearchLocationValue = authContext.setSearchLocationValue;
  const setGuestAdultsInputValue = authContext.setGuestAdultsInputValue;
  const setGuestChildrenInputValue = authContext.setGuestChildrenInputValue;
  const setGuestInfantsInputValue = authContext.setGuestInfantsInputValue;
  const guests = authContext.guests;
  const setGuests = authContext.setGuests;
  const setInfo = authContext.setInfo;

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //

  //
  function closeModal() {
    setShowSearchModal(false);
  }

  function openModal() {
    setShowSearchModal(true);
  }
  function resetFormValues() {
    setSearchLocationValue("");
    setGuestInfantsInputValue(0);
    setGuestAdultsInputValue(0);
    setGuestChildrenInputValue(0);
    getPropertyData("clear");
    closeModal();
  }
  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={openModal}
        className=" relative flex items-center w-full border border-neutral-200 dark:border-neutral-6000 px-4 py-2 rounded-full shadow-lg"
      >
        <div className="ml-3 flex-1 text-left overflow-hidden">
          <span className="block font-medium text-sm">Where to?</span>
          <div className="block mt-0.5 text-xs font-light text-neutral-500 dark:text-neutral-400 ">
            <span className="line-clamp-1">Anywhere</span>
          </div>
        </div>
        <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5" />

        {/* <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="block w-4 h-4"
            fill="currentColor"
          >
            <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>
          <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5" />
        </span> */}
      </button>
    );
  };
  return (
    <div className="HeroSearchForm2Mobile">
      {renderButtonOpenModal()}
    </div>
  );
};

export default HeroSearchFormDetailPage;

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