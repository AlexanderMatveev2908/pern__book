import { useEffect, useMemo, useRef, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import { BtnAct } from "@/types/types";
import { BsCartX } from "react-icons/bs";
import { REG_INT } from "@/core/config/regex";
import { z } from "zod";
import { CartItemType } from "@/types/all/Cart";
import { cartSLiceAPI } from "@/features/ConsumerLayout/CartLayout/cartSliceAPI";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import { isStr } from "@/core/lib/lib";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import s from "./FormQty.module.css";

type PropsType = {
  el: CartItemType;
};

const schemaAtyForm = z.object({
  qty: z
    .string()
    .min(1, "qty is required")
    .max(10, "max length exceeded")
    .regex(REG_INT, "Invalid quantity format")
    .refine((val) => +(val ?? ""), {
      message: "Quantity must be at least 1",
    }),
});

type FormQtyType = z.infer<typeof schemaAtyForm>;

const FormQty: FC<PropsType> = ({ el }) => {
  const secondaryRef = useRef<HTMLInputElement | null>(null);

  const [triggerRTK, res] =
    cartSLiceAPI.endpoints.getFreshQtyItem.useLazyQuery();
  useWrapQueryAPI({
    ...res,
  });
  const { data: { qty: qtyStockDB } = {} } = res ?? {};

  const schemaX = schemaAtyForm.refine(
    (data) => +data.qty <= (qtyStockDB ?? Infinity),
    {
      message: `qty must be less than or equal to ${qtyStockDB}`,
      path: ["qty"],
    }
  );

  const [mutateUpdate, { isLoading: isLoadingPatch }] =
    cartSLiceAPI.endpoints.updateCartInput.useMutation();
  const [mutateDelete, { isLoading: isLoadingDelete }] =
    cartSLiceAPI.endpoints.updateQtyCartClick.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormQtyType>({
    resolver: zodResolver(schemaX),
    mode: "onChange",
  });
  const realTimeQtyUser = watch("qty");

  useEffect(() => {
    setValue("qty", el!.qty + "", {
      shouldValidate: true,
    });
  }, [el, setValue]);

  const handleSave = handleSubmit(
    async (data) => {
      const res = await wrapMutationAPI({
        cbAPI: () => mutateUpdate({ cartItemID: el!.id, qty: data.qty }),
      });

      if (!res || !secondaryRef?.current) return;

      secondaryRef.current.blur();
    },
    (errs) => {
      return errs;
    }
  );

  const handleDelete = async () => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        mutateDelete({
          bookID: el!.book!.id,
          act: KEY_ACTION_CART.REMOVE_FROM_CART,
        }),
    });

    if (!res) return;
  };

  const showAll = useMemo(() => !el!.book?.deletedAt && !!+el.book!.qty, [el]);

  return (
    <form
      onSubmit={handleSave}
      className={`${s.form_qty} w-full items-center grid grid-cols-1 gap-y-5 gap-x-5`}
    >
      {showAll && (
        <div className="w-full flex">
          <div className="w-full relative">
            <Controller
              control={control}
              name="qty"
              render={({ field }) => (
                <input
                  disabled={!!el!.book?.deletedAt}
                  ref={(node) => {
                    field.ref(node);
                    secondaryRef.current = node;
                  }}
                  type="text"
                  placeholder="qty..."
                  className="input__md txt__2 disabled:opacity-50"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  onFocus={() => triggerRTK({ cartItemID: el!.id })}
                />
              )}
            />

            <ErrorFormField {...{ errors, el: { field: "qty" } }} />
          </div>
        </div>
      )}

      <div
        className={`${s.parent_btns} w-full grid gap-x-4 items-center  ${
          showAll
            ? "grid-cols-2 justify-items-center"
            : "grid-cols-1 justify-items-end col-span-2"
        }`}
      >
        {showAll && (
          <div className="w-full max-w-[75px]">
            <ButtonIcon
              {...{
                el: {
                  icon: FaRegCheckCircle,
                },
                act: BtnAct.DO,
                type: "submit",
                isPending: isLoadingPatch,
                styleIcon: "icon__sm text-green-600",
                isDisabled:
                  isStr(errors?.qty?.message) || el.qty === +realTimeQtyUser,
              }}
            />
          </div>
        )}

        <div className="w-full max-w-[75px]">
          <ButtonIcon
            {...{
              el: {
                icon: BsCartX,
              },
              act: BtnAct.DEL,
              styleIcon: "icon__sm text-red-600",
              handleClick: handleDelete,
              isPending: isLoadingDelete,
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default FormQty;
