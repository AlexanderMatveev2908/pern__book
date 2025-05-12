import DropHandler from "@/components/elements/DropHandler/DropHandler";
import {
  actionsBookStoreAdmin,
  KEY_MAP_STORE,
  labelsBookStore,
} from "@/core/config/fieldsData/bookStore/actions";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { countW } from "@/core/lib/lib";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { BookStoreType } from "@/types/all/bookStore";
import { BtnAct, BtnPopupKeys } from "@/types/types";
import { FC, useEffect, useRef, useState } from "react";
import { AiFillInteraction } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type PropsType = {
  bookStore?: BookStoreType;
};

const dropLabel = {
  icon: AiFillInteraction,
  label: "Manage",
};

const DropActions: FC<PropsType> = ({ bookStore }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const listenDrop = (e: MouseEvent) => {
      if (!dropRef.current) return;

      if (!dropRef.current.contains(e.target as Node)) setIsDropOpen(false);
    };

    document.addEventListener("mousedown", listenDrop);
    return () => document.removeEventListener("mousedown", listenDrop);
  }, []);

  const dispatch = useDispatch();
  const [mutate] = bookStoreSliceAPI.endpoints.delStore.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleOpenPop = () =>
    dispatch(
      openPopup({
        txt: `Are You sure to delete ${countW(
          30,
          bookStore?.name
        )} and all associated data ?`,
        leftBtn: {
          label: "I Change idea",
          act: BtnAct.DO,
          cb: async () => {
            dispatch(closePopup());
          },
        },
        rightBtn: {
          label: "Delete",
          act: BtnAct.DEL,
          cb: async () => {
            dispatch(loadPop(BtnPopupKeys.RIGHT));

            const res = await wrapMutationAPI({
              cbAPI: () => mutate(bookStore?.id ?? ""),
            });

            dispatch(closePopup());

            if (!res) return;

            nav("/owner/book-store/book-stores", { replace: true });
          },
        },
      })
    );

  const handlers = new Map(
    Object.values(KEY_MAP_STORE).map((key) => [
      key,
      () =>
        key !== KEY_MAP_STORE.DELETE
          ? nav(labelsBookStore.get(key)!.path + bookStore?.id)
          : handleOpenPop(),
    ])
  );

  return (
    <div className="w-full flex justify-end">
      <div
        ref={dropRef}
        className={`w-[250px] border-2 border-blue-600 rounded-xl py-2 px-5 right-0 top-0 bg-neutral-950 relative`}
      >
        <DropHandler {...{ el: dropLabel, isDropOpen, setIsDropOpen }} />

        <ul
          className={`grid absolute bg-neutral-950  border-2 border-blue-600 py-2 max-h-[150px] w-full left-0 top-[65px] rounded-xl px-3  scrollbar__app  scrollbar__y overflow-y-scroll z-60 transition-all duration-300 ${
            isDropOpen
              ? "pointer-events-auto -translate-y-[0] opacity-100"
              : "pointer-events-none -translate-y-[100px] opacity-0"
          }`}
        >
          {actionsBookStoreAdmin.map((el) => (
            <div
              key={el.id}
              className={` w-full flex justify-start items-center gap-5 py-2 el__flow  hover:text-blue-600 cursor-pointer`}
              onClick={handlers.get(el.originalKey)}
            >
              <el.icon className="icon__sm" />

              <span className="txt__2">{el.label}</span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropActions;
