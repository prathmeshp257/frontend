import React, { FC } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import ButtonSubmit from "../ButtonSubmit";

const StaySearchForm: FC<{}> = () => {
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <LocationInput className="flex-[1.5]" />
        <div className="pr-2 xl:pr-4">
          <ButtonSubmit href="/listing-stay-map" />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
