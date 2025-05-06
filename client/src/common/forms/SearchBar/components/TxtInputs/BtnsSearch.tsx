import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import { FaSort } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { getSize } from "../../SearchBar";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {};

const BtnsSearch: FC<PropsType> = ({}) => {
  const {
    labels: { labelSearch },
  } = useSearchCtx();

  return (
    <div className="w-full gap-x-10 grid grid-cols-2 gap-y-5">
      <div className={`w-full justify-self-center ${getSize(labelSearch)}`}>
        <ButtonIcon
          {...{
            handleClick: () => console.log(`dff`),
            el: {
              icon: IoFilter,
              label: labelSearch ? "Filter" : null,
            },
          }}
        />
      </div>

      <div className={`w-full justify-self-center ${getSize(labelSearch)}`}>
        <ButtonIcon
          {...{
            handleClick: () => console.log(`ddd`),
            el: {
              icon: FaSort,
              label: labelSearch ? "Sort" : null,
            },
          }}
        />
      </div>
    </div>
  );
};

export default BtnsSearch;
