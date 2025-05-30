import { FC, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { setNavigator } from "@/core/lib/lib";
import { useScroll } from "@/core/hooks/hooks";
import appRoutes from "./routes/AppRoutes";
import { useNinjaToken } from "@/core/hooks/all/api/useNinjaToken";

const App: FC = () => {
  useScroll();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useNinjaToken();

  return useRoutes(appRoutes);
};
export default App;
