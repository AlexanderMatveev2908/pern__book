import { FC, ReactNode } from "react";
import { ProfileCtx } from "./ProfileCtx";
import { useSwapAddress } from "@/contexts/SwapAddress/useSwapAddress";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const ProfileCtxProvider: FC<PropsType> = ({ children }) => {
  return (
    <ProfileCtx.Provider value={{ ...useSwapAddress() }}>
      {children}
    </ProfileCtx.Provider>
  );
};
export default ProfileCtxProvider;
