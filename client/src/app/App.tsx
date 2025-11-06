/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { setNavigator } from "@/core/lib/lib";
import { useScroll } from "@/core/hooks/hooks";
import { useNinjaToken } from "@/features/UserLayout/hooks/useNinjaToken";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import { appRoutes } from "./routes/AppRoutes";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";

const App: FC = () => {
  useScroll();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useNinjaToken();
  useGetCart();

  const authState = useSelector(getAuthState);
  const formsApp = useFormCtxConsumer();

  useEffect(() => {
    if (authState.loggingOut || authState.pushedOut)
      for (const pair of Object.entries(formsApp)) (pair as any)[1].reset({});
  }, [authState.loggingOut, authState.pushedOut]);

  return useRoutes(appRoutes);
};
export default App;
