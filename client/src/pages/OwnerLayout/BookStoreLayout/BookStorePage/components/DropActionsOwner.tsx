/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { countW } from "@/core/lib/lib";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/BookStoresLayout/bookStoreSliceAPI";
import { DispatchType } from "@/store/store";
import { BookStoreType } from "@/types/all/bookStore";
import { BtnAct, BtnPopupKeys, UserType } from "@/types/types";
import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  KEY_MAP_STORE,
  manageDropLabelGeneral,
} from "../../../../../core/config/fieldsData/labels/shared";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { v4 } from "uuid";
import { fieldsInputsBooks } from "@/features/common/SearchBar/fields/owner/books";
import {
  actionsBookStoreAdmin,
  labelsBookStore,
} from "@/features/OwnerLayout/BookStoresLayout/fields/actions";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import DropActionsMapObj from "@/components/elements/dropMenus/dropActionsHOC/DropActionsMapObj";

type PropsType = {
  bookStore?: BookStoreType;
  user: UserType;
};

const DropActionsOwner: FC<PropsType> = ({ bookStore }) => {
  const { createBookFormCtx, formOwnerBooksCtx } = useFormCtxConsumer();
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

            nav("/", { replace: true });
          },
        },
      })
    );

  const handlers = new Map(
    Object.values(KEY_MAP_STORE).map((key) => [
      key,
      async () => {
        switch (key) {
          case KEY_MAP_STORE.DELETE:
            return await handleOpenPop();

          case KEY_MAP_STORE.ADD_BOOK:
            createBookFormCtx.setValue("bookStoreID", bookStore?.id ?? "");
            return nav("/owner/books/add-book");

          case KEY_MAP_STORE.BOOKS: {
            const { getValues, setValue } = formOwnerBooksCtx;
            const cpy = (getValues("items") ?? []).filter(
              (el) => el?.field !== "bookStoreID"
            );

            setValue("items", [
              ...cpy,
              {
                ...((fieldsInputsBooks.find(
                  (el) => el.field === "bookStoreID"
                ) ?? {}) as any),
                id: v4(),
                val: bookStore?.id ?? "",
              },
            ]);

            return nav("/owner/books/list");
          }

          case KEY_MAP_STORE.ORDERS:
            return nav("/owner/orders/list");

          default:
            return nav(labelsBookStore.get(key)!.path + bookStore?.id);
        }
      },
    ])
  );

  const filteredActionsAdmin = useMemo(
    () =>
      actionsBookStoreAdmin.filter((el) => {
        switch (el.originalKey) {
          case KEY_MAP_STORE.BOOKS:
            return +(bookStore?.booksStats?.booksCount ?? 0);

          case KEY_MAP_STORE.ORDERS:
            return +(bookStore?.ordersStats?.ordersCount ?? 0);

          case KEY_MAP_STORE.REVIEWS:
            return +(bookStore?.ratingStats?.reviewsCount ?? 0);

          case KEY_MAP_STORE.TEAM:
            return +(bookStore?.team?.length ?? 0);

          default:
            return el;
        }
      }),

    [bookStore]
  );

  return (
    <div className="w-full flex justify-end">
      <DropActionsMapObj
        {...{
          dropLabel: manageDropLabelGeneral,
          fields: filteredActionsAdmin,
          handlers,
        }}
      />
    </div>
  );
};

export default DropActionsOwner;
