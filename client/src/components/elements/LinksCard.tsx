import type { FC } from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

type PropsType = {
  links: {
    id: string;
    icon: IconType;
    label: string;
    path: string;
  }[];
  ID: string;
  invalid?: number[];
};

const LinksCard: FC<PropsType> = ({ links, ID, invalid }) => {
  return (
    <div className="w-full grid grid-cols-2 justify-items-center -mt-3">
      {links.map((lin, i) => (
        <Link
          key={lin.id}
          to={lin.path + ID}
          className={`px-4 py-1 flex justify-center gap-5 items-center el__flow hover:text-blue-600 el__after_below ${
            invalid?.includes(i) ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <lin.icon className="icon__md" />

          <span className="txt__2">{lin.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default LinksCard;
