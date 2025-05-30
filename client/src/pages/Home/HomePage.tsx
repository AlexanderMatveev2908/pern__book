import ImagesSwapper from "@/pages/Home/components/ImagesSwapper";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { formatD, isArrOk, priceFormatter } from "@/core/lib/lib";
import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { rootAPI } from "@/features/root/rootAPI";
import apiSlice from "@/store/apiSlice";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingItem from "@/components/elements/RatingItem";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import WrapSectionHome from "@/components/HOC/WrapSectionHome";
import WrapBg from "./components/WrapBg";
import { tailwindBreak } from "@/core/config/breakpoints";
import SvgBookShelf from "@/components/svgs/BookShelf";

const getHD = () => (window.innerWidth > tailwindBreak.md ? 60 : 50);

const HomePage: FC = () => {
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const [hDate, setHDate] = useState(getHD());

  useEffect(() => {
    const resize = () => setHDate(getHD());

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (authState.loggingOut) {
      dispatch(clearNavigating());
      dispatch(apiSlice.util.resetApiState());
    }
  }, [dispatch, authState.loggingOut]);

  const res = rootAPI.useGetBooksByBestRatingQuery();
  useWrapQueryAPI({ ...res });

  const {
    data: {
      books: { booksByRating = [], booksRecent = [], booksByPrice = [] } = {},
    } = {},
  } = res ?? {};

  const ids = useCreateIds({
    lengths: [booksByRating?.length, booksRecent?.length, booksByPrice?.length],
  });

  return (
    <WrapPageAPI {...{ ...res }}>
      <div className="w-full grid grid-cols-1 gap-20">
        <SvgBookShelf {...{ className: "w-[100px] h-[100px]" }} />

        <WrapSectionHome
          {...{ title: "Best rating", len: booksByRating?.length }}
        >
          {isArrOk(booksByRating) && (
            <ImagesSwapper {...{ books: booksByRating }}>
              {(el, i) => (
                <WrapBg key={ids[0][i]}>
                  <RatingItem {...{ rat: el?.avgRating }} />
                </WrapBg>
              )}
            </ImagesSwapper>
          )}
        </WrapSectionHome>

        <WrapSectionHome
          {...{ title: "most recent", len: booksRecent?.length }}
        >
          {isArrOk(booksRecent) && (
            <ImagesSwapper {...{ books: booksRecent }}>
              {(el, i) => (
                <WrapBg key={ids[1][i]} {...{ h: hDate }}>
                  <span
                    className="txt__2 text-center clamp_txt"
                    style={{
                      lineClamp: 2,
                      WebkitLineClamp: 2,
                    }}
                  >
                    {formatD(el?.createdAt)}
                  </span>
                </WrapBg>
              )}
            </ImagesSwapper>
          )}
        </WrapSectionHome>

        <WrapSectionHome
          {...{ title: "competitive price", len: booksByPrice?.length }}
        >
          {isArrOk(booksByPrice) && (
            <ImagesSwapper {...{ books: booksByPrice }}>
              {(el, i) => (
                <WrapBg key={ids[2][i]}>
                  <span
                    className="txt__3 text-center clamp_txt"
                    style={{
                      lineClamp: 1,
                      WebkitLineClamp: 1,
                    }}
                  >
                    {priceFormatter(el?.price)}
                  </span>
                </WrapBg>
              )}
            </ImagesSwapper>
          )}
        </WrapSectionHome>
      </div>
    </WrapPageAPI>
  );
};
export default HomePage;

// dummySliceAPI.endpoints.getDummyData.useQuery();
// const dummyState: DummyStateType = useSelector(getDummy);
// const items = useSelector(selectAllDummy);
// const __d = useDispatch();

// const myCoolItem = useSelector((state) => getMyItem(state, "000"));

// useEffect(() => {
//   if (items.length && !items.find((el) => el.id === "000"))
//     __d(
//       setOne({
//         id: "000",
//         val: 99,
//       })
//     );
// }, [__d, items]);

// const { isPending, error, isError } = dummyState;

// <WrapPageAPI {...{ isLoading: isPending, isError, error }}>
//     <div className="w-full grid grid-cols-3 gap-10 items-center">
//       {items.map((el) => (
//         <button
//           onClick={() =>
//             __d(
//               updateItem({
//                 id: el.id,
//                 changes: {
//                   val: el.val + 1,
//                 },
//               })
//             )
//           }
//           // onClick={() => __d(removeItem(el.id))}
//           key={el.id}
//           className="w-[200px] border-2 border-blue-600 p-2 rounded-xl cursor-pointer"
//         >
//           {el.val}
//         </button>
//       ))}
//     </div>

//     <button
//       onClick={() => __d(addItem({ id: "000", val: 99 }))}
//       // onClick={() => __d(addItem({ id: v4(), val: 99 }))}
//       className="w-[200px] border-2 border-blue-600 p-2 rounded-xl cursor-pointer"
//     >
//       ➕
//     </button>
//     <button
//       // onClick={() => __d(clearItems())}
//       onClick={() => __d(delItems(items.slice(0, 5).map((el) => el.id)))}
//       className="w-[200px] border-2 border-blue-600 p-2 rounded-xl cursor-pointer"
//     >
//       ❌
//     </button>
//     <button
//       onClick={() =>
//         __d(
//           updateList(
//             items.map((el) => ({
//               id: el.id,
//               changes: {
//                 val: el.val + 1,
//               },
//             }))
//           )
//         )
//       }
//       className="w-[200px] border-2 border-blue-600 p-2 rounded-xl cursor-pointer"
//     >
//       ✌🏼
//     </button>
//   </div>
//   ;
// </WrapPageAPI>
