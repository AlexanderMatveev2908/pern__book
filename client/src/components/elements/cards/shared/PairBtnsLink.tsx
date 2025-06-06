import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { BtnIconLinkType } from "@/types/types";
import type { FC } from "react";
import ButtonLink from "../../buttons/ButtonLink";

type PropsType = {
  links: BtnIconLinkType[];
};

const PairBtnsLink: FC<PropsType> = ({ links }) => {
  const ids = useCreateIds({ lengths: [links.length] });

  return (
    <div
      className="w-full grid gap-y-3 justify-items-center items-center gap-x-8"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {links.map((el, i) => (
        <ButtonLink key={ids[0][i]} {...{ el }} />
      ))}
    </div>
  );
};

export default PairBtnsLink;
