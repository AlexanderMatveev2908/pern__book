import { FC, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import "./Toast.css";
import { closeToast, getToast, openToast, ToastEventType } from "./toastSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Toast.css";

const Toast: FC = () => {
  const toastRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const clickRef = useRef<boolean>(null);

  const toastState = useSelector(getToast);
  const { toast, isToast } = toastState;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     openToast({
  //       msg: "user registered",
  //       type: ToastEventType.OK,
  //     })
  //   );
  // }, [isToast, dispatch]);

  useEffect(() => {
    const animate = () => {
      if (isToast && toastRef.current && counterRef.current) {
        toastRef.current.classList.remove("toast__out");
        counterRef.current.classList.remove("el__timer_toast");

        requestAnimationFrame(() => {
          toastRef?.current?.classList.add("toast__in");
          counterRef?.current?.classList.add("el__timer_toast");
        });

        timerRef.current = setTimeout(() => {
          clickRef.current = true;
          dispatch(closeToast());
        }, 3000);
      }
    };

    animate();
  }, [isToast, dispatch]);

  useEffect(() => {
    const animate = () => {
      if (!isToast && toastRef.current && clickRef.current) {
        clickRef.current = false;
        toastRef?.current?.classList.remove("toast__in");
        requestAnimationFrame(() => {
          toastRef?.current?.classList.add("toast__out");
        });
      }
    };

    animate();
  }, [isToast]);

  const handleCLick = () => {
    clickRef.current = true;
    dispatch(closeToast());
  };

  return (
    <div
      ref={toastRef}
      className={`z__toast fixed top-5 right-5 border-[3px] bg-[#000] rounded-xl w-fit min-w-[300px] sm:min-w-[450px] max-w-[80vw] sm:max-w-[500px] md:max-w-[600px] el__toast_container overflow-hidden ${
        toast?.type === ToastEventType.OK
          ? "border-green-600"
          : "border-red-600"
      }`}
      style={{
        transform: "translateX(150%)",
        opacity: 0,
      }}
    >
      <div className="w-full grid justify-items-start relative pb-2">
        {/* TYPE EVENT */}
        <div
          className={`w-full flex justify-start pt-[4px] px-8 ${
            toast?.type === ToastEventType.OK
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          <span className="txt__4">{toast?.type}</span>
        </div>

        {/* SIDE LINE */}
        <div
          className={`absolute top-0 bottom-0 left-0 min-w-[10px] min-h-[120%] ${
            toast?.type === ToastEventType.OK ? "bg-green-600" : "bg-red-600"
          }`}
        ></div>

        {/* CLOSE BTN */}
        <button
          onClick={handleCLick}
          className="appearance-none top-[4px] right-[4px] absolute btn__toast"
        >
          <IoClose className="icon__md text-red-600" />
        </button>

        {/* TEXT */}
        <div className="w-full flex justify-start text-[whitesmoke] py-1 px-8">
          <span className="txt__3">{toast?.msg?.toUpperCase()}</span>
        </div>

        {/* TIMER */}
        <div
          ref={counterRef}
          className={`absolute left-0 bottom-0 h-[2.5px] ${
            toast?.type === ToastEventType.OK ? "bg-green-600" : "bg-red-600"
          }`}
          style={{
            width: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};
export default Toast;
