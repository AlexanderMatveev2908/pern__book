import { useState, type FC } from "react";
import DropActionsAbs from "../Drop/DropActionsAbs";
import { LabelActionType, LabelDropType } from "@/types/types";

type PropsType = {
  dropLabel: LabelDropType;
  fields: { [key: string]: LabelActionType };
  handlers: { [key: string]: () => void };
};

const DropActionsObj: FC<PropsType> = ({ dropLabel, fields, handlers }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <DropActionsAbs
      {...{
        dropLabel,
        isDropOpen,
        setIsDropOpen,
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <div
          onClick={() => {
            handlers[k as keyof typeof handlers]();
            setIsDropOpen(false);
          }}
          key={v.id}
          className={` w-full flex justify-start items-center gap-5 py-2 el__flow  hover:text-blue-600 cursor-pointer`}
        >
          <v.icon className="icon__sm" />

          <span className="txt__2">{v.label}</span>
        </div>
      ))}
    </DropActionsAbs>
  );
};

export default DropActionsObj;
