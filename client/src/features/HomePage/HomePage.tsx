import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { rootAPI } from "@/features/root/rootAPI";
import CardInfo from "@/features/HomePage/components/CardInfo/CardInfo";
import SlidersHome from "@/features/HomePage/components/slidersHome/SlidersHome";
import { argSNAS, infosAppHome } from "@/features/HomePage/fields/infoApp";
import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiSlice from "@/core/store/api/apiSlice";
import WrapApp from "@/components/HOC/WrapApp";
import { isArrOk } from "@/core/lib/lib";

const HomePage: FC = () => {
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.loggingOut) {
      dispatch(clearNavigating());
      dispatch(apiSlice.util.resetApiState());
    }
  }, [dispatch, authState.loggingOut]);

  const res = rootAPI.useGetBooksByBestRatingQuery();
  useWrapQueryAPI({ ...res });

  const { data: { books = {} } = {} } = res ?? {};

  return (
    <WrapApp
      {...{
        ...res,
        isSuccess: Object.values(books ?? {}).every((arg) => isArrOk(arg)),
      }}
    >
      {() => (
        <>
          <div className={`w-full grid grid-cols-1 gap-20 mt-10`}>
            <div className="w-full grid justify-center">
              {argSNAS.map((el, i, arg) => (
                <div
                  key={el.id}
                  className={`w-full max-w-fit flex ${
                    i === arg.length - 1 ? "justify-start" : "justify-center"
                  }`}
                >
                  <span className="txt__6">{el.txt}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-16">
              {infosAppHome.map((el) => (
                <CardInfo key={el.id} {...{ ...el }} />
              ))}
            </div>
            <SlidersHome {...{ ...books }} />
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default HomePage;
