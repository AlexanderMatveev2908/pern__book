/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import {
  BtnAct,
  BtnFieldIconType,
  EventApp,
  FormSettersProps,
} from "@/types/types";
import { useDispatch } from "react-redux";
import { openToast } from "@/features/common/Toast/toastSlice";
import { TbWorldSearch } from "react-icons/tb";
import { __cg } from "@/core/lib/lib";

const mapsBtnField: BtnFieldIconType = {
  label: "Get my position",
  icon: TbWorldSearch,
  pendingLabel: "Searching...",
};

const MapsBtn: FC<Omit<FormSettersProps, "watch">> = ({ setValue }) => {
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

    // const res = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    //     coords?.latitude
    //   },${coords?.longitude}&key=${import.meta.env.VITE_GOOGLE_KEY}`
    // );
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords?.latitude}&lon=${coords?.longitude}&format=json`
    );
    return await res.json();
  };

  const handleClick = async () => {
    try {
      setIsPending(true);
      const data = await getMaps();

      if (!data?.address)
        throw {
          msg: data?.error?.message,
          code: data?.error?.code,
        };

      const {
        address: {
          country,
          county,
          city,
          town,
          state,
          road: street,
          postcode: zipCode,
        } = {},
      } = data ?? {};

      setValue("country", country ?? "", { shouldValidate: true });
      setValue("state", state ?? county ?? "", { shouldValidate: true });
      setValue("city", city ?? town ?? "", { shouldValidate: true });
      setValue("street", street ?? "", { shouldValidate: true });
      setValue("zipCode", zipCode ?? "", { shouldValidate: true });
    } catch (err: any) {
      const { msg, code, message } = err ?? {};

      __cg("err maps", err);
      dispatch(
        openToast({
          statusCode: code,
          msg: msg ?? message,
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
        handleClick,
        act: BtnAct.INFO,
        el: mapsBtnField,
        isPending,
      }}
    />
  );
};
export default MapsBtn;
