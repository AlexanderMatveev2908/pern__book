import { FC, useCallback, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import {
  closeToast,
  getToast,
  openToast,
  ToastType,
} from "../../features/common/Toast/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { EventApp } from "@/types/types";
import s from "./Toast.module.css";
import { clearTimer } from "@/core/lib/lib";

/* IMPORTANT => {
THE FLOW TO MAKE IN A WAY THE ALL WORK IN RIGHT DIRECTION FOR SMOOTH UI AND SYNC IS 
USER MAKE SOMETHING
UPDATE REDUX STATE WITH PAYLOAD AND PREV BOOLEAN IS CURRENT BOOLEAN
IF PREV IS FALSE I JUST ANIMATE TOAST REMOVING FIRST PREV CLASSES AND ADDING NEW ONE  AND AFTER 3S I CALL CLOSE TOAST IN TIMEOUT , IS ESSENTIAL TO USE A REF FOR CLICK OR I U REFRESH PAGE WILL SEE A TOAST HANGING AROUND FOR NO REASON
IF PREV IS TRUE  I REMOVE TOAST IN , NOT CLASS OF TIMER IN DIV THAT KEEP COUNT OF CURR TIMING OF TOAST CAUSE I PREFER LEAVE IT, I USE REQ ANIMATION BROWSER TO ADD IMMEDIATELY CLOSE__TOAST CLASS, IT TAKE 300MS , I WANT THEN I CALL REOPEN IN REDUX THE TRIGGERS AGAIN RERENDER CAUSE IT SET TOAST TRUE BUT ALSO PREV FALSE,
SO  IT LL RERUN AGAIN ANIMATE SIMPLE EXPLAINED ABOVE,
IF TOAST IS FALSE I RESET CLICK REF CAUSE HAVE BEEN SET TRUE BY TIMER OR CLICK TO BE ALLOWED TO RUN, REMOVE TOAST IN AND ASK BROWSER TO ADD TOAST_OUT REDUX WILL SET CURR AND PREV TOAST FALSE CAUSE IT HAD ALL THE TIME TO RUN AND HANG AROUND BOUNCING IN WINDOW OF USER
IS IMPORTANT TO BALANCE BETWEEN RERENDER IN STATE IN REFS THAT ARE REALLY USEFUL NINJA THAT DO THEIR JOB WITHOUT TRIGGERING RERENDER
}

*/

const styles = {
  [EventApp.OK]: {
    border: "border-green-600",
    text: "text-green-600",
    bg: "bg-green-600",
  },
  [EventApp.INFO]: {
    border: "border-blue-600",
    text: "text-blue-600",
    bg: "bg-blue-600",
  },
  [EventApp.ERR]: {
    border: "border-red-600",
    text: "text-red-600",
    bg: "bg-red-600",
  },
};

const getBorder = (type: EventApp) => styles?.[type]?.border;
const getTxt = (type: EventApp) => styles?.[type]?.text;
const getBg = (type: EventApp) => styles?.[type]?.bg;

// ? ⚠️ COULD SEEM I USED TOO MANY REFS, MAYBE IS TRUE I DO NOT KNOW, BUT I STRONGLY RECOMMEND NO NOT USE TOO MANY STATES LIKE PREV, CLICKS ETC IN STATES BECAUSE CAN EASILY TRIGGER INFINITE LOOPS IN MANY CIRCUMSTANCES (ACCESS-REFRESH FLOW AUTH WOULD BE ONE THAT IS ALREADY TRICKY IN SOME STEPS)

const Toast: FC = () => {
  const toastRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const clickRef = useRef<boolean>(false);
  const prevToastRef = useRef<boolean>(null);
  const savedToast = useRef<ToastType | null>(null);

  const toastState = useSelector(getToast);
  const { toast, isToast } = toastState;
  const dispatch = useDispatch();

  const clearPrevAmv = useCallback(() => {
    // ? CLEAR PREV ANIMATION OR NEW WON'T WORK AS EXPECTED
    (toastRef.current as HTMLDivElement).classList.remove(s.out);
    (counterRef.current as HTMLDivElement).classList.remove(s.timer);
  }, []);

  const handleExpiredTimer = useCallback(() => {
    // ? TIMER EXPIRED MUST RESPECT 100% USER INTERACTION OR NO ANIMATION JUST BORING TRANSITION

    timerRef.current = setTimeout(() => {
      clearTimer(timerRef);
      clickRef.current = true;
      prevToastRef.current = false;
      dispatch(closeToast());
    }, 3000);
  }, [dispatch]);

  const animateIn = useCallback(() => {
    clearPrevAmv();
    prevToastRef.current = true;

    requestAnimationFrame(() => {
      toastRef?.current?.classList.add(s.in);
      counterRef?.current?.classList.add(s.timer);
    });

    handleExpiredTimer();
  }, [clearPrevAmv, handleExpiredTimer]);

  const animateOut = useCallback(() => {
    prevToastRef.current = false;
    clickRef.current = false;
    clearPrevAmv();
    clearTimer(timerRef);

    requestAnimationFrame(() => {
      toastRef?.current?.classList.add(s.out);
    });
  }, [clearPrevAmv]);

  const animatePrev = useCallback(() => {
    clearPrevAmv();
    savedToast.current = toast;
    prevToastRef.current = true;

    dispatch(closeToast());
    clickRef.current = true;
    requestAnimationFrame(() => {
      toastRef?.current?.classList.add(s.out);
    });
    clearTimer(timerRef);

    setTimeout(() => {
      // ? JUST TRIGGER RERENDER THEN OPEN TOAST HANDLER WILL MANAGE LOGIC ALREADY BUILD ABOVE
      dispatch(openToast(savedToast.current as ToastType));
    }, 500);
  }, [dispatch, toast, clearPrevAmv]);

  useEffect(() => {
    const animate = () => {
      if (!toastRef || !counterRef) return;

      if (isToast && prevToastRef.current) animatePrev();
      else if (isToast && !prevToastRef.current) animateIn();
      else if (!isToast && clickRef.current) animateOut();
    };
    animate();
  }, [isToast, animateIn, animateOut, animatePrev, toast]);

  useEffect(() => {}, []);

  const handleClick = () => {
    clickRef.current = true;
    dispatch(closeToast());
  };

  return (
    <div
      ref={toastRef}
      className={`z__toast toast fixed top-5 right-5 border-[3px] bg-[#000] rounded-xl w-fit min-w-[300px] sm:min-w-[450px] max-w-[80vw] sm:max-w-[500px] md:max-w-[600px]  overflow-hidden ${getBorder(
        toast?.type as EventApp
      )}`}
      style={{
        transform: "translateX(150%)",
        opacity: 0,
      }}
    >
      <div className="w-full grid justify-items-start relative pb-2">
        {/* TYPE EVENT */}
        <div
          className={`w-full flex justify-start pt-[4px] px-8 ${getTxt(
            toast?.type as EventApp
          )}`}
        >
          <div className="w-full flex items-center gap-3">
            <span className="txt__5">{toast?.statusCode ?? ""}</span>
            <span className="txt__4">{toast?.type}</span>
          </div>
        </div>

        {/* SIDE LINE */}
        <div
          className={`absolute top-0 bottom-0 left-0 min-w-[10px] min-h-[120%] ${getBg(
            toast?.type as EventApp
          )}`}
        ></div>

        {/* CLOSE BTN */}
        <button
          onClick={handleClick}
          className={`${s.btn} top-[4px] right-[4px] absolute `}
        >
          <IoClose className="icon__md text-red-600" />
        </button>

        {/* TEXT */}
        <div className="w-full flex justify-start txt__col py-1 px-8">
          <span className="txt__3">{toast?.msg?.toUpperCase()}</span>
        </div>

        {/* TIMER */}
        <div
          ref={counterRef}
          className={`absolute left-0 bottom-0 h-[3px] ${getBg(
            toast?.type as EventApp
          )}`}
          style={{
            width: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};
export default Toast;
