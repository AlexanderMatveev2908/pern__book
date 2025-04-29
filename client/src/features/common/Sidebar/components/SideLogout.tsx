import { useLogout } from "@/core/hooks/hooks";
import { LogOut } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setIsSideOpen } from "../../Header/headerSlice";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";

const SideLogout: FC = () => {
  const dispatch = useDispatch();
  const handleSideClick = () => dispatch(setIsSideOpen(false));

  const { handleClick, isLoading } = useLogout();

  return isLoading ? (
    <div className="flex justify-start mt-6">
      <SpinnerBtn />
    </div>
  ) : (
    <button
      onClick={() => handleClick(handleSideClick)}
      className="w-fit flex justify-start gap-5 group el__after_below items-center"
    >
      <LogOut className="icon__md icon__with_txt" />
      <span className="txt__2 el__flow group-hover:text-blue-600">Logout</span>
    </button>
  );
};
export default SideLogout;
