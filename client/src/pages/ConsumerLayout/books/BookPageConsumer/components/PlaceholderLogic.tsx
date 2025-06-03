import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { REG_INT } from "@/core/config/regex";
import { isStr } from "@/core/lib/lib";
import { useState, type FC } from "react";
import { LuGhost } from "react-icons/lu";

const PlaceholderLogic: FC = () => {
  const [txt, setTxt] = useState("");
  const [userNum, setUserNum] = useState("");

  return (
    <div
      className="w-full items-center gap-x-10 gap-y-5 justify-items-center"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      }}
    >
      <input
        type="text"
        value={txt}
        onChange={(e) => {
          const {
            target: { value },
          } = e;

          if (!value || REG_INT.test(value)) setTxt(value);
        }}
        className="input__sm txt__2 max-w-[300px]"
        placeholder="Enter a number..."
      />

      <div className="w-full max-w-[300px]">
        <ButtonIcon
          {...{
            el: { label: isStr(txt) ? "Click me" : "", icon: LuGhost },
            handleClick: () => {
              setUserNum(txt);
              setTxt("");
            },
            isDisabled: !isStr(txt),
          }}
        />
      </div>

      {isStr(userNum) ? (
        <div className="w-full flex justify-center">
          <span className="txt__3">Your number is {userNum}</span>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default PlaceholderLogic;
