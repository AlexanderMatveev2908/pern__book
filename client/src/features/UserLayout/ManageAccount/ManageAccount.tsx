import { WrapPageAPI } from "@/components/components";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { AllowedFromApp } from "@/types/types";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ManageAccount: FC = () => {
  const authState = useSelector(getAuthState);

  const { state } = useLocation() ?? {};
  const { from } = state ?? {};
  const canStay = from === AllowedFromApp.GEN && authState.canManageAccount;

  return <WrapPageAPI {...{ canStay }}></WrapPageAPI>;
};
export default ManageAccount;
