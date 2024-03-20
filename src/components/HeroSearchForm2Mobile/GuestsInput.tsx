import { GuestsObject } from "components/HeroSearchForm/type";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { AuthContext } from "context/userContext";
import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
export interface GuestsInputProps {
  defaultValue?: GuestsObject;
  onChange?: (data: GuestsObject) => void;
  className?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  className = "",
}) => {
  const authContext = useContext(AuthContext);
  const setGuests = authContext.setGuests;
  const guests = authContext.guests;
  const getPropertyFunc = authContext.getPropertyData;
  const guestAdultsInputValue = authContext.guestAdultsInputValue;
  const setGuestAdultsInputValue = authContext.setGuestAdultsInputValue;
  const guestChildrenInputValue = authContext.guestChildrenInputValue;
  const setGuestChildrenInputValue = authContext.setGuestChildrenInputValue;
  const guestInfantsInputValue = authContext.guestInfantsInputValue;
  const setGuestInfantsInputValue = authContext.setGuestInfantsInputValue;
  

  const totalGuests = guestChildrenInputValue + guestAdultsInputValue;
  // useEffect(() => {
  //   setGuestAdultsInputValue(defaultValue?.guestAdults || 0);
  // }, [defaultValue?.guestAdults]);
  // useEffect(() => {
  //   setGuestChildrenInputValue(defaultValue?.guestChildren || 0);
  // }, [defaultValue?.guestChildren]);
  // useEffect(() => {
  //   setGuestInfantsInputValue(defaultValue?.guestInfants || 0);
  // }, [defaultValue?.guestInfants]);

useEffect(() => {
  setGuests(totalGuests);
}, [totalGuests]);
  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
    onChange && onChange(newValue);
  };
  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">
        {`Who's coming?`}
      </span>
      <NcInputNumber
        className="w-full"
        defaultValue={guestAdultsInputValue}
        // onChange={(value) => handleChangeData(value, "guestAdults")}
        roomOFbeds={guestAdultsInputValue}
        setRoomOFbeds={setGuestAdultsInputValue}
        max={20}
        label="Adults"
        desc="Ages 13 or above"
      />
      <NcInputNumber
        className="w-full mt-6"
        defaultValue={0}
        // onChange={(value) => handleChangeData(value, "guestChildren")}
        roomOFbeds={guestChildrenInputValue}
        setRoomOFbeds={setGuestChildrenInputValue}
        max={20}
        label="Children"
        desc="Ages 2–12"
      />

      <NcInputNumber
        className="w-full mt-6"
        defaultValue={0}
        // onChange={(value) => handleChangeData(value, "guestInfants")}
        roomOFbeds={guestInfantsInputValue}
        setRoomOFbeds={setGuestInfantsInputValue}
        max={20}
        label="Infants"
        desc="Ages 0–2"
      />
    </div>
  );
};

export default GuestsInput;
