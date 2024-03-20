import React, { ReactNode } from "react";
import { imageGallery as listingStayImageGallery } from "./listing-stay-detail/constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ListingImageGallery from "components/ListingImageGallery/ListingImageGallery";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import MobileFooterSticky from "./(components)/MobileFooterSticky";

const DetailPagetLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const thisPathname = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const modal = searchParams?.get("modal");
  const queryParams = new URLSearchParams(window.location.search);
  const propIdParam = queryParams.get("propID");

const handleCloseModalImageGallery = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("modal")) {
    params.delete("modal");
    const newQueryString = params.toString();
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    window.history.replaceState({}, "", newUrl);
  } else {
    navigate(`/detail?propID=${propIdParam}`);
  }
};
  const getImageGalleryListing = () => {
    if (thisPathname?.includes("/detail")) {
      return listingStayImageGallery;
    }
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        // isShowModal={false}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />
      <div className="container ListingDetailPage__content">{children}</div>
    </div>
  );
};

export default DetailPagetLayout;
