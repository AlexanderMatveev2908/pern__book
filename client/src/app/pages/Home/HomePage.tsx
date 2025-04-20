import { Test } from "@/components/components";
import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { useScroll } from "@/hooks/hooks";
import apiSlice from "@/store/apiSlice";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <div>
      <Test />
    </div>
  );
};
export default HomePage;
