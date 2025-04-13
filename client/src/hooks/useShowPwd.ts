import { useState } from "react";

// IMPORTANT , HERE I SET STATES INA TRICKY WAY, IS_PWD OR IS_CONFIRM DOES NOT MEAN THEY ARE SHOWN BUT THAT THEY ARE REAL PWD IN SENSE OF TYPE OF INPUT SO FALSE MEAN THEY ARE VISIBLE AND TRUE ARE NOT

export const useShowPwd = () => {
  const [isPwd, setIsPwd] = useState(true);
  const [isConfirmPwd, setIsConfirmPwd] = useState(true);

  const handleTogglePwd = () => {
    if (!isConfirmPwd) setIsConfirmPwd(true);
    setIsPwd((prev) => !prev);
  };

  const handleToggleConfirmPwd = () => {
    if (!isPwd) setIsPwd(true);
    setIsConfirmPwd((prev) => !prev);
  };

  const closeAllPwd = () => {
    setIsPwd(true);
    setIsConfirmPwd(true);
  };

  return {
    mainPwd: { isPwd, handleClick: handleTogglePwd },
    confirmPwd: { isPwd: isConfirmPwd, handleClick: handleToggleConfirmPwd },
    closeAllPwd,
  };
};
