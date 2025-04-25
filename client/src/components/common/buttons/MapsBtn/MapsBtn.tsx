/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { BtnAct, EventApp } from "@/types/types";
import { mapsBtn } from "@/config/fields/general/btns";
import { UseFormSetValue } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openToast } from "@/features/common/Toast/toastSlice";

type PropsType = {
  setValue: UseFormSetValue<any>;
};

const MapsBtn: FC<PropsType> = ({ setValue }) => {
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const getRawMaps = (): Promise<GeolocationPosition> => {
    return new Promise((res, rej) => {
      if (!navigator.geolocation) rej(new Error("geolocation not supported"));

      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };
  const getMaps = async () => {
    const { coords } = (await getRawMaps()) ?? {};
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords?.latitude}&lon=${coords?.longitude}&format=json`
    );
    return await res.json();
  };

  const handleCLick = async () => {
    try {
      setIsPending(true);
      const data = await getMaps();
      console.log(data);

      if (!data?.address)
        throw {
          msg: data?.error?.message,
          code: data?.error?.code,
        };

      const { address: { country, county: state, city, road, postcode } = {} } =
        data ?? {};

      setValue("country", country, { shouldValidate: true });
      setValue("state", state, { shouldValidate: true });
      setValue("city", city, { shouldValidate: true });
      setValue("street", road, { shouldValidate: true });
      setValue("zipCode", postcode, { shouldValidate: true });
    } catch (err: any) {
      const { msg, code } = err;

      dispatch(
        openToast({
          statusCode: code,
          msg,
          type: EventApp.ERR,
        })
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ButtonIcon
      {...{
        handleCLick,
        act: BtnAct.INFO,
        el: mapsBtn,
        isPending,
      }}
    />
  );
};
export default MapsBtn;
