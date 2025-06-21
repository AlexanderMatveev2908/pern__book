import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType } from "../../core/store/store";
import { IoCloseSharp } from "react-icons/io5";
import { getSIde, toggleSide } from "../../features/common/Header/headerSlice";
import DropDown from "./components/DropDown";
import { getAuthState } from "../../features/AuthLayout/authSlice";
import { getStorage, isObjOk, saveStorage } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";
import MiniSpinner from "@/components/elements/spinners/MiniSpinner/MiniSpinner";
import { useGetU } from "@/core/hooks/all/api/useGetU";

const capitalize = (str?: string) => str?.at(0) ?? "";

const Header: FC = () => {
  const [init, setInit] = useState<string | null>(
    getStorage(StorageKeys.INIT) ?? null
  );

  const dispatch: DispatchType = useDispatch();
  const isSideOpen = useSelector(getSIde).isSideOpen;
  const { isLogged } = useSelector(getAuthState);

  const { user, isLoading } = useGetU();

  useEffect(() => {
    if (isObjOk(user)) {
      const newInit = capitalize(user?.firstName) + capitalize(user?.lastName);
      if (!init || newInit !== init) {
        setInit(newInit);
        saveStorage({ data: newInit, key: StorageKeys.INIT });
      }
    }
  }, [init, user]);

  return (
    <div className="w-full border-b-[3px] border-blue-600 sticky top-0 h-[80px] z__header bg-[#000]">
      <div className="w-full h-full items-center grid grid-cols-2 pl-3 pr-4 sm:pr-8">
        <Link to="/" className="txt__6 text-blue-600 w-fit">
          SNAS
        </Link>

        <div className="w-full flex justify-end gap-4 txt__col items-center">
          {isLoading && !init ? (
            <MiniSpinner />
          ) : (
            <DropDown {...{ isLogged, isLoading, init, user }} />
          )}

          <button
            aria-label="toggle sidebar"
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
