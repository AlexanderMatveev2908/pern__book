import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  el: {
    icon: IconType;
    label: string;
    val: string;
  };
  styleSubParents?: (string | null)[];
};

const SpanPageInfo: FC<PropsType> = ({ el, styleSubParents }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    const elDOM: HTMLDivElement | null = scrollRef.current;
    if (!elDOM) return;

    setIsScrolling(elDOM.scrollWidth > elDOM.clientWidth);
  }, []);

  useEffect(() => {
    handleScroll();

    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [handleScroll]);

  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-5 items-center">
      <div className={`flex items-center gap-5 ${styleSubParents?.[0] ?? ""}`}>
        <el.icon className="icon__md" />
        <span className="txt__4">{el.label}</span>
      </div>

      <div
        ref={scrollRef}
        className={`flex max-w-full  overflow-x-auto scroll_app scroll_x min-w-0 h-fit ${
          isScrolling ? "mt-3" : ""
        }  ${styleSubParents?.[1] ?? ""}`}
      >
        <span className={`${isScrolling ? "pb-3" : ""} txt__4 text-nowrap`}>
          {el.val}
        </span>
      </div>
    </div>
  );
};

export default SpanPageInfo;
