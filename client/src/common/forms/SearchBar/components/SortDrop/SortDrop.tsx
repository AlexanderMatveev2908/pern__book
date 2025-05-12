/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import ResCounterAPI from "@/components/elements/ResCounterAPI";
import { tailwindBreak } from "@/core/config/breakpoints";
import { FC, useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";

type PropsType = {
  res: any;
};

const SortDrop: FC<PropsType> = ({ res }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [labelDrop, setLabelDrop] = useState(
    window.innerWidth > tailwindBreak.sm
  );

  useEffect(() => {
    const handleLabel = () =>
      setLabelDrop(window.innerWidth > tailwindBreak.sm);

    window.addEventListener("resize", handleLabel);
    return () => {
      window.removeEventListener("resize", handleLabel);
    };
  }, []);

  const { data } = res;
  const { nHits } = data ?? {};

  return (
    <div className="w-full flex justify-between gap-8 items-center">
      {res?.isFetching || res?.isError ? (
        <div className=""></div>
      ) : (
        <ResCounterAPI {...{ nHits }} />
      )}

      <div className="w-full max-w-[250px] relative flex justify-end">
        <div
          className="w-full"
          style={{
            maxWidth: labelDrop ? "200px" : "75px",
          }}
        >
          <ButtonIcon
            {...{
              handleClick: () => setIsDropOpen(!isDropOpen),
              el: {
                icon: FaSort,
                label: labelDrop ? "Sort By" : null,
              },
            }}
          />
        </div>

        <div
          className={`absolute  right-0 w-[250px] p-2 px-4 border-2 border-blue-600 rounded-xl z-50 bg-neutral-950 scrollbar__y scrollbar__app overflow-y-auto max-h-[250px] transition-all duration-[0.4s]  ${
            isDropOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-[75px] opacity-0 pointer-events-none"
          }`}
          // ? COULD EASILY BE DONE WITH TAILWIND
          style={{
            top: "calc(100% + 15px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default SortDrop;
