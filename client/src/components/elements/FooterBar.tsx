import { useState, type FC } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

type PropsType = {
  children: React.ReactNode;
  translation?: string;
};

const FooterBar: FC<PropsType> = ({ children, translation }) => {
  const [isFooterOpen, setIsFooterOpen] = useState(true);

  return (
    <div
      className={`w-[95vw] left-1/2 -translate-x-1/2 grid grid-cols-1 gap-y-3 fixed bottom-0 p-4 border-[3px] border-b-0  border-blue-600 rounded-t-xl bg-[#000] z__footer_bar max-w-[800px] transition-all duration-500 ${
        isFooterOpen ? "translate-y-0" : translation ?? "translate-y-[80%]"
      }`}
    >
      <div
        onClick={() => setIsFooterOpen(!isFooterOpen)}
        className="w-full flex justify-center -mt-2 hover:text-blue-600 cursor-pointer"
      >
        <FaAngleDoubleUp
          className={`min-w-[50px] min-h-[50px] transition-all duration-500 ${
            isFooterOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {children}
    </div>
  );
};

export default FooterBar;
