import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import type { FC } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type PropsType = {
  rat?: number | string;
};

const RatingItem: FC<PropsType> = ({ rat = 0 }) => {
  const [ids] = useCreateIds({ lengths: [5] });

  return (
    <div className="w-full max-w-fit flex gap-1 items-center justify-center">
      {ids.map((id, i) => (
        <div key={id} className="w-fit">
          {+rat >= i + 1 ? (
            <FaStar className="icon__sm" />
          ) : +rat >= i + 0.5 ? (
            <FaStarHalfAlt className="icon__sm" />
          ) : (
            <FaRegStar className="icon__sm" />
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingItem;
