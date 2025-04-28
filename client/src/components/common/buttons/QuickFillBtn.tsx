/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import { BtnAct, FormSettersProps, UserType } from "@/types/types";
import { MdDynamicForm } from "react-icons/md";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { swapAddressFieldsMerg } from "@/config/fields/UserLayout/fieldsProfile";

type PropsType = {
  isPhoneIn: boolean;
} & Omit<FormSettersProps, "watch">;

const quickFillBtn = {
  label: "Use Profile data",
  icon: MdDynamicForm,
};

const QuickFillBtn: FC<PropsType> = ({ setValue, isPhoneIn }) => {
  const { data: { user } = {} } = (useGetUserProfileQuery() ??
    {}) as unknown as {
    data: { user: UserType };
  };

  const handleClick = () => {
    let i = swapAddressFieldsMerg.length - 1;
    do {
      const curr = swapAddressFieldsMerg[i];

      if (!isPhoneIn && curr === "phone") {
        i--;
        continue;
      }

      setValue(curr, user?.[curr as keyof UserType] ?? "");
      i--;
    } while (i >= 0);
  };

  return (
    <ButtonIcon
      {...{
        handleClick,
        act: BtnAct.INFO,
        el: quickFillBtn,
        isPending: false,
      }}
    />
  );
};
export default QuickFillBtn;
