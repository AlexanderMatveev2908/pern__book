import { WrapPageAPI } from "@/components/components";
import { AllowedFromApp } from "@/types/types";
import { FC } from "react";
import { useLocation } from "react-router-dom";

const ManageAccount: FC = () => {
  const { state } = useLocation() ?? {};
  const { from } = state ?? {};
  const canStay = from === AllowedFromApp.GEN;

  return <WrapPageAPI {...{ canStay }}></WrapPageAPI>;
};
export default ManageAccount;
