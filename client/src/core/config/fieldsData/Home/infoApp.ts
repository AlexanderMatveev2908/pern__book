import { BookShelf } from "@/components/svgs";
import { v4 } from "uuid";

export const infosAppHome = [
  {
    CompSVG: BookShelf,
    txt: ` Keep track of your stock items and collaborate with your employees
          using a system that prevents transaction conflicts by ensuring
          isolation`,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
