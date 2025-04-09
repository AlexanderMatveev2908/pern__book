import { FC } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from "../../../store/store";
import { IoCloseSharp } from "react-icons/io5";
import { toggleSide } from "./headerSlice";

const Header: FC = () => {
  const dispatch: AppDispatchType = useDispatch();
  const isSideOpen = useSelector(
    (state: RootStateType) => state.sidebar.isSideOpen
  );

  return (
    <div className="w-full border-b-[3px] border-blue-600 sticky top-0 h-[80px] z__header bg-[#000]">
      <div className="w-full h-full items-center grid grid-cols-2 pl-3 pr-4 sm:pr-8">
        <Link to="/" className="txt__5 text-blue-600 w-fit font-[900]">
          PERN__BOOK
        </Link>

        <div className="w-full flex justify-end">
          <button onClick={() => dispatch(toggleSide())} className="btn__clear">
            {isSideOpen ? (
              <IoCloseSharp className="icon__close" />
            ) : (
              <RxHamburgerMenu className="icon__big icon__logic" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
