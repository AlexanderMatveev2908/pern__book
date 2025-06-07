import { FC } from "react";
import { BtnAct } from "@/types/types";
import s from "./MiniSpinner.module.css";

type PropsType = {
  act?: BtnAct;
};

const styles = new Map([
  [BtnAct.DO, "border-green-600"],
  [BtnAct.INFO, "border-blue-600"],
  [BtnAct.DEL, "border-red-600"],
  [BtnAct.WARN, "border-yellow-500"],
]);

const MiniSpinner: FC<PropsType> = ({ act = BtnAct.INFO }) => {
  return (
    <div
      className={`${
        s.mini_spinner
      } w-[30px] h-[30px] border-[4px] border-r-transparent border-b-transparent rounded-full  ${styles.get(
        act
      )}`}
    ></div>
  );
};
export default MiniSpinner;
