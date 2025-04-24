import { ButtonsSwapper, WrapPageAPI } from "@/components/components";
import {
  ActionsManageAccount,
  titlesFormsManage,
} from "@/config/fields/UserLayout/fieldsManageAccount";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { AllowedFromApp } from "@/types/types";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ResetPwd from "./components/ResetPwd";
import DeleteAccount from "./components/DeleteAccount";
import WrapperManageAccount from "@/components/HOC/WrapperManageAccount";
import ChangeEmail from "./components/ChangeEmail";
import { useShowPwd } from "@/hooks/hooks";

const ManageAccount: FC = () => {
  // no need use a hook validate swap, user can do anything there are not wrong actions or inputs that should not allow u not go next swap
  const [currForm, setCurrForm] = useState(0);

  const authState = useSelector(getAuthState);

  const { state } = useLocation() ?? {};
  const { from } = state ?? {};
  const canStay = from === AllowedFromApp.GEN && authState.canManageAccount;

  const { closeAllPwd, ...propsPair } = useShowPwd();

  const setCurrFormMemo = useCallback(
    (val: number) => {
      closeAllPwd();
      setCurrForm(val);
    },
    [closeAllPwd]
  );

  return (
    <WrapPageAPI {...{ canStay }}>
      <div className="form__content">
        <div className="w-full overflow-hidden p-6">
          <div
            className={`w-[300%] flex transition-all duration-500 ${
              !currForm
                ? "max-h-[225px] min-h-[225px]"
                : currForm === 1
                ? "max-h-[375px] min-h-[375px]"
                : "max-h-[275px] min-h-[275px]"
            }`}
            style={{
              transform: `translateX(-${(currForm * 100) / 3}%)`,
            }}
          >
            {titlesFormsManage.map((el, i) => (
              <WrapperManageAccount
                key={el.id}
                {...{ isIn: currForm === i, title: el.title }}
              >
                {el.title === ActionsManageAccount.CHANGE_EMAIL ? (
                  <ChangeEmail {...{ cond: currForm === i }} />
                ) : el.title === ActionsManageAccount.RESET_PASSWORD ? (
                  <ResetPwd
                    {...{
                      propsPwd: { ...propsPair, closeAllPwd },
                      cond: currForm === i,
                    }}
                  />
                ) : (
                  <DeleteAccount />
                )}
              </WrapperManageAccount>
            ))}
          </div>

          <ButtonsSwapper
            {...{
              currForm,
              setCurrForm: setCurrFormMemo,
              totLen: 3,
              isNextDisabled: false,
            }}
          />
        </div>
      </div>
    </WrapPageAPI>
  );
};
export default ManageAccount;
