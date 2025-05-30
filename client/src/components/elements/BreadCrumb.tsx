import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { captAll, isObjOk } from "@/core/lib/lib";
import { FC, ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type PropsType = {
  els?: {
    label: string;
    path: string;
  }[];
};

const BreadCrumb: FC<PropsType> = ({ els }) => {
  const ids = useCreateIds({
    lengths: Array.from({ length: 3 }, (_, i) =>
      i === (els?.length ?? 0) - 1 ? (els?.length ?? 1) * 2 : els?.length ?? 0
    ),
  });

  return (
    <div className="w-full flex items-center gap-x-[25px] gap-y-5 flex-wrap pointer-events-auto">
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
                className="txt__3 clamp_txt"
                style={{
                  WebkitLineClamp: 1,
                  lineClamp: 1,
                }}
              >
                {captAll(curr.label)}
              </span>
            </Link>
          );

          if (isObjOk(els?.[i + 1]))
            nodes.push(
              <div className="flex items-center" key={ids[1][i]}>
                {Array.from({ length: 1 }).map((_, i) => (
                  <FaChevronRight key={ids[2][i]} className="icon__sm" />
                ))}
              </div>
            );

          i++;
        }

        return nodes;
      })()}
    </div>
  );
};

export default BreadCrumb;
