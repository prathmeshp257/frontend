import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect } from "react";
import { useState } from "react";

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
  ratingValue?: number;
  setRatingValue?: (value: any) => void;
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
  ratingValue,
  setRatingValue,
}) => {
  // const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);

  useEffect(() => {
    if (setRatingValue) {
      // Check if setRatingValue is defined
      setRatingValue(defaultPoint);
    }
  }, [defaultPoint, setRatingValue]);

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <StarIcon
            key={item}
            className={`${
              (ratingValue && ratingValue >= item) || currentHover >= item
                ? "text-yellow-500"
                : ""
            } ${iconClass}`}
            onMouseEnter={() => setCurrentHover(() => item)}
            onMouseLeave={() => setCurrentHover(() => 0)}
            onClick={() => setRatingValue && setRatingValue(item)}
          />
        );
      })}
    </div>
  );
};

export default FiveStartIconForRate;
