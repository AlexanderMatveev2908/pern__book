import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  el: BookType;
};

const SpanTxt = ({
  txt,
  fsz,
  clamp,
}: {
  fsz: string;
  txt: string;
  clamp: number;
}) => (
  <div className="w-full flex-1 justify-center items-start max-h-fit">
    <span
      className={`${fsz} clamp_txt text-center`}
      style={{ lineClamp: clamp, WebkitLineClamp: clamp }}
    >
      {txt}
    </span>
  </div>
);

const ServerCard: FC<PropsType> = ({ el }) => {
  return (
    <div className="server flex flex-col items-center justify-start p-3 gap-2 md:gap-5 max-h-full">
      <SpanTxt {...{ txt: el.author, fsz: "txt__4", clamp: 1 }} />
      <SpanTxt {...{ txt: el.title, fsz: "txt__3", clamp: 2 }} />

      <span className="txt__2 max-h-full overflow-hidden">
        {el.description ?? ""}
      </span>
    </div>
  );
};

export default ServerCard;
