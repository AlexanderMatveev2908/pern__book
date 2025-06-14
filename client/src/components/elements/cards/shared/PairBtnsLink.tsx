/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC } from "react";
import ButtonLink from "../../buttons/ButtonLink";
import { linksCardApp } from "@/core/config/fieldsData/labels/shared";
import { isStr } from "@/core/lib/lib";

type PropsType = {
  ids?: (string | null)[];
  customStyleBtns?: string[] | null;
};

const PairBtnsLink: FC<PropsType> = ({ ids, customStyleBtns }) => {
  const links = useMemo(
    () => linksCardApp(ids).filter((el) => isStr(el.path)),
    [ids]
  );

  return !ids?.length ? null : (
    <div
      className={`${
        ids.length > 1 ? "justify-items-center " : "justify-items-center"
      } w-full grid gap-y-3 items-center gap-x-8`}
      style={{
        gridTemplateColumns:
          ids.length > 1 ? "repeat(auto-fit, minmax(200px, 1fr))" : "1fr",
      }}
    >
      {links.map((el, i) => (
        <ButtonLink
          key={ids![i]}
          {...({ el, customStyle: customStyleBtns?.[i] } as any)}
        />
      ))}
    </div>
  );
};

export default PairBtnsLink;
