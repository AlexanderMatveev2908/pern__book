import { SpinnerBtn } from "@/components/components";
import { X } from "lucide-react";
import { FC, useState } from "react";
import { v4 } from "uuid";

const Popup: FC = () => {
  const [ids] = useState(Array.from({ length: 2 }, () => v4()));

  return (
    <>
      <div className="z__popup_bg fixed bg-black/50 inset-0"></div>
      <div className="z__popup fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-[3px] border-blue-600 rounded-xl p-6 bg-[#000] min-w-[80%] min-h-1/2 sm:max-w-[600px] sm:min-w-[600px] grid grid-cols-1 justify-items-center txt__col gap-10 sm:gap-20">
        <button className="absolute top-1 right-2 appearance-none outline-0 flex justify-center items-center btn__logic_xl cursor-pointer">
          <X className="min-w-[40px] min-h-[40px] sm:min-w-[45px] sm:min-h-[45px] text-red-600" />
        </button>

        <div className="w-full flex pt-5">
          <span className="txt__4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            voluptatibus sintvoluptatibus sinvoluptatibus sin
          </span>
        </div>

        <div
          className="w-full gap-x-5 gap-y-5 justify-items-center h-fit items-start"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          }}
        >
          {ids.map((id) => (
            // <SpinnerBtn />
            <button
              key={id}
              className="min-w-[200px] sm:min-w-[250px] appearance-none border-2 border-blue-600 rounded-xl cursor-pointer py-2 px-3 h-fit btn__logic_md"
            >
              <span className="txt__3">Do something</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default Popup;
