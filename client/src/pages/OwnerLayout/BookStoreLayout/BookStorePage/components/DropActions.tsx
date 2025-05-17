import DropActionsAbs from "@/components/elements/cards/shared/DropActionsAbs";
import {
  actionsBookStoreAdmin,
  KEY_MAP_STORE,
  labelsBookStore,
} from "@/core/config/fieldsData/OwnerLayout/bookStore/actions";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { countW } from "@/core/lib/lib";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";
import { DispatchType } from "@/store/store";
import { BookStoreType } from "@/types/all/bookStore";
import { BtnAct, BtnPopupKeys } from "@/types/types";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { manageDropLabelGeneral } from "./../../../../../core/config/fieldsData/general/labels";

type PropsType = {
  bookStore?: BookStoreType;
};

const DropActions: FC<PropsType> = ({ bookStore }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  const nav = useNavigate();

  const dispatch: DispatchType = useDispatch();
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
          cb: () => {
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
      async () =>
        key !== KEY_MAP_STORE.DELETE
          ? nav(labelsBookStore.get(key)!.path + bookStore?.id)
          : await handleOpenPop(),
    ])
  );

  return (
    <div className="w-full flex justify-end">
      <DropActionsAbs
        {...{ isDropOpen, setIsDropOpen, dropLabel: manageDropLabelGeneral }}
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
      </DropActionsAbs>
    </div>
  );
};

export default DropActions;
