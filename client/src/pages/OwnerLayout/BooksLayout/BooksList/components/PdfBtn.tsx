/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { backURL } from "@/core/config/env";
import { __cg, getStorage, removeStorage, saveStorage } from "@/core/lib/lib";
import { setPushedOut } from "@/features/AuthLayout/authSlice";
import { openToast } from "@/features/common/Toast/toastSlice";
import { EventApp, StorageKeys } from "@/types/types";
import axios from "axios";
import { useState, type FC } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const btnPdf = {
  label: "PDF",
  icon: FaFilePdf,
};

const PdfBtn: FC = () => {
  const [isPending, setIsPending] = useState(false);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handlePdf = async () => {
    try {
      setIsPending(true);

      const res = await axios.get(`${backURL}/admin-books/pdf`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
          Authorization: `Bearer ${getStorage(StorageKeys.ACCESS)}`,
        },
        withCredentials: true,
      });
      const url = URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      window.open(url, "_blank");
    } catch (err: any) {
      if (err?.status !== 401) {
        dispatch(
          openToast({
            msg: "Error downloading PDF",
            type: EventApp.ERR,
            statusCode: 500,
          })
        );
        return;
      }

      try {
        const { data } = await axios.post(
          `${backURL}/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getStorage(StorageKeys.ACCESS)}`,
              Accept: "application/json",
            },
            withCredentials: true,
          }
        );

        saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });

        __cg("refreshed");

        handlePdf();
      } catch (err: any) {
        console.log(err);

        removeStorage();

        dispatch(
          openToast({
            msg: "Session expired",
            type: EventApp.ERR,
            statusCode: 401,
          })
        );

        dispatch(setPushedOut());

        nav("/", { replace: true });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full flex justify-start">
      <div className="w-full max-w-[200px]">
        <ButtonIcon
          {...{
            el: btnPdf,
            handleClick: handlePdf,
            isPending,
          }}
        />
      </div>
    </div>
  );
};

export default PdfBtn;
