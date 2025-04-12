import { useState } from "react";

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
