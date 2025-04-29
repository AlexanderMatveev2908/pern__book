import { ButtonsSwapper, Title, WrapPageAPI } from "@/components/components";
import WrapperManageAccount from "@/components/HOC/WrapperManageAccount";
import {
  ActionsManageAccount,
  titlesFormsManage,
} from "@/config/fields/UserLayout/fieldsManageAccount";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { SwapModeType } from "@/hooks/all/forms/useSwapAddress/initState";
import { useScroll, useShowPwd } from "@/hooks/hooks";
import { makeDelay } from "@/lib/lib";
import { AllowedFromApp } from "@/types/types";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChangeEmail from "./components/ChangeEmail";
import ResetPwd from "./components/ResetPwd";
import DeleteAccount from "./components/DeleteAccount";

const ManageAccount: FC = () => {
  useScroll();

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
    <div className="parent__page">
      <Title {...{ title: "My account" }} />
      <WrapPageAPI {...{ canStay }}>
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
    </div>
  );
};
export default ManageAccount;
