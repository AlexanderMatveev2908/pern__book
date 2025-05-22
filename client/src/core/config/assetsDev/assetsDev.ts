import { v4 } from "uuid";
import n_1 from "./hero/n_1.avif";
import n_2 from "./hero/n_2.avif";
import n_3 from "./hero/n_3.avif";
import n_4 from "./hero/n_4.jpg";

export const heroImages = [n_1, n_2, n_3, n_4].flatMap((el) => [
  {
    src: el,
    id: v4(),
  },
]);
