import { FC, useState } from "react";
import {
  fieldsAuth__0,
  fieldsAuth__1,
} from "../../../config/fields/AuthLayout/fieldsAuth";
import ButtonsSwapper from "../../../components/common/ButtonsSwapper/ButtonsSwapper";
import Terms from "./components/Terms";
import FormField from "../../../components/forms/components/FormField";
import BreadCrumbForm from "../../../components/common/BreadCrumbForm";
import Button from "../../../components/common/buttons/Button/Button";

const Register: FC = () => {
  const [currForm, setCurrForm] = useState(0);

  return (
    <div className="w-full grid justify-items-center gap-5">
      <BreadCrumbForm {...{ currForm, totLen: 2 }} />

      <div className="w-full grid border-[3px] border-blue-600 rounded-xl max-w-[600px] text-[whitesmoke]">
        <div className="w-full grid p-6 overflow-hidden">
          <div
            className={`min-w-[200%] flex transition-all duration-500 ${
              !currForm
                ? "max-h-[350px] min-h-[350px]"
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
              {fieldsAuth__0.map((el) => (
                <FormField key={el.id} {...{ el }} />
              ))}
            </div>
            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                currForm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {fieldsAuth__1.map((el) => (
                <FormField key={el.id} {...{ el }} />
              ))}

              <Terms />
            </div>
          </div>

          <ButtonsSwapper {...{ currForm, setCurrForm, totLen: 2 }}>
            <Button {...{ isPending: false }} />
          </ButtonsSwapper>
        </div>
      </div>
    </div>
  );
};
export default Register;
