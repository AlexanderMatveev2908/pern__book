import { FC, useState } from "react";
import "./SpinnerPage.css";
import { v4 } from "uuid";

const SpinnerPage: FC = () => {
  const [ids] = useState(Array.from({ length: 10 }, () => v4()));

  return (
    <div className="el__spinner_page_container">
      <div className="relative el__spinner_page_out">
        {ids.map((id, i) => (
          <div
            key={id}
            className="el__spinner_page_in"
            style={{
              rotate: `${(360 / ids.length) * i}deg`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default SpinnerPage;
