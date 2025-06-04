/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { catchErr, isArrOk } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import { BaseResAPI, TagsAPI } from "@/types/types";
import { CartType } from "@/types/all/Cart";
import { rootAPI } from "@/features/root/rootAPI";

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
                } as unknown as CartType;

              const index = draft.cart.items.findIndex(
                (item) => item.bookID === bookID
              );
              if (index === -1) {
                draft.cart.items.push({
                  bookID,
                  cartID: "👻",
                  id: "👻",
                  qty: 1,
                });
              } else {
                if (act === KEY_ACTION_CART.REMOVE_FROM_CART)
                  draft.cart.items.splice(index, 1);
                else
                  draft.cart.items[index].qty +=
                    act === KEY_ACTION_CART.INC_QTY_CART ? 1 : -1;
              }
            })
          );

          try {
            await queryFulfilled;
            dispatch(
              apiSlice.util.invalidateTags([TagsAPI.USER_CART, TagsAPI.USER])
            );
          } catch (err: any) {
            console.log(err);

            patched.undo();
          }
        });
      },
    }),

    getFreshQtyItem: builder.query<
      BaseResAPI<{ qty: number }>,
      { cartItemID: string }
    >({
      query: ({ cartItemID }) => ({
        url: `${B_URL}/input/${cartItemID}`,
        method: "GET",
      }),
    }),

    updateCartInput: builder.mutation<
      BaseResAPI<void>,
      { qty: string; cartItemID: string }
    >({
      query: ({ qty, cartItemID }) => ({
        url: `${B_URL}/input/${cartItemID}`,
        method: "PATCH",
        data: { qty },
      }),

      async onQueryStarted({ qty, cartItemID }, { dispatch, queryFulfilled }) {
        await catchErr(async () => {
          const patched = dispatch(
            rootAPI.util.updateQueryData("getUserCart", undefined, (draft) => {
              const existingIndex = draft.cart.items.findIndex(
                (el) => el.id === cartItemID
              );
              if (existingIndex === -1) return;

              draft.cart.items[existingIndex].qty = +qty;
            })
          );

          try {
            await queryFulfilled;

            dispatch(
              apiSlice.util.invalidateTags([TagsAPI.USER, TagsAPI.USER_CART])
            );
          } catch (err) {
            console.log(err);

            patched.undo();
          }
        });
      },
    }),

    updateCartMousePress: builder.mutation<
      BaseResAPI<void>,
      { bookID: string; qty: number }
    >({
      query: ({ bookID, qty }) => ({
        url: `${B_URL}/press/${bookID}`,
        method: "PATCH",
        data: { qty },
      }),

      async onQueryStarted({ bookID, qty }, { queryFulfilled, dispatch }) {
        await catchErr(async () => {
          const patched = dispatch(
            rootAPI.util.updateQueryData("getUserCart", undefined, (draft) => {
              if (!isArrOk(draft?.cart?.items))
                draft.cart = {
                  items: [],
                } as unknown as CartType;

              const index = draft.cart.items.findIndex(
                (item) => item.bookID === bookID
              );
              if (index === -1) {
                draft.cart.items.push({
                  bookID,
                  cartID: "👻",
                  id: "👻",
                  qty,
                });
              } else {
                if (draft.cart.items.length < 2 && !qty)
                  draft.cart = {
                    items: [],
                  } as unknown as CartType;
                else draft.cart.items[index].qty = qty;
              }
            })
          );

          try {
            await queryFulfilled;
            dispatch(
              apiSlice.util.invalidateTags([TagsAPI.USER_CART, TagsAPI.USER])
            );
          } catch (err) {
            console.log(err);

            patched.undo();
          }
        });
      },
    }),
  }),
});
