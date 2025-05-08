import { FC } from "react";
import "./MiniSpinner.css";
import { BtnAct } from "@/types/types";

type PropsType = {
  act?: BtnAct;
};

const styles = new Map([
  [BtnAct.DO, "border-green-600"],
  [BtnAct.INFO, "border-blue-600"],
  [BtnAct.DEL, "border-red-600"],
]);

const MiniSpinner: FC<PropsType> = ({ act = BtnAct.INFO }) => {
  return (
    <div
      className={`w-[30px] h-[30px] border-[4px] border-r-transparent border-b-transparent rounded-full el__mini_spinner ${styles.get(
        act
      )}`}
    ></div>
  );
};
export default MiniSpinner;
