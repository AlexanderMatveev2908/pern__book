import { setCanManageAccount } from "@/features/AuthLayout/authSlice";
import { useGetRightManageAccountMutation } from "@/features/UserLayout/userSliceAPI";
import { useFocus, useShowPwd, useWrapMutationAPI } from "@/core/hooks/hooks";
import { preventBrowser } from "@/core/lib/all/forms/preSubmit/submit";
import { saveStorage, schemaPwd } from "@/core/lib/lib";
import { AllowedFromApp, StorageKeys } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { LinksLoggedDrop } from "@/core/config/fieldsData/AuthLayout/links";
import { passwordField } from "@/core/config/fieldsData/AuthLayout/auth";
import PwdField from "@/components/forms/inputs/PwdField/PwdField";
import Button from "@/components/elements/buttons/Button/Button";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";

const schema = z.object({
  ...schemaPwd(),
});

export type PwdSecurityForm = z.infer<typeof schema>;

const SecurityPwd: FC = () => {
  const { state } = useLocation();
  const { from } = state ?? {};
  const nav = useNavigate();

  const { wrapMutationAPI } = useWrapMutationAPI();
  const { mainPwd, closeAllPwd } = useShowPwd();

  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setFocus,
  } = useForm<PwdSecurityForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useFocus({
    key: "password",
    setFocus,
  });

  const [getRightManageAccount, { isLoading }] =
    useGetRightManageAccountMutation();

  const handleSave = handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () => getRightManageAccount(formData),
      // showToast: false,
    });
    if (!res) return;

    saveStorage({ key: StorageKeys.SECURITY, data: res.manageAccountToken });
    dispatch(setCanManageAccount(true));

    nav(LinksLoggedDrop.MANAGE_ACCOUNT, {
      state: { from: AllowedFromApp.GEN },
    });
  });

  const pwd = watch("password");
  const formOk = useMemo(
    () => pwd?.trim().length && !errors?.password?.message,
    [pwd, errors?.password?.message]
  );

  return (
    <div className="p_page">
      <Title {...{ title: "Confirm your password" }} />
      <WrapPageAPI {...{ canStay: from === AllowedFromApp.GEN }}>
        <div className="p_form__1">
          <form
            onSubmit={(e) =>
              preventBrowser(e, async () => {
                closeAllPwd();
                await handleSave();
              })
            }
            className="p_form__2"
          >
            <div className="w-full grid gap-5 p-6">
              <PwdField
                {...{ control, errors, el: passwordField, ...mainPwd }}
              />

              <div className="max-w-[300px] w-full justify-self-center mt-10">
                <Button
                  {...{
                    label: "Confirm password",
                    isDisabled: !formOk,
                    isAging: isLoading,
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </WrapPageAPI>
    </div>
  );
};

export default SecurityPwd;
