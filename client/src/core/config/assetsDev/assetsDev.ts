import { v4 } from "uuid";
import img__1 from "./hero/1.avif";
import img__2 from "./hero/2.avif";
import img__3 from "./hero/3.avif";
import img__4 from "./hero/4.avif";
import img__5 from "./hero/5.avif";

export const heroImages = [img__1, img__2, img__3, img__4, img__5].flatMap(
  (el) => [
    {
      src: el,
      id: v4(),
    },
    {
      src: el,
      id: v4(),
    },
  ]
);
