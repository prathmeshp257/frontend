import { AuthContext } from "context/userContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  addtoSavedList?: any;
  idd?: any;
  dataFavourite?: any;
  delFromSavedList: any;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  addtoSavedList,
  idd,
  dataFavourite,
  delFromSavedList,
}) => {
  const [likedState, setLikedState] = useState(false);
  const hasToken = !!localStorage.getItem("token");
  const authContext = useContext(AuthContext);
  const functFavourite = authContext.getFavouriteProps;
  
  function checkId(dataFavourite: any, idd: any) {
    return dataFavourite.some((obj: any) => obj?._id === idd);
  }
  useEffect(() => {
    const result = checkId(dataFavourite, idd);
    setLikedState(result);
  }, [dataFavourite]);
  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={() => {
        setLikedState((prevLikedState) => {
          const newLikedState = !prevLikedState;
          if (hasToken) {
            if (newLikedState) {
              addtoSavedList(idd);
            } else {
              delFromSavedList(idd);
              functFavourite();
            }
          } else {
            toast.error(<>You need login to save property..</>);
          }
          return newLikedState;
        });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState && hasToken ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
