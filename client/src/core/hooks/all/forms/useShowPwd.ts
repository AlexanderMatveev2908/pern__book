import { useCallback, useState } from "react";

// IMPORTANT , HERE I SET STATES INA TRICKY WAY, IS_PWD OR IS_CONFIRM DOES NOT MEAN THEY ARE SHOWN BUT THAT THEY ARE REAL PWD IN SENSE OF TYPE OF INPUT SO FALSE MEAN THEY ARE VISIBLE AND TRUE ARE NOT

export type ReturnShowPwd = {
  mainPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  confirmPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  closeAllPwd: () => void;
};

export const useShowPwd = (): ReturnShowPwd => {
  const [isPwd, setIsPwd] = useState(true);
  const [isConfirmPwd, setIsConfirmPwd] = useState(true);

  const handleTogglePwd = useCallback(() => {
    if (!isConfirmPwd) setIsConfirmPwd(true);
    setIsPwd((prev) => !prev);
  }, [isConfirmPwd]);

  const handleToggleConfirmPwd = useCallback(() => {
    if (!isPwd) setIsPwd(true);
    setIsConfirmPwd((prev) => !prev);
  }, [isPwd]);

  const closeAllPwd = useCallback(() => {
    setIsPwd(true);
    setIsConfirmPwd(true);
  }, []);

  return {
    mainPwd: { isPwd, handleClick: handleTogglePwd },
    confirmPwd: { isPwd: isConfirmPwd, handleClick: handleToggleConfirmPwd },
    closeAllPwd,
  };
};
