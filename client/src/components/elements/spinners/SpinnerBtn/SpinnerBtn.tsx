import { FC, useState } from "react";
import { v4 } from "uuid";
import s from "./SpinnerBtn.module.css";

const SpinnerBtn: FC = () => {
  const [ids] = useState(Array.from({ length: 4 }, () => v4()));

  return (
    <div className="flex  gap-[15px] items-center">
      {ids.map((id, i) => (
        <div
          key={id}
          className={`${s.spinner_btn} min-w-[35px] min-h-[35px] bg-blue-600 rounded-full `}
          style={
            {
              "--delay_spinner_btn": i * 0.25 + "s",
            } as React.CSSProperties
          }
        ></div>
      ))}
    </div>
  );
};
export default SpinnerBtn;
