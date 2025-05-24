import { useState, type FC } from "react";
import "./ImagesScroll.css";

type PropsType = {
  url: string;
};

const ImgLoaderHandler: FC<PropsType> = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return !isLoaded ? (
    <div className="img_loader_handler__el__skeleton_img min-w-full min-h-full relative">
      <img
        src={url}
        alt="🥷🏼"
        className="opacity-0 absolute max-w-0 max-h-0"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  ) : (
    <img src={url} alt="✌🏼" className="object-contain w-full h-full" />
  );
};

export default ImgLoaderHandler;
