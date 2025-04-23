import { WrapPageAPI } from "@/components/components";
import { AllowedFromApp } from "@/types/types";
import { FC } from "react";
import { useLocation } from "react-router-dom";

const SecurityPwd: FC = () => {
  const { state } = useLocation();
  const { from } = state ?? {};

  console.log(useLocation());

  return (
    <WrapPageAPI {...{ canStay: from === AllowedFromApp.GEN }}></WrapPageAPI>
  );
};
export default SecurityPwd;
