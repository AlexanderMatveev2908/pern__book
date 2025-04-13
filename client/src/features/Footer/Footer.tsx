import { FC } from "react";
import { Link } from "react-router-dom";
import NewsLetter from "./components/NewsLetter";
import { FooterLinkType, linksRender } from "../../config/fields/fields.ts";
import Title from "../../components/common/Title.tsx";

type PropsType = {
  el: FooterLinkType;
};

const FooterLink: FC<PropsType> = ({ el }) => (
  <a
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

      <NewsLetter />

      <div className="w-full grid gap-5">
        <Title {...{ title: "Last projects ✌🏼", customStyle: "txt__4" }} />

        <div className="gap-5 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {linksRender.map((el) => (
            <FooterLink key={el.id} {...{ el }} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Footer;
