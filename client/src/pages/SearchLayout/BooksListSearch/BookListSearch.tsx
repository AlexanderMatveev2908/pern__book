import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import type { FC } from "react";

const BookListSearch: FC = () => {
  return (
    <WrapPageAPI>
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "books", path: "#" },
          ],
        }}
      />

      <div className="p_page -mb-[175px]"></div>
    </WrapPageAPI>
  );
};

export default BookListSearch;
