import { FC, useMemo } from "react";
import { fieldsCheckReg } from "../../../config/fields/AuthLayout/fieldsAuth";

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

  return (
    <div
      className={`w-full grid gap-y-5 absolute border-2 border-blue-600 z-60 bg-[#000] p-3 rounded-xl left-0 top-[120%] pointer-events-none el__flow ${
        focus && !isValid ? "" : "translate-y-full opacity-0"
      }`}
    >
      <Wrapper {...{ min: 50 }}>
        {fieldsCheckReg.slice(0, 3).map((el) => (
          <div
            key={el.id}
            className={`border-2 rounded-xl p-2 el__flow flex items-center gap-5 justify-center ${
              typeof pwd === "object"
                ? "text-blue-600 border-blue-600"
                : el.reg.test(pwd)
                ? "text-green-600 border-border-green-600"
                : "text-red-600 border-red-600"
            }`}
          >
            <el.icon className={`icon__sm`} />
          </div>
        ))}
      </Wrapper>
      <Wrapper {...{ min: 100 }}>
        {fieldsCheckReg.slice(3, 5).map((el, i, arg) => (
          <div
            key={el.id}
            className={`border-2 rounded-xl p-2 el__flow flex items-center gap-5 justify-center ${
              i === arg.length - 1 ? "px-4 justify-self-center" : ""
            } ${
              typeof pwd === "object"
                ? "text-blue-600 border-blue-600"
                : el.reg.test(pwd)
                ? "text-green-600 border-border-green-600"
                : "text-red-600 border-red-600"
            }`}
          >
            <el.icon className={`icon__sm`} />

            {i === arg.length - 1 ? (
              <div className="w-full flex gap-2">
                <span className="txt__2">{pwd?.length ?? 0}</span>
                <span className="txt__2">/</span>
                <span className="txt__2">8</span>
              </div>
            ) : null}
          </div>
        ))}
      </Wrapper>
    </div>
  );
};
export default CheckRegPwd;
