/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { type FC } from "react";
import { FaFilePdf } from "react-icons/fa";

const btnPdf = {
  label: "PDF",
  icon: FaFilePdf,
};

const PdfBtn: FC = () => {
  const hook = booksSLiceAPI.useLazyGetListPDFQuery();
  const [triggerRTK, res] = hook;
  const { isLoading, isFetching } = res;
  const isPending = isLoading || isFetching;

  useWrapQueryAPI({ ...res });

  const handlePdf = async () => {
    // ? TRY CATCH SI NOT FOR ASYNC OPERATION , EVEN IF IT CRASH WITHOUT UNWRAP ERROR IS NOT THROWN FURTHER SO WILL NOT CAUSE ISSUES, CATCH BLOCK IS MADE TO PREVENT MY DUMMY ERRORS THAT I CAN DO WORKING WITH BLOB 🥸
    try {
      const res = (await triggerRTK()) ?? {};

      const url = URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      window.open(url, "_blank");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-start">
      <div className="w-full max-w-[200px]">
        <ButtonIcon
          {...{
            el: btnPdf,
            handleClick: handlePdf,
            isPending,
          }}
        />
      </div>
    </div>
  );
};

export default PdfBtn;

// const res = await axios.get(`${backURL}/admin-books/pdf`, {
//   responseType: "blob",
//   headers: {
//     Accept: "application/pdf",
//     Authorization: `Bearer ${getStorage(StorageKeys.ACCESS)}`,
//   },
//   withCredentials: true,
// });

// try {
//   const { data } = await axios.post(
//     `${backURL}/refresh`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${getStorage(StorageKeys.ACCESS)}`,
//         Accept: "application/json",
//       },
//       withCredentials: true,
//     }
//   );
//   saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
//   __cg("refreshed");
//   handlePdf();
// } catch (err: any) {
//   console.log(err);
//   removeStorage();
//   dispatch(
//     openToast({
//       msg: "Session expired",
//       type: EventApp.ERR,
//       statusCode: 401,
//     })
//   );
//   dispatch(setPushedOut());
//   nav("/", { replace: true });
// }
