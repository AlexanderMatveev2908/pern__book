import { isStr } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { useEffect, useRef, useState, type FC } from "react";
import s from "../ImagesSwapper.module.css";

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
  const refTxt = useRef<HTMLSpanElement | null>(null);
  const [displayTxt, setDisplayTxt] = useState(el?.description ?? "");

  useEffect(() => {
    const domEl = refTxt.current;
    if (!domEl) return;
    if (!isStr(el?.description ?? "")) {
      setDisplayTxt("N/A");
      return;
    }

    domEl.innerText = el!.description as string;
    if (domEl.scrollHeight <= domEl.clientHeight) {
      setDisplayTxt(el?.description ?? "");
      return;
    }

    let left = 0;
    let right = el.description!.length;
    let truncated = "";

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      domEl.innerText = el.description!.slice(0, mid);

      if (domEl.scrollHeight <= domEl.clientHeight) {
        truncated = el.description!.slice(0, mid);
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    setDisplayTxt(truncated.slice(0, truncated.length - 3) + "...");
  }, [el]);

  return (
    <div
      className={`${s.server} flex flex-col items-center justify-start p-3 gap-2 md:gap-5 max-h-full`}
    >
      <div className="w-full flex flex-col justify-start items-center gap-3 max-h-full">
        <SpanTxt {...{ txt: el.author, fsz: "txt__4", clamp: 1 }} />
        <SpanTxt {...{ txt: el.title, fsz: "txt__3", clamp: 2 }} />

        <span ref={refTxt} className="txt__2 max-h-full overflow-hidden">
          {displayTxt}
        </span>
      </div>
    </div>
  );
};

export default ServerCard;
