import { FC, useState } from "react";
import { v4 } from "uuid";
import { FaCheck } from "react-icons/fa";

type PropsType = {
  currForm: number;
  totLen: number;
};

const BreadCrumbForm: FC<PropsType> = ({ currForm, totLen }) => {
  const [ids] = useState(Array.from({ length: totLen }, () => v4()));

  return (
    <div className="w-full grid form__size">
      <div className="w-full relative flex justify-between">
        <div
          className="absolute border-[3px] border-blue-600 top-1/4
        left-0 w-full z-10 h-[25px] rounded-full transition-all duration-500"
        ></div>

        <div
          className={`absolute border-[3px] border-blue-600 bg-blue-600 top-1/4
        left-0 w-full z-10 h-[25px] rounded-full transition-all duration-500`}
          style={{
            width: `${(100 / totLen) * (currForm + 1)}%`,
          }}
        ></div>

        {ids.map((id, i) => (
          <div key={id} className="w-full flex z-30 justify-end">
            <div
              className={`border-[3px]  rounded-full h-[45px] w-[45px] flex justify-center items-center transition-all duration-500 ${
                i === currForm ? "scale-[1.35]" : ""
              } ${
                currForm >= i
                  ? "bg-blue-600 border-[whitesmoke]"
                  : "border-blue-600 bg-neutral-950"
              }`}
            >
              {i + 1 === totLen ? (
                <FaCheck className="min-w-[25px] min-h-[25px]" />
              ) : (
                <span className={`${i === currForm ? "txt__4" : "txt__3"}`}>
                  {i + 1}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BreadCrumbForm;
