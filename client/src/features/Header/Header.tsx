import { FC } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType } from "../../store/store";
import { IoCloseSharp } from "react-icons/io5";
import { getSIde, toggleSide } from "./headerSlice";
import DropDown from "./components/DropDown";
import { useGetUserProfileQuery } from "../root/rootSliceAPI";
import MiniSpinner from "@/components/common/spinners/MiniSpinner/MiniSpinner";
import { getAuthState } from "../AuthLayout/authSlice";

const Header: FC = () => {
  const dispatch: DispatchType = useDispatch();
  const isSideOpen = useSelector(getSIde).isSideOpen;
  const { isLogged } = useSelector(getAuthState);

  const { data, isLoading } = useGetUserProfileQuery();

  const acr = (data?.firstName?.at(0) ?? "") + (data?.lastName?.at(0) ?? "");

  return (
    <div className="w-full border-b-[3px] border-blue-600 sticky top-0 h-[80px] z__header bg-[#000]">
      <div className="w-full h-full items-center grid grid-cols-2 pl-3 pr-4 sm:pr-8">
        <Link to="/" className="txt__6 text-blue-600 w-fit">
          PERN__BOOK
        </Link>

        <div className="w-full flex justify-end gap-4 txt__col items-center">
          {isLoading ? (
            <MiniSpinner />
          ) : (
            <DropDown {...{ isLogged, isLoading, acr }} />
          )}

          <button
            onClick={() => dispatch(toggleSide())}
            className="justify-self-end"
          >
            {isSideOpen ? (
              <IoCloseSharp className="icon__close" />
            ) : (
              <RxHamburgerMenu className="icon__lg icon__logic" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
