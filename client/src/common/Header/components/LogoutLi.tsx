import { FC } from "react";
import { LogOut } from "lucide-react";
import { useLogout } from "@/core/hooks/hooks";
import MiniSpinner from "@/components/elements/spinners/MiniSpinner/MiniSpinner";

type PropsType = {
  handleMainClick: () => void;
};

const LogoutLi: FC<PropsType> = ({ handleMainClick }) => {
  const { handleClick, isLoading } = useLogout();

  return (
    <button
      onClick={() => handleClick(handleMainClick)}
      className="items-center justify-start w-full flex gap-5 el__after_below el__flow hover:text-blue-600"
    >
      {isLoading ? <MiniSpinner /> : <LogOut className="icon__sm" />}
      <span className="txt__2">Logout</span>
    </button>
  );
};
export default LogoutLi;
