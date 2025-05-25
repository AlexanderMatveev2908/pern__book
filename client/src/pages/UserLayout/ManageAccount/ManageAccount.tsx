import WrapperManageAccount from "@/components/HOC/WrapperManageAccount";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { useShowPwd } from "@/core/hooks/hooks";
import { makeDelay } from "@/core/lib/lib";
import { AllowedFromApp } from "@/types/types";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChangeEmail from "./components/ChangeEmail";
import ResetPwd from "./components/ResetPwd";
import DeleteAccount from "./components/DeleteAccount";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  ActionsManageAccount,
  titlesFormsManage,
} from "@/core/config/fieldsData/UserLayout/manageAccount";
import ButtonsSwapper from "@/components/forms/layouts/ButtonsSwapper/ButtonsSwapper";
import { SwapModeType } from "@/core/contexts/SwapCtx/ctx/initState";

const ManageAccount: FC = () => {
  // no need use a hook validate swap, user can do anything there are not wrong actions or inputs that should not allow u not go next swap
  const [currForm, setCurrForm] = useState(0);
  const [currSwapState, setSwapState] = useState<SwapModeType | null>(null);

  const authState = useSelector(getAuthState);

  const { state } = useLocation() ?? {};
  const { from } = state ?? {};
  const canStay = from === AllowedFromApp.GEN && authState.canManageAccount;

  const { closeAllPwd, ...propsPair } = useShowPwd();

  const setCurrFormMemo = useCallback(
    (val: number) => {
      setSwapState(SwapModeType.PENDING);
      closeAllPwd();
      setCurrForm(val);

      makeDelay(() => {
        setSwapState(SwapModeType.SWAPPED);
      }, 500);
    },
    [closeAllPwd]
  );

  return (
    <WrapPageAPI {...{ canStay }}>
      <Title {...{ title: "My account" }} />
      <div className="form__content">
        <div className="w-full overflow-hidden p-6">
          <div
            className={`w-[300%] h-fit flex transition-all duration-500 ${
              !currForm
                ? "max-h-[200px] "
                : currForm === 1
                ? "max-h-[425px] "
                : "max-h-[225px] "
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
                  <ChangeEmail
                    {...{
                      cond:
                        currForm === i &&
                        currSwapState === SwapModeType.SWAPPED,
                    }}
                  />
                ) : el.title === ActionsManageAccount.RESET_PASSWORD ? (
                  <ResetPwd
                    {...{
                      propsPwd: { ...propsPair, closeAllPwd },
                      cond:
                        currForm === i &&
                        currSwapState === SwapModeType.SWAPPED,
                      setSwapState,
                    }}
                  />
                ) : (
                  <DeleteAccount />
                )}
              </WrapperManageAccount>
            ))}
          </div>

          <div className="mt-5 w-full">
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
      </div>
    </WrapPageAPI>
  );
};
export default ManageAccount;
