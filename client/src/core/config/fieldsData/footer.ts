import { FaGamepad, FaHotel, FaUsers } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { IoRestaurant } from "react-icons/io5";
import { v4 } from "uuid";
import { BiMath } from "react-icons/bi";
import { FaClipboardQuestion } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { MdEmail } from "react-icons/md";

export type FooterLinkType = {
  id?: string;
  label: string;
  url: string;
  icon: IconType;
};

export const linksRender = [
  {
    label: "Source code",
    url: "https://github.com/AlexanderMatveev2908/PERN__BOOK",
    icon: FiGithub,
  },
  {
    label: "MERN Food App",
    url: "https://food-app-aqkc.onrender.com",
    icon: IoRestaurant,
  },
  {
    label: "MERN Booking App",
    url: "https://mern-booking-app-0w8v.onrender.com",
    icon: FaHotel,
  },
  {
    label: "React X0",
    url: "https://react-x0.onrender.com",
    icon: FaGamepad,
  },
  {
    label: "React Calculator",
    url: "https://react-calculator-imc7.onrender.com",
    icon: BiMath,
  },
  {
    label: "REACT Form",
    url: "https://react-form-ytsc.onrender.com",
    icon: FaClipboardQuestion,
  },
  {
    label: "React Team Devs",
    url: "https://react-team-developers.onrender.com",
    icon: FaUsers,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const gitLinks = [
  {
    label: "Source code",
    url: "https://github.com/AlexanderMatveev2908/PERN__BOOK",
    icon: FiGithub,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const contactLinks = [
  {
    label: "matveevalexander470@gmail.com",
    url: "mailto:matveevalexander470@gmail.com?subject=PERN__BOOK%20📚&body=Hi,%20I%20have%20a%20question%20about%20PERN__BOOK%20🧐",
    icon: MdEmail,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
