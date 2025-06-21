import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import LogoutLi from "./subComponents/LogoutLi.tsx";
import { getPropsNav } from "@/core/lib/lib.ts";
import { tailwindBreak } from "@/core/config/breakpoints.ts";
import { LinksLoggedDrop } from "@/features/AuthLayout/fields/links.ts";
import {
  fieldsHeaderDropLogged,
  fieldsHeaderDropNonLogged,
} from "@/features/common/Header/fields/header.ts";
import { UserType } from "@/types/types.ts";
import CartLi from "./subComponents/CartLi.tsx";
import { IoMdInformationCircleOutline } from "react-icons/io";

// USE_REF NINJAS 🥷🏼🥷🏼🥷🏼 VS RERENDER SUPERHERO 🦹🏼🦹🏼🦹🏼
// USER ENTER THUMB IF CLICK IT OPEN AND CAN GO TO PAGE HE WANT ON CLICK OF LINK,
// IF HE DOES NOTHING BUT LEAVE I LET DROP OPEN 250 MS SO IF DROP IS A LITTLE TOO FAR FROM THUMB U HAVE TIME TO GO THERE AND WHEN LEAVING DROP CONTENT I JUST SET DROP TO FALSE WITHOUT TIMER

const windowWrapper = (cb: () => void) => {
  if (window.innerWidth < tailwindBreak.md) return;

  return cb();
};

const validateCLick = (clickVal: boolean) =>
  window.innerWidth < tailwindBreak.md ? false : clickVal;

type PropsType = {
  isLogged: boolean;
  init: string | null;
  user?: UserType;
};

const DropDown: FC<PropsType> = ({ isLogged, init, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  // a couple of flag are needed i u want to make functionality of mouse enter and leave
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const thumbRef = useRef<HTMLDivElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const closeDrop = (e: MouseEvent) => {
      if (!thumbRef.current || !dropRef.current) return;
      // if u dod not include also drop, drop will be closed on mousedown and function associated with el inside drop will not run
      if (
        !thumbRef.current.contains(e.target as Node) &&
        !dropRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };

    document.addEventListener("mousedown", closeDrop);
    return () => document.removeEventListener("mousedown", closeDrop);
  }, []);

  const clearTimer = () => {
    clearTimeout(timerRef.current as NodeJS.Timeout);
    timerRef.current = null;
  };

  useEffect(() => {
    const closeDrop = () => {
      if (isLeaving) {
        timerRef.current = setTimeout(() => {
          setIsLeaving(false);
        }, 150);
      }
    };

    closeDrop();

    return () => {
      clearTimer();
    };
  }, [isLeaving]);

  // const arrDrop = fieldsHeaderDropNonLogged;
  const arrDrop = isLogged
    ? fieldsHeaderDropLogged.filter((el) =>
        isLogged && user?.isVerified
          ? el.path !== LinksLoggedDrop.VERIFY_EMAIL_LOGGED
          : el
      )
    : fieldsHeaderDropNonLogged;

  const handleMainClick = () => {
    setHasClicked(true);
    setIsOpen(false);
    setIsLeaving(false);
  };

  return (
    <div className="min-w-full justify-self-end flex justify-end z__drop_header">
      <div className="relative w-[50px] h-[50px]">
        <div
          ref={dropRef}
          onMouseEnter={() => {
            windowWrapper(() => {
              clearTimer();

              setIsLeaving(false);
              setIsOpen(true);
            });
          }}
          onMouseLeave={() => {
            windowWrapper(() => {
              setIsLeaving(false);
              setIsOpen(false);
            });
          }}
          className={`absolute top-[125%] bg-[#000] el__border_sm p-3 pb-4 grid gap-3 min-w-[250px] transition-all duration-500  ${" right-[-100%]"} ${
            !validateCLick(hasClicked) && (isLeaving || isOpen)
              ? ""
              : "translate-y-1/3 opacity-0 pointer-events-none"
          }`}
        >
          {arrDrop.map((el) => (
            <Link
              key={el.id}
              {...getPropsNav(el)}
              onClick={() => {
                setIsOpen(false);
              }}
              aria-label={`${el.label} dropdown`}
              className="w-full flex items-center gap-5 el__after_below el__flow hover:text-blue-600"
            >
              <el.icon className="icon__sm" />
              <span className="txt__2">{el.label}</span>
            </Link>
          ))}

          {!!user?.cartCount && (
            <CartLi {...{ cartCount: user?.cartCount, setIsOpen: setIsOpen }} />
          )}

          {isLogged && <LogoutLi {...{ handleMainClick }} />}
        </div>
      </div>

      <div
        ref={thumbRef}
        aria-label="dropdown header"
        role="button"
        onClick={() => {
          if (window.innerWidth > tailwindBreak.md) setHasClicked(!hasClicked);

          setIsOpen(!isOpen);
        }}
        className="group btn__logic_sm w-[45px] h-[45px] flex justify-center items-center relative"
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
        {isLogged && init ? (
          <div className="border-blue-600 rounded-xl flex justify-center items-center border-[3px] py-[7.5px] px-[10px] group-hover:text-blue-600 cursor-pointer el__flow">
            <span className="txt__3 group-hover:scale-[1.15] el__flow">
              {init}
            </span>
          </div>
        ) : (
          <FaRegUser className="min-w-[35px] min-h-[35px] icon__logic" />
        )}

        {!!user?.cartCount && (
          <div className="absolute -top-3  -right-4 z-60 bg-[#000] rounded-full">
            <IoMdInformationCircleOutline className="icon__md text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};
export default DropDown;
