import { FC, useState } from "react";
import {
  fieldsAuth__1,
  fieldsAuth__2,
} from "../../../config/fields/AuthLayout/fieldsAuth";
import FormField from "../../../components/forms/FormField";
import ButtonsSwapper from "../../../components/common/ButtonsSwapper/ButtonsSwapper";
import Terms from "./components/Terms";

const Register: FC = () => {
  const [currForm, setCurrForm] = useState(0);

  return (
    <div className="w-full grid border-[3px] border-blue-600 rounded-xl max-w-[600px]">
      <div className="w-full grid p-6 overflow-hidden">
        <div
          className={`min-w-[200%] flex transition-all duration-500 ${
            !currForm
              ? "max-h-[200px] min-h-[200px]"
              : " max-h-[350px] min-h-[350px]"
          }`}
          style={{
            transform: `translateX(-${currForm * 50}%)`,
          }}
        >
          <div
            className={`w-full grid gap-5 items-start h-fit el__flow ${
              !currForm ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {fieldsAuth__1.map((el) => (
              <FormField key={el.id} {...{ el }} />
            ))}
          </div>
          <div
            className={`w-full grid gap-5 items-start h-fit el__flow ${
              currForm ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {fieldsAuth__2.map((el) => (
              <FormField key={el.id} {...{ el }} />
            ))}

            <Terms />
          </div>
        </div>

        <ButtonsSwapper {...{ currForm, setCurrForm, totLen: 2 }} />
      </div>
    </div>
  );
};
export default Register;
