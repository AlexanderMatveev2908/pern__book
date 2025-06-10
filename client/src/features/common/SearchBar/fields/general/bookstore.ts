import { NumericFilterSearch } from "@/types/types";
import { FaDatabase, FaRegStar } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { createdUpdateAtFields } from "./general";

export const avgPriceFilter: Omit<NumericFilterSearch, "id"> = {
  label: "Avg Price",
  field: "avgPrice",
  icon: TbPigMoney,
  fields: [
    {
      label: "Min avg price",
      field: "minAvgPrice",
    },
    {
      label: "Max avg price",
      field: "maxAvgPrice",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

export const avgQtyFilter: Omit<NumericFilterSearch, "id"> = {
  label: "Avg quantity",
  icon: FaDatabase,
  field: "avgQty",
  fields: [
    {
      field: "minAvgQty",
      label: "Min avg quantity",
    },
    {
      field: "maxAvgQty",
      label: "Max avg quantity",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

export const commonFieldsTxtInputsStore = [
  {
    field: "name",
    label: "Name",
  },
  {
    field: "country",
    label: "Country",
  },
  {
    field: "state",
    label: "State",
  },
  {
    field: "city",
    label: "City",
  },
].map((el) => ({
  ...el,
  place: `Store ${el.field}...`,
}));

export const commonSortersStore = [
  ...createdUpdateAtFields,
  {
    label: "Avg rating",
    field: "avgRatingSort",
    icon: FaRegStar,
  },
  {
    label: "Avg Price",
    field: "avgPriceSort",
    icon: TbPigMoney,
  },
  {
    label: "Avg Quantity",
    field: "avgQtySort",
    icon: FaDatabase,
  },
];
