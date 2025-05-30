import SvgBookShelf from "@/components/svgs/BookShelf";
import SvgFastDeploy from "@/components/svgs/FastDeploy";
import SvgOpenSource from "@/components/svgs/OpenSource";
import { v4 } from "uuid";

type ItemHomeArgs = {
  CompSVG: React.ElementType;
  txt: string;
  id: string;
};

export const infosAppHome: ItemHomeArgs[] = [
  {
    CompSVG: SvgFastDeploy,
    txt: `Launch your store online with a few simple, seamless steps — and start managing your business effortlessly`,
  },
  {
    CompSVG: SvgBookShelf,
    txt: `Keep track of your stock items and collaborate with your employees using a role-based system to manage access and permissions`,
  },
  {
    CompSVG: SvgOpenSource,
    txt: `Got any ideas? We're always open to feature requests and suggestions. The code is available on GitHub!`,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
