import { useState, type FC } from "react";
import { KEY_MAP_STORE } from "@/core/config/fieldsData/labels";
import { LabelActionType, LabelDropType } from "@/types/types";
import DropActionsAbs from "../Drop/DropActionsAbs";

type PropsType = {
  dropLabel: LabelDropType;
  fields: (LabelActionType & { originalKey: KEY_MAP_STORE })[];
  handlers: Map<KEY_MAP_STORE, () => void>;
};

const DropActionsMapObj: FC<PropsType> = ({ fields, dropLabel, handlers }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <DropActionsAbs {...{ isDropOpen, setIsDropOpen, dropLabel }}>
      {!fields?.length
        ? null
        : fields.map((el) => (
            <div
              key={el.id}
              className={` w-full flex justify-start items-center gap-5 py-2 el__flow  hover:text-blue-600 cursor-pointer`}
              onClick={handlers.get(el.originalKey)}
            >
              <el.icon className="icon__sm" />

              <span className="txt__2">{el.label}</span>
            </div>
          ))}
    </DropActionsAbs>
  );
};

export default DropActionsMapObj;
