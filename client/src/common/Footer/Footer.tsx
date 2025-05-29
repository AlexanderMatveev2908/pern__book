import { FC } from "react";
import { Link } from "react-router-dom";
import NewsLetter from "./components/NewsLetter";
import Title from "@/components/elements/Title";
import {
  contactLinks,
  FooterLinkType,
  gitLinks,
} from "@/core/config/fieldsData/footer";

const WrapLink = ({ arg, title }: { arg: FooterLinkType[]; title: string }) => (
  <div className="w-full grid grid-cols-1 max-w-full gap-5 text-gray-300">
    <Title {...{ title, styleTxt: "txt__4", styleParent: "justify-start" }} />
    {arg.map((el) => (
      <a
        key={el.id}
        href={el.url}
        className="w-full justify-start el__after_below flex max-w-full items-center gap-5 el__flow hover:text-blue-600"
      >
        <el.icon className="icon__md" />
        <span
          className="txt__2 clamp_txt"
          style={{
            lineClamp: 2,
            WebkitLineClamp: 2,
          }}
        >
          {el.label}
        </span>
      </a>
    ))}
  </div>
);

const Footer: FC = () => {
  return (
    <div className="w-full border-t-[3px] border-blue-600 grid gap-10 px-5 sm:px-10 pt-5 pb-14 bottom-0 txt__col">
      <Link to="/" className="text-blue-600 w-fit">
        <span className="txt__5">LOGO</span>
      </Link>

      <div className="w-full max-w-full grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
        <WrapLink {...{ arg: gitLinks, title: "GitHub" }} />
        <WrapLink {...{ arg: contactLinks, title: "Contact" }} />
      </div>

      <NewsLetter />

      <div className="w-full">
        <p className="txt__3">
          No copyright. Open source. Contributions welcome ✌🏽
        </p>
      </div>
    </div>
  );
};
export default Footer;
