import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <div className="w-full border-t-[3px] border-blue-600 grid gap-3 px-5 sm:px-10 pt-5 pb-10 absolute bottom-0 text-white">
      <Link to="/" className="text-blue-600">
        <span className="txt__5">LOGO</span>
      </Link>
    </div>
  );
};
export default Footer;
