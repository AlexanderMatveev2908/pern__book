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
    <div className="w-full grid max-w-[600px]">
      <div className="w-full relative flex justify-between">
        <div
          className="absolute border-[3px] border-blue-600 top-1/4
        left-0 w-full z-10 h-[25px] rounded-full transition-all duration-500"
          style={{
            maxWidth: `${100 - 100 / totLen / 2}%`,
          }}
        ></div>

        <div
          className={`absolute border-[3px] border-blue-600 bg-blue-600 top-1/4
        left-0 w-full z-10 h-[25px] rounded-full transition-all duration-500`}
          style={{
            width: `${(100 / totLen) * (currForm + 1) - 100 / totLen / 2}%`,
          }}
        ></div>

        {ids.map((id, i) => (
          <div key={id} className="w-full flex z-30 justify-center">
            <div
              className={`border-[3px]  rounded-full h-[50px] w-[50px] flex justify-center items-center transition-all duration-500 text-[whitesmoke] ${
                i === currForm ? "scale-[1.25]" : ""
              } ${
                currForm >= i
                  ? "bg-blue-600 border-[whitesmoke]"
                  : "border-blue-600 bg-neutral-950"
              }`}
            >
              {i + 1 === totLen ? (
                <FaCheck className="min-w-[25px] min-h-[25px]" />
              ) : (
                <span className="txt__5">{i + 1}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BreadCrumbForm;
