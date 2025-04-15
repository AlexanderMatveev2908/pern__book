import { FC, useEffect, useState } from "react";
import "./SpinnerPage.css";
import { v4 } from "uuid";
import { tailwindBreak } from "../../../../config/breakpoints";

const SpinnerPage: FC = () => {
  const [ids, setIds] = useState(
    Array.from({ length: window.innerWidth < tailwindBreak.sm ? 10 : 15 }, () =>
      v4()
    )
  );

  useEffect(() => {
    const updateSize = () => {
      setIds(
        Array.from(
          { length: window.innerWidth < tailwindBreak.sm ? 10 : 15 },
          () => v4()
        )
      );
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="center_abs">
      <div className="relative">
        {ids.map((id, i) => (
          <div
            key={id}
            className="el__spinner_page_in center_abs"
            style={
              {
                "--start__scale": `${(i || 1) / ids.length}`,
                rotate: `${(360 / ids.length) * i}deg`,
                "--delay_page": `${(i * 1) / ids.length}s`,
              } as React.CSSProperties
            }
          ></div>
        ))}
      </div>
    </div>
  );
};
export default SpinnerPage;
