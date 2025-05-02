import ImagesSwapper from "@/components/elements/ImagesSwapper/ImagesSwapper";
import { FC } from "react";
import { heroImages } from "@/core/config/assetsDev/assetsDev";

const Hero: FC = () => {
  return (
    <div className="parent_page px-10">
      <ImagesSwapper {...{ images: heroImages }} />
    </div>
  );
};
export default Hero;
