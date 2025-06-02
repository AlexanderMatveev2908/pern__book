import {
  BookShelf,
  ComingSoon,
  FastDeploy,
  OpenSource,
} from "@/components/svgs";
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
    txt: `Keep track of your stock items and collaborate with your employees using a role-based system to manage access and permissions`,
  },
  {
    CompSVG: OpenSource,
    txt: `Got any ideas? We're always open to feature requests and suggestions. The code is available on GitHub!`,
  },
  {
    CompSVG: ComingSoon,
    txt: `Currently working on new features for the website, including an online shopping system with secure payments, enabling stock managers to also use the platform as a sales channel`,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
