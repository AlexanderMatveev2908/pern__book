import { Button, PwdField, WrapPageAPI } from "@/components/components";
import { passwordField } from "@/config/fields/AuthLayout/fieldsAuth";
import { useFocus, useShowPwd, useWrapMutationAPI } from "@/hooks/hooks";
import { saveStorage, schemaPwd } from "@/lib/lib";
import { AllowedFromApp, StorageKeys } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useGetRightManageAccountMutation } from "./userSliceAPI";
import { LinksLoggedDrop } from "@/config/fields/general/linkFieldsLogged";
import { useDispatch } from "react-redux";
import { setCanManageAccount } from "../AuthLayout/authSlice";
import { preventBrowser } from "@/lib/all/forms/preSubmit/submit";

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
    register,
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
    <WrapPageAPI {...{ canStay: from === AllowedFromApp.GEN }}>
      <div className="parent__form">
        <form
          onSubmit={(e) =>
            preventBrowser(e, async () => {
              closeAllPwd();
              await handleSave();
            })
          }
          className="form__content"
        >
          <div className="w-full grid gap-5 p-6">
            <PwdField
              {...{ register, errors, el: passwordField, ...mainPwd }}
            />

            <div className="max-w-[250px] w-full justify-self-center mt-10">
              <Button
                {...{
                  label: "Login",
                  isDisabled: !formOk,
                  isAging: isLoading,
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </WrapPageAPI>
  );
};
export default SecurityPwd;
