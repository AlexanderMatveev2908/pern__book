import { FC } from "react";
import "./MiniSpinner.css";

const MiniSpinner: FC = () => {
  return (
    <div className="w-[35px] h-[35px] border-[4px] border-blue-600 border-r-transparent border-b-transparent rounded-full el__mini_spinner"></div>
  );
};
export default MiniSpinner;
