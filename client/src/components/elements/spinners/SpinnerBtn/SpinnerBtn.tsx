import { FC, useState } from "react";
import { v4 } from "uuid";
import "./Spinner.css";

const SpinnerBtn: FC = () => {
  const [ids] = useState(Array.from({ length: 4 }, () => v4()));

  return (
    <div className="flex  gap-[15px] items-center">
      {ids.map((id, i) => (
        <div
          key={id}
          className="min-w-[35px] min-h-[35px] bg-blue-600 rounded-full el__spinner_btn"
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
