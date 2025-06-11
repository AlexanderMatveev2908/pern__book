/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC } from "react";
import ButtonLink from "../../buttons/ButtonLink";
import { linksCardApp } from "@/core/config/fieldsData/labels/shared";
import { isStr } from "@/core/lib/lib";

type PropsType = {
  ids?: (string | null)[];
};

const PairBtnsLink: FC<PropsType> = ({ ids }) => {
  const links = useMemo(
    () => linksCardApp(ids).filter((el) => isStr(el.path)),
    [ids]
  );

  return !ids?.length ? null : (
    <div
      className="w-full grid gap-y-3 justify-items-center items-center gap-x-8"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {links.map((el, i) => (
        <ButtonLink key={ids![i]} {...({ el } as any)} />
      ))}
    </div>
  );
};

export default PairBtnsLink;
