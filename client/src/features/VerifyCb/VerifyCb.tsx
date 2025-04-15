import { FC } from "react";
import { useVerifyAccountMutation } from "./verifyCbSliceAPI";
import { useSearchParams } from "react-router-dom";

const VerifyCb: FC = () => {
  const [searchParams] = useSearchParams();

  const [verifyAccount, { isLoading, isError, isSuccess, error }] =
    useVerifyAccountMutation();

  return <div>VerifyCb</div>;
};
export default VerifyCb;
