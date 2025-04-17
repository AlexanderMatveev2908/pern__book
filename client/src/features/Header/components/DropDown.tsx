import { FC, useEffect, useRef, useState } from "react";
import { fieldsHeaderDropNonLogged } from "../../../config/fields/fields";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { tailwindBreak } from "../../../config/breakpoints";

// USE_REF NINJAS 🥷🏼🥷🏼🥷🏼 VS RERENDER SUPERHERO 🦹🏼🦹🏼🦹🏼
// USER ENTER THUMB IF CLICK IT OPEN AND CAN GO TO PAGE HE WANT ON CLICK OF LINK,
// IF HE DOES NOTHING BUT LEAVE I LET DROP OPEN 250 MS SO IF DROP IS A LITTLE TOO FAR FROM THUMB U HAVE TIME TO GO THERE AND WHEN LEAVING DROP CONTENT I JUST SET DROP TO FALSE WITHOUT TIMER

const windowWrapper = (cb: () => void) => {
  if (window.innerWidth < tailwindBreak.md) return;

  return cb();
};

type PropsType = {
  isLogged: boolean;
  acr: string;
};

const DropDown: FC<PropsType> = ({ isLogged, acr }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const closeDrop = (e: MouseEvent) => {
      if (!thumbRef.current || !dropRef.current) return;
      if (
        !thumbRef.current.contains(e.target as Node) &&
        !dropRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };

    document.addEventListener("mousedown", closeDrop);
    return () => document.removeEventListener("mousedown", closeDrop);
  }, []);

  useEffect(() => {
    const closeDrop = () => {
      if (isLeaving) {
        timerRef.current = setTimeout(() => {
          setIsLeaving(false);
        }, 150);
      }
    };

    closeDrop();
  }, [isLeaving]);

  const arrDrop = fieldsHeaderDropNonLogged;
  // const arrDrop = isLogged ? [] : fieldsHeaderDropNonLogged;

  return (
    <div className="min-w-full justify-self-end flex justify-end relative z__drop_header">
      <div
        ref={thumbRef}
        onClick={() => {
          setHasClicked(true);
          setIsOpen((prev) => !prev);
        }}
        className="group btn__logic w-[45px] h-[45px] flex justify-center items-center"
        onMouseEnter={() => {
          windowWrapper(() => {
            setHasClicked(false);
            setIsOpen(true);
          });
        }}
        onMouseLeave={() => {
          if (hasClicked) return;
          windowWrapper(() => {
            setIsOpen(false);
            setIsLeaving(true);
          });
        }}
      >
        {isLogged && acr ? (
          <div className="border-blue-600 rounded-xl flex justify-center items-center border-[3px] p-[7.5px] group-hover:text-blue-600 cursor-pointer el__flow">
            <span className="txt__3 group-hover:scale-[1.15] el__flow">
              {acr}
            </span>
          </div>
        ) : (
          <FaRegUser className="icon__md icon__logic" />
        )}
      </div>

      <div
        ref={dropRef}
        onMouseEnter={() => {
          windowWrapper(() => {
            clearTimeout(timerRef.current as NodeJS.Timeout);
            timerRef.current = null;

            setIsLeaving(false);
            setIsOpen(true);
          });
        }}
        onMouseLeave={() => {
          windowWrapper(() => setIsOpen(false));
        }}
        className={`absolute top-[125%] bg-[#000] el__border_sm p-3 grid gap-3 min-w-[250px] transition-all duration-500  ${" left-[40%]"} ${
          isLeaving || isOpen
            ? ""
            : "translate-y-1/3 opacity-0 pointer-events-none"
        }`}
      >
        {arrDrop.map((el) => (
          <Link
            key={el.id}
            to={el.path}
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-5 el__after_below el__flow hover:text-blue-600"
          >
            <el.icon className="icon__sm" />
            <span className="txt__2">{el.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default DropDown;
