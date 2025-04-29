import { FC } from "react";
import { LuCircleAlert } from "react-icons/lu";

type PropsType = {
  classCSS: string;
};

const ErrIcon: FC<PropsType> = ({ classCSS }) => {
  return (
    <div className="w-fit h-fit">
      <LuCircleAlert className={`text-red-600 ${classCSS}`} />
    </div>
  );
};
export default ErrIcon;
