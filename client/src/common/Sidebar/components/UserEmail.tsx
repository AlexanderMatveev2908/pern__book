import { FC } from "react";

type PropsType = {
  email: string;
};

const UserEmail: FC<PropsType> = ({ email }) => {
  return (
    <div className="w-full sticky top-0 flex items-center h-[65px] border-b-[3px] border-blue-600 overflow-x-auto scroll_app scroll_x z-60 bg-[#000]">
      <div className="max-w-full flex justify-start px-5 ">
        <span className="txt__3 max-w-full text-nowrap">{email}</span>
      </div>
    </div>
  );
};
export default UserEmail;
