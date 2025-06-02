import { FC, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { setNavigator } from "@/core/lib/lib";
import { useScroll } from "@/core/hooks/hooks";
import appRoutes from "./routes/AppRoutes";
import { useNinjaToken } from "@/features/UserLayout/hooks/useNinjaToken";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";

const App: FC = () => {
  useScroll();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useNinjaToken();
  useGetCart();

  return useRoutes(appRoutes);
};
export default App;
