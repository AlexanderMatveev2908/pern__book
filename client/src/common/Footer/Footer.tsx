import { FC } from "react";
import { Link } from "react-router-dom";
import NewsLetter from "./components/NewsLetter";
import Title from "@/components/elements/Title";
import {
  contactLinks,
  FooterLinkType,
  gitLinks,
} from "@/core/config/fieldsData/footer";

const LinkEl = ({ el }: { el: FooterLinkType }) => (
  <a
    key={el.id}
    href={el.url}
    className="w-fit el__after_below flex items-center gap-5 el__flow hover:text-blue-600"
  >
    <el.icon className="icon__md" />
    <span className="txt__2">{el.label}</span>
  </a>
);

const Footer: FC = () => {
  return (
    <div className="w-full border-t-[3px] border-blue-600 grid gap-10 px-5 sm:px-10 pt-5 pb-10 bottom-0 txt__col">
      <Link to="/" className="text-blue-600 w-fit">
        <span className="txt__5">LOGO</span>
      </Link>

      <div className="w-full grid gap-5 text-gray-300">
        <Title {...{ title: "GitHub", styleTxt: "txt__4" }} />
        {gitLinks.map((el) => (
          <LinkEl key={el.id} {...{ el }} />
        ))}
      </div>

      <div className="w-full grid gap-5 text-gray-300">
        <Title {...{ title: "Contact", styleTxt: "txt__4" }} />
        {contactLinks.map((el) => (
          <LinkEl key={el.id} {...{ el }} />
        ))}
      </div>

      <NewsLetter />
    </div>
  );
};
export default Footer;
