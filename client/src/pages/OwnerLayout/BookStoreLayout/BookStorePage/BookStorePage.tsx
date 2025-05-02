import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useScroll, useWrapMutationAPI } from "@/core/hooks/hooks";
import { __cg } from "@/core/lib/lib";
import {
  getBookStoreState,
  selectBookStoreById,
} from "@/features/OwnerLayout/bookStoreSlice";
import { useGetBookStoreMutation } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { RootStateType } from "@/store/store";
import { FC, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookStorePage: FC = () => {
  useScroll();

  const runRef = useRef<boolean>(false);

  const { bookStoreID } = useParams() ?? {};
  const itPass = useMemo(() => REG_ID.test(bookStoreID ?? ""), [bookStoreID]);
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const [mutate, { isLoading }] = useGetBookStoreMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const bookStore = useSelector((state: RootStateType) =>
    selectBookStoreById(state, bookStoreID ?? "")
  );
  const bookStoreState = useSelector(getBookStoreState);

  __cg("ent ids", bookStoreState);

  useEffect(() => {
    const handleQuery = async () => {
      if (itPass && !runRef.current) {
        runRef.current = true;
        await wrapMutationAPI({
          cbAPI: () => mutate(bookStoreID!),
          showToast: false,
        });
      }
    };

    handleQuery();
  }, [itPass, mutate, bookStoreID, wrapMutationAPI]);

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isVerified && itPass,
        isLoading: isLoading,
      }}
    ></WrapPageAPI>
  );
};

export default BookStorePage;
