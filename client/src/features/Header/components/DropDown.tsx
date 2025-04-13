import { FC, useEffect, useRef, useState } from "react";
import { fieldsHeaderDropNonLogged } from "../../../config/fields/fields";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

// USE_REF NINJAS 🥷🏼🥷🏼🥷🏼 VS RERENDER SUPERHERO 🦹🏼🦹🏼🦹🏼
// USER ENTER THUMB IF CLICK IT OPEN AND CAN GO TO PAGE HE WANT ON CLICK OF LINK,
// IF HE DOES NOTHING BUT LEAVE I LET DROP OPEN A LITTLE

const DropDown: FC = () => {
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

  return (
    <div className="w-fit justify-self-end relative z__drop_header">
      <div
        ref={thumbRef}
        onClick={() => {
          setHasClicked(true);
          setIsOpen((prev) => !prev);
        }}
        className="w-fit p-1"
        onMouseEnter={() => {
          setHasClicked(false);
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (hasClicked) return;
          setIsOpen(false);
          setIsLeaving(true);
        }}
      >
        <FaRegUser className="icon__md icon__logic" />
      </div>

      <div
        ref={dropRef}
        onMouseEnter={() => {
          clearTimeout(timerRef.current as NodeJS.Timeout);
          timerRef.current = null;

          setIsLeaving(false);
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        className={`absolute top-full -left-[500%] bg-[#000] el__border_sm p-3 grid gap-3 min-w-[250px] transition-all duration-500   ${
          isLeaving || isOpen
            ? ""
            : "translate-y-1/3 opacity-0 pointer-events-none"
        }`}
      >
        {fieldsHeaderDropNonLogged.map((el) => (
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
