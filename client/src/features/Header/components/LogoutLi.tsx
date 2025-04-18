import { FC } from "react";
import { LogOut } from "lucide-react";
import { MiniSpinner } from "@/components/components";
import { useLogoutUserMutation } from "@/features/AuthLayout/authSliceAPI";
import { useWrapperAPI } from "@/hooks/hooks";

const LogoutLi: FC = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation({});

  const { wrapMutationAPI } = useWrapperAPI();
  const handleCLick = async () => {
    const res = await wrapMutationAPI({ cbAPI: () => logoutUser({}) });
  };

  return (
    <button
      onClick={handleCLick}
      className="items-center justify-start w-full flex gap-5 el__after_below el__flow hover:text-blue-600"
    >
      {isLoading ? <MiniSpinner /> : <LogOut className="icon__sm" />}
      <span className="txt__2">Logout</span>
    </button>
  );
};
export default LogoutLi;
