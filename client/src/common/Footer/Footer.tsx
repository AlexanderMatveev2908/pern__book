import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import NewsLetter from "./components/NewsLetter";
import Title from "@/components/elements/Title";
import {
  contactLinks,
  FooterLinkType,
  gitLinks,
} from "@/features/common/Footer/fields/footer";
import { HappyGhost } from "@/components/svgs";
import { clampBy } from "@/core/lib/lib";

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
        <span className="txt__2 clamp_txt" {...clampBy(2)}>
          {el.label}
        </span>
      </a>
    ))}
  </div>
);

const Footer: FC = () => {
  const path = useLocation().pathname;

  return (
    <div
      className={`w-full border-t-[3px] border-blue-600 grid gap-10 px-5 sm:px-10 pt-5 bottom-0 txt__col ${
        ["/consumer/cart/summary", "/consumer/checkout"].includes(path)
          ? "pb-[100px]"
          : "pb-10"
      }`}
    >
      <Link to="/" className="">
        <HappyGhost className="w-[100px] h-[100px]" fill="#000" />
      </Link>

      <div className="w-full max-w-full grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
        <WrapLink {...{ arg: gitLinks, title: "GitHub" }} />
        <WrapLink {...{ arg: contactLinks, title: "Contact" }} />
      </div>

      <NewsLetter />

      <div className="w-full">
        <p className="txt__3 text-center">
          No copyright. Open source. Contributions welcome ✌🏽
        </p>
      </div>
    </div>
  );
};
export default Footer;
