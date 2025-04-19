import { getAuthState } from "@/features/AuthLayout/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const TestPage: FC = () => {
  const authState = useSelector(getAuthState);
  return (
    <div className="parent__page txt__col">
      <div className="w-full flex justify-center">
        <span className="txt__6">Protected page</span>
      </div>
    </div>
  );
  // return !authState.isLogged ? (
  //   <Navigate to="/auth/login" replace={true} />
  // ) : (
  //   <div className="parent__page txt__col">
  //     <div className="w-full flex justify-center">
  //       <span className="txt__6">Protected page</span>
  //     </div>
  //   </div>
  // );
};
export default TestPage;
