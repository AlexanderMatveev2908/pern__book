import { Title } from "@/components/components";
import CreateBookStore from "@/features/OwnerLayout/CreateBooksStore/CreateBookStore";
import { FC } from "react";

const CreateBooksStorePage: FC = () => {
  return (
    <div className="parent__page">
      <Title {...{ title: "create a bookstore" }} />
      <CreateBookStore />
    </div>
  );
};
export default CreateBooksStorePage;
