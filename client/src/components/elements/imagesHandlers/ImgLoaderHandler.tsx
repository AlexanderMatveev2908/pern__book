import { useState, type FC } from "react";
import { MdError } from "react-icons/md";

type PropsType = {
  url: string;
  customClass?: string;
  children?: React.ReactNode;
};

const ImgLoaderHandler: FC<PropsType> = ({ url, customClass, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return !isLoaded ? (
    <div
      className={`${customClass} img_loader_handler_skeleton min-w-full min-h-full relative`}
    >
      <img
        src={url}
        alt="🥷🏼"
        className="opacity-0 absolute max-w-0 max-h-0"
        onLoad={() => setIsLoaded(true)}
        onError={(err) => {
          setIsError(true);
          setIsLoaded(true);
          console.log(err);
        }}
      />
    </div>
  ) : isError ? (
    <div className="w-full h-full grid grid-cols-1 place-content-center place-items-center">
      <span className="txt__6 text-red-600">404</span>
      <MdError className="text-red-600 w-1/2 h-1/2" />
    </div>
  ) : (
    <>
      <img src={url} alt="✌🏼" className="object-contain w-full h-full" />
      {children}
    </>
  );
};

export default ImgLoaderHandler;
