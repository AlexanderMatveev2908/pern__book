import type { FC } from "react";

type PropsType = {
  els: {
    label: string;
    path: string;
  }[];
};

const BreadCrumb: FC<PropsType> = ({ els }) => {
  return <div className="w-full flex items-center"></div>;
};

export default BreadCrumb;
