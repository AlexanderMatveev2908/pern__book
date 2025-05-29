import { useState, type FC } from "react";

type PropsType = {
  url: string;
  customClass?: string;
};

const ImgLoaderHandler: FC<PropsType> = ({ url, customClass }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return !isLoaded ? (
    <div
      className={`${customClass} img_loader_handler_skeleton min-w-full min-h-full relative`}
    >
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
