import { capt, isObjOk } from "@/core/lib/lib";
import { FC, ReactNode, useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

type PropsType = {
  els?: {
    label: string;
    path: string;
  }[];
};

const BreadCrumb: FC<PropsType> = ({ els }) => {
  const ids = useMemo(
    () =>
      Array.from({ length: 2 }, () =>
        Array.from({ length: els?.length ?? 0 }, () => v4())
      ),
    [els?.length]
  );

  return (
    <div className="w-full flex items-center gap-x-[75px] gap-y-5 flex-wrap pointer-events-auto">
      {(() => {
        const nodes: ReactNode[] = [];

        if (!ids.length) return nodes;

        let i = 0;
        while (i < (els?.length ?? 0)) {
          const curr = els?.[i];
          if (!curr) break;

          nodes.push(
            <Link
              key={ids[0][i]}
              to={curr.path}
              className="el__after_below el__flow hover:text-blue-600"
            >
              <span
                className="txt__4 clamp_txt"
                style={{
                  WebkitLineClamp: 1,
                  lineClamp: 1,
                }}
              >
                {capt(curr.label)}
              </span>
            </Link>
          );

          if (isObjOk(els?.[i + 1]))
            nodes.push(
              <FaChevronRight key={ids[1][i + 1]} className="icon__md" />
            );

          i++;
        }

        return nodes;
      })()}
    </div>
  );
};

export default BreadCrumb;
