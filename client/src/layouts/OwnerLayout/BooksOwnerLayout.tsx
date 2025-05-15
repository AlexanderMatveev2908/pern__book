import WrapperLogged from "@/components/HOC/WrapperLogged";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const BooksOwnerLayout: FC = () => {
  return (
    <WrapperLogged>
      <Outlet />
    </WrapperLogged>
  );
};

export default BooksOwnerLayout;
