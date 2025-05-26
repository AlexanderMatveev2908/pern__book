import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { capt, isObjOk } from "@/core/lib/lib";
import { Fragment, type FC, type ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type PropsType = {
  els?: {
    label: string;
    path: string;
  }[];
};

const BreadCrumb: FC<PropsType> = ({ els }) => {
  const ids = useCreateIds({ lengths: [els?.length ?? 0] });

  return (
    <div className="w-full flex items-center gap-x-[75px] gap-y-5 flex-wrap">
      {(() => {
        const c: ReactNode[] = [];

        let i = 0;
        while (i < (els?.length ?? 0)) {
          const curr = els?.[i];

          if (isObjOk(curr))
            c.push(
              <Fragment key={ids[0][i]}>
                <Link
                  to={curr?.path ?? ""}
                  className="el__after_below hover:text-blue-600 el__flow"
                >
                  <span
                    className="clamp_txt txt__4"
                    style={{
                      WebkitLineClamp: 2,
                      lineClamp: 2,
                    }}
                  >
                    {capt(curr?.label ?? "")}
                  </span>
                </Link>
                {isObjOk(els?.[i + 1]) && (
                  <FaChevronRight className="icon__md" />
                )}
              </Fragment>
            );

          i++;
        }

        return c;
      })()}
    </div>
  );
};

export default BreadCrumb;
