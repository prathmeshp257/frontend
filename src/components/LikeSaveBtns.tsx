import { AuthContext } from "context/userContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface savePropDetailPage {
  propID?: any;
}

const LikeSaveBtns: FC<savePropDetailPage> = ({ propID }) => {
  const [isSaved, setIsSaved] = useState(false);
  const hasToken = !!localStorage.getItem("token");
  const authContext = useContext(AuthContext);
  const functFavourite = authContext.getFavouriteProps;
  const addtoSavedList = authContext.addtoSavedList;
  const delFromSavedList = authContext.delFromSavedList;
  const dataFavourite = authContext.favPropData;
  
    function checkIdforFav(dataFavourite: any, propID: any) {
      return dataFavourite.some((obj: any) => obj._id === propID);
    }
  useEffect(() => {
    const result = checkIdforFav(dataFavourite, propID);
    setIsSaved(result);
  }, []);
  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <span
          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          onClick={() => {
            setIsSaved((prevLikedState) => {
              const newLikedState = !prevLikedState;
              if (hasToken) {
                if (newLikedState) {
                  addtoSavedList(propID);
                } else {
                  delFromSavedList(propID);
                  functFavourite();
                }
              } else {
                toast.error(
                  <>You need login to save property..</>
                );
              }
              return newLikedState;
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={hasToken && isSaved ? "#E75480" : "none"}
            viewBox="0 0 24 24"
            stroke="#E75480"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="hidden sm:block ml-2.5">
            {hasToken && isSaved ? "Saved" : "Save"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default LikeSaveBtns;
