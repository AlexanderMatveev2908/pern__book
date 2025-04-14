import { useScroll } from "@/hooks/hooks";
import { FC } from "react";

const HomePage: FC = () => {
  useScroll();

  return <div>HomePage</div>;
};
export default HomePage;
