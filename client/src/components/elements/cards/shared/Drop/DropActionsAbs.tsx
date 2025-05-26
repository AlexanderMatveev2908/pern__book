import { ReactNode, useEffect, useRef, type FC } from "react";
import DropHandler from "../../../DropHandler/DropHandler";
import { IconType } from "react-icons/lib";

type PropsType = {
  isDropOpen: boolean;
  setIsDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropLabel: {
    label?: string;
    icon?: IconType;
  };
  children?: ReactNode | ReactNode[];
};

const DropActionsAbs: FC<PropsType> = ({
  isDropOpen,
  setIsDropOpen,
  dropLabel,
  children,
}) => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listenDrop = (e: MouseEvent) => {
      if (!dropRef.current) return;

      if (!dropRef.current.contains(e.target as Node)) setIsDropOpen(false);
    };

    document.addEventListener("mousedown", listenDrop);
    return () => document.removeEventListener("mousedown", listenDrop);
  }, [setIsDropOpen]);

  return (
    <div
      ref={dropRef}
      className={`w-[250px] el__border_sm py-2 px-5 right-0 top-0 bg-neutral-950 relative h-fit`}
    >
      <DropHandler {...{ el: dropLabel, isDropOpen, setIsDropOpen }} />

      <ul
        className={`grid absolute bg-neutral-950 py-2 max-h-[150px] w-full left-0 top-[65px] el__border_sm px-3  scroll_app  scrollbar__y overflow-y-scroll z-60 transition-all duration-300 ${
          isDropOpen
            ? "pointer-events-auto -translate-y-[0] opacity-100"
            : "pointer-events-none -translate-y-[100px] opacity-0"
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

export default DropActionsAbs;
