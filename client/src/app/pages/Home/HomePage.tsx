import { Test } from "@/components/components";
import { useScroll } from "@/hooks/hooks";
import { FC } from "react";

const HomePage: FC = () => {
  useScroll();

  return (
    <div>
      <Test />
    </div>
  );
};
export default HomePage;
