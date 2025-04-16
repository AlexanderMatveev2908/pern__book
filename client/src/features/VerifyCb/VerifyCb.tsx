import { FC } from "react";
import { useVerifyAccountMutation } from "./verifyCbSliceAPI";
import { useSearchParams } from "react-router-dom";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";

const VerifyCb: FC = () => {
  const [searchParams] = useSearchParams();

  const [verifyAccount, { isLoading, isError, error }] =
    useVerifyAccountMutation();

  return <WrapPageAPI />;
};
export default VerifyCb;
