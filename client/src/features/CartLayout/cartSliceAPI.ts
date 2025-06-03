/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { catchErr, isArrOk } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import { BaseResAPI } from "@/types/types";
import { rootAPI } from "../root/rootAPI";

const B_URL = "/consumer/cart";

export const cartSLiceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateQtyCartClick: builder.mutation<
      BaseResAPI<void>,
      { bookID: string; act: KEY_ACTION_CART }
    >({
      query: ({ bookID, act }) => ({
        url: `${B_URL}/click/${bookID}`,
        method: "PATCH",
        data: { act },
      }),

      async onQueryStarted({ bookID, act }, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          const patched = dispatch(
            rootAPI.util.updateQueryData("getUserCart", undefined, (draft) => {
              if (!isArrOk(draft?.cart?.items))
                draft.cart = {
                  items: [],
                } as any;

              const index = draft.cart.items.findIndex(
                (item) => item.bookID === bookID
              );
              if (index === -1)
                draft.cart.items.push({
                  bookID,
                  cartID: "",
                  id: "",
                  qty: 1,
                });
              else
                draft.cart.items[index].qty +=
                  act === KEY_ACTION_CART.INC_QTY_CART ? 1 : -1;
            })
          );

          try {
            await queryFulfilled;
          } catch (err: any) {
            console.log(err);

            patched.undo();
          }
        });
      },
    }),
  }),
});
