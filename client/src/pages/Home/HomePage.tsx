import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import { rootAPI } from "@/features/root/rootAPI";
import apiSlice from "@/store/apiSlice";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlidersHome from "./components/slidersHome/SlidersHome";
import CardInfo from "./components/CardInfo/CardInfo";
import { argSNAS, infosAppHome } from "@/pages/Home/fields/infoApp";

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
    <WrapPageAPI {...{ ...res }}>
      <div className="w-full grid grid-cols-1 gap-20 home mt-10">
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
