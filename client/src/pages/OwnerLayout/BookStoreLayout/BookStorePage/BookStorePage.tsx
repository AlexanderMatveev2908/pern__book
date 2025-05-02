import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { FC } from "react";
import { useParams } from "react-router-dom";

const BookStorePage: FC = () => {
  const { bookStoreID } = useParams() ?? {};
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  return (
    <WrapPageAPI
      {...{ canStay: user?.isVerified && REG_ID.test(bookStoreID ?? "") }}
    ></WrapPageAPI>
  );
};

export default BookStorePage;
