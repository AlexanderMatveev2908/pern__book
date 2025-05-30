import { BookShelf, FastDeploy } from "@/components/svgs";
import { v4 } from "uuid";

type ItemHomeArgs = {
  CompSVG: React.ElementType;
  txt: string;
  id: string;
};

export const infosAppHome: ItemHomeArgs[] = [
  {
    CompSVG: FastDeploy,
    txt: `Launch your store online with a few simple, seamless steps — and start managing your business effortlessly`,
  },
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
