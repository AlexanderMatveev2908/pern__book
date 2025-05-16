import { fieldsCheckReg } from "@/core/config/fieldsData/AuthLayout/auth";
import { PwdCheckerType } from "@/types/types";
import { FC, useCallback, useMemo } from "react";

type PropsType = {
  pwd: string | null;
  focus: boolean;
};

const Wrapper = ({
  children,
  min,
}: {
  children: React.ReactNode;
  min: number;
}) => {
  return (
    <div
      className="max-w-full justify-items-center gap-y-5"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

const CheckRegPwd: FC<PropsType> = ({ pwd, focus }) => {
  const isValid = useMemo(
    () =>
      fieldsCheckReg.reduce(
        (acc: boolean, curr) => acc && curr.reg.test(pwd ?? ""),
        true
      ),
    [pwd]
  );

  const getColor = useCallback(
    (pwd: string | null, el: PwdCheckerType) =>
      typeof pwd === "object"
        ? "text-blue-600 border-blue-600"
        : el.reg.test(pwd)
        ? "text-green-600 border-border-green-600"
        : "text-red-600 border-red-600",
    []
  );

  const arg = fieldsCheckReg.slice(0, fieldsCheckReg.length - 1);
  const ruler = fieldsCheckReg.slice(fieldsCheckReg.length - 1)[0];

  return (
    <div
      className={`w-full grid sm:grid-cols-[1fr_100px] gap-y-5 absolute el__border_sm z-60 bg-[#000] p-3  left-0 top-[120%] pointer-events-none transition-all duration-500 ${
        focus && !isValid ? "" : "translate-y-full opacity-0"
      }`}
    >
      <Wrapper {...{ min: 50 }}>
        {arg.map((el) => (
          <div
            key={el.id}
            className={`border-2 rounded-xl p-2 el__flow flex items-center gap-5 justify-center ${getColor(
              pwd,
              el
            )}`}
          >
            <el.icon className={`icon__sm`} />
          </div>
        ))}
      </Wrapper>

      <div className="w-full flex justify-center h-fit">
        <div
          className={`border-2 rounded-xl p-2 el__flow flex items-center gap-5 justify-center ${getColor(
            pwd,
            ruler
          )}`}
        >
          <ruler.icon className={`icon__sm`} />

          <div className="w-full flex gap-2">
            <span className="txt__2">{pwd?.length ?? 0}</span>
            <span className="txt__2">/</span>
            <span className="txt__2">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckRegPwd;
