import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { useScroll } from "@/core/hooks/hooks";
import apiSlice from "@/store/apiSlice";
import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDummy, getSomeData } from "@/features/dummy/dummySLice";
import { DispatchType } from "@/store/store";

const HomePage: FC = () => {
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();

  useScroll();

  useEffect(() => {
    if (authState.loggingOut) {
      dispatch(clearNavigating());
      dispatch(apiSlice.util.resetApiState());
    }
  }, [dispatch, authState.loggingOut]);

  const dummyState = useSelector(getDummy);

  const __d: DispatchType = useDispatch();
  const call = useCallback(() => {
    __d(getSomeData(undefined));
  }, [__d]);

  console.log(dummyState);
  useEffect(() => {
    call();
  }, [call]);

  return <div className="parent__page"></div>;
};
export default HomePage;
