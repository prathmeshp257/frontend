import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";
import moment from "moment";

interface CommentListingDataType {
  userId?: { image: any; name: any }; // Make userId optional
  createdAt: string;
  review: string;
  rating: number;
}

export interface CommentListingProps {
  className?: string;
  data?: CommentListingDataType;
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data = {},
  hasListingTitle,
}) => {
  if (!data?.userId) {
    return null;
  }

  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={data?.userId?.name}
          imgUrl={data?.userId?.image}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data?.userId?.name}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {moment(data?.createdAt).format("MMMM DD, YYYY")}{" "}
            </span>
          </div>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`w-4 h-4 ${
                  index < (data?.rating || 0)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {data?.review}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
