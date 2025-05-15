import DropHandler from "@/components/elements/DropHandler/DropHandler";
import { doLorem } from "@/core/lib/all/utils/place";
import { BookStoreType } from "@/types/all/bookStore";
import { useState, type FC } from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";

type PropsType = {
  stores?: Partial<BookStoreType>[];
};

const choseStoreEl = {
  label: "Bookstore",
  icon: HiMiniBuildingLibrary,
};

const ChoseStore: FC<PropsType> = ({ stores }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return !stores?.length ? null : (
    <div className="w-full flex justify-end">
      <div className="w-full max-w-[300px] border-2 border-blue-600 rounded-xl py-2 px-4 relative">
        <DropHandler {...{ isDropOpen, setIsDropOpen, el: choseStoreEl }} />

        <ul className={`w-full left-0 top-full absolute z-50 bg-neutral-950`}>
          {stores.map((el) => (
            <li
              key={el.id}
              className="w-full clamp_txt txt__2"
              style={{
                WebkitLineClamp: 2,
                lineClamp: 2,
              }}
            >
              {el.name}
              {doLorem(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChoseStore;
