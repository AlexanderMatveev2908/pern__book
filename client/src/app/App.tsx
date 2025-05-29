import { FC, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { setNavigator } from "@/core/lib/lib";
import { useNinjaToken, useScroll } from "@/core/hooks/hooks";
import appRoutes from "./routes/AppRoutes";

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
