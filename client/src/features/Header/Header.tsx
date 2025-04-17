import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType } from "../../store/store";
import { IoCloseSharp } from "react-icons/io5";
import { getSIde, toggleSide } from "./headerSlice";
import DropDown from "./components/DropDown";
import { useGetUserProfileQuery, UserProfile } from "../root/rootSliceAPI";
import MiniSpinner from "@/components/common/spinners/MiniSpinner/MiniSpinner";
import { getAuthState } from "../AuthLayout/authSlice";
import { useWrapQueryAPI } from "@/hooks/hooks";
import { getData, getStorage, saveStorage } from "@/lib/lib";
import { StorageKeys } from "@/types/types";

const capitalize = (str?: string) => str?.at(0) ?? "";

const Header: FC = () => {
  const [init, setInit] = useState<string | null>(
    getStorage(StorageKeys.INIT) ?? null
  );

  const dispatch: DispatchType = useDispatch();
  const isSideOpen = useSelector(getSIde).isSideOpen;
  const { isLogged } = useSelector(getAuthState);

  const res = useGetUserProfileQuery({});

  useWrapQueryAPI({ ...res });
  const { user }: UserProfile = getData(res) ?? {};

  useEffect(() => {
    if (user && !init) {
      setInit(capitalize(user?.firstName) + capitalize(user?.lastName));
      saveStorage({ data: init, key: StorageKeys.INIT });
    }
  }, [user, init]);

  const isLoading = res.isLoading;
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
            <DropDown {...{ isLogged, isLoading, init }} />
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
