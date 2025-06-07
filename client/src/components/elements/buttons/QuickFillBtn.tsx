import { FC, useMemo } from "react";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import { BtnAct, FormSettersProps, UserType } from "@/types/types";
import { MdDynamicForm } from "react-icons/md";
import { useGetU } from "@/core/hooks/all/api/useGetU";

type PropsType = {
  keysUser: string[];
} & Omit<FormSettersProps, "watch">;

const quickFillBtn = {
  label: "Quick fill",
  icon: MdDynamicForm,
};

const QuickFillBtn: FC<PropsType> = ({ setValue, keysUser }) => {
  const { user } = useGetU();

  const handleClick = () => {
    let i = keysUser.length - 1;
    do {
      const curr = keysUser[i];

      setValue(curr, user?.[curr as keyof UserType] ?? "", {
        shouldValidate: true,
      });
      i--;
    } while (i >= 0);
  };

  const hasSenseShowBtn = useMemo(() => {
    let hasSense = false;

    let i = 0;

    do {
      const curr = keysUser[i];
      const val = user?.[curr as keyof UserType];
      if (typeof val === "string" && val.trim().length) {
        hasSense = true;
        break;
      }
      i++;
    } while (i < keysUser.length);

    return hasSense;
  }, [user, keysUser]);

  return !hasSenseShowBtn ? null : (
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
