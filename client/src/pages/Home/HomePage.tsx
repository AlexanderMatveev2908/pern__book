import ImagesSwapper from "@/pages/Home/components/ImagesSwapper";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { formatD, isArrOk } from "@/core/lib/lib";
import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { rootAPI } from "@/features/root/rootAPI";
import apiSlice from "@/store/apiSlice";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingItem from "@/components/elements/RatingItem";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import WrapSectionHome from "@/components/HOC/WrapSectionHome";

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

  const { data: { booksByRating, booksRecent } = {} } = res ?? {};

  const ids = useCreateIds({
    lengths: [booksByRating?.length, booksRecent?.length],
  });

  return (
    <WrapPageAPI {...{ ...res }}>
      <div className="w-full grid grid-cols-1 gap-20">
        <WrapSectionHome {...{ title: "Best rating" }}>
          {isArrOk(booksByRating) && (
            <ImagesSwapper {...{ books: booksByRating }}>
              {(el, i) => (
                <div
                  key={ids[0][i]}
                  className="w-full absolute bottom-0 bg-black/90 h-[40px] rounded-xl"
                >
                  <div className="w-full flex h-full items-center">
                    <RatingItem {...{ rat: el?.avgRating }} />
                  </div>
                </div>
              )}
            </ImagesSwapper>
          )}
        </WrapSectionHome>

        <WrapSectionHome {...{ title: "most recent" }}>
          {isArrOk(booksRecent) && (
            <ImagesSwapper {...{ books: booksRecent }}>
              {(el, i) => (
                <div
                  key={ids[1][i]}
                  className="w-full absolute bottom-0 bg-black/90 h-[50px] rounded-xl"
                >
                  <div className="w-full flex justify-center h-full items-center">
                    <span
                      className="txt__3 text-center clamp_txt"
                      style={{
                        lineClamp: 2,
                        WebkitLineClamp: 2,
                      }}
                    >
                      {formatD(el?.createdAt)}
                    </span>
                  </div>
                </div>
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
