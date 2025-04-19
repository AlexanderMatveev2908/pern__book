import { FC, useCallback, useEffect, useRef } from "react";
import { useVerifyAccountMutation } from "./verifyCbSliceAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapMutationAPI } from "@/hooks/hooks";
import { TokenEventType } from "@/types/types";
import { isObjOk } from "@/lib/lib";

const VerifyCb: FC = () => {
  const [searchParams] = useSearchParams();
  const hasRun = useRef<boolean>(false);
  const navigate = useNavigate();

  const userID = searchParams.get("userID") ?? "";
  const token = searchParams.get("token") ?? "";
  const event = searchParams.get("event") ?? "";

  const { wrapMutationAPI } = useWrapMutationAPI();

  const [verifyAccount] = useVerifyAccountMutation();

  const handleVerifyAccount = useCallback(async () => {
    const params = { token, userID, event: event as TokenEventType };
    const res = await wrapMutationAPI({
      cbAPI: () => verifyAccount(params),
      pushNotice: [true],
    });
    if (!isObjOk(res)) return;

    navigate("/", { replace: true });
  }, [userID, token, event, verifyAccount, wrapMutationAPI, navigate]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleVerifyAccount();
    }
  }, [handleVerifyAccount]);
  return <WrapPageAPI {...{ isLoading: true }} />;
};
export default VerifyCb;
