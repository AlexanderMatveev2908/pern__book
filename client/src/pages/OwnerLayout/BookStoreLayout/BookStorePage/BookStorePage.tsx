import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { useGetBookStoreQuery } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

const BookStorePage: FC = () => {
  useScroll();

  const { bookStoreID } = useParams() ?? {};
  const itPass = useMemo(() => REG_ID.test(bookStoreID ?? ""), [bookStoreID]);
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};
  const res = useGetBookStoreQuery(bookStoreID!, {
    skip: !itPass,
  });
  useWrapQueryAPI({ ...res });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isVerified && itPass,
        isLoading: res?.isLoading,
      }}
    ></WrapPageAPI>
  );
};

export default BookStorePage;
