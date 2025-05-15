import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { useScroll } from "@/core/hooks/hooks";
import apiSlice from "@/store/apiSlice";
import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DummyStateType,
  getDummy,
  getSomeData,
} from "@/features/dummy/dummySLice";
import { DispatchType } from "@/store/store";
import { __cg } from "@/core/lib/lib";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";

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

  const dummyState: DummyStateType = useSelector(getDummy);

  const __d: DispatchType = useDispatch();
  const call = useCallback(() => {
    __d(getSomeData(undefined));
  }, [__d]);

  useEffect(() => {
    call();
  }, [call]);

  __cg("state", dummyState);
  return (
    <WrapPageAPI {...{ isLoading: dummyState.isPending }}>
      <div className="parent__page"></div>;
    </WrapPageAPI>
  );
};
export default HomePage;
