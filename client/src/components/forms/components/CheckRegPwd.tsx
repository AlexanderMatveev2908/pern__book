import { FC } from "react";
import { fieldsCheckReg } from "../../../config/fields/AuthLayout/fieldsAuth";
const CheckRegPwd: FC = () => {
  return (
    <div className="max-w-full grid grid-cols-3 justify-items-center items-center sm:flex sm:justify-around gap-y-5">
      {fieldsCheckReg.map((el) => (
        <div className={`border-2 border-blue-600 rounded-xl p-2`}>
          <el.icon className={`icon__sm`} />
        </div>
      ))}
    </div>
  );
};
export default CheckRegPwd;
