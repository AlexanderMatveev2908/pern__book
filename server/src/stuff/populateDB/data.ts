import { BookStoreInstance } from "../../models/all/BookStore.js";
import { UserInstance } from "../../models/all/User.js";
import { subcategories } from "../../types/all/books.js";
import { CatBookStore } from "../../types/all/bookStore.js";
import { doLorem, makeRandomMinMax, pickRandom } from "./placeHolders.js";

export const commonFields = {
  isVerified: true,
  password: "8cLS4XY!{2Wdvl4*l^4",
};
export const users = [
  {
    firstName: "Tyler",
    lastName: "Durden",
    email: "tyler@gmail.com",

    country: "US",
    state: "CA",
    city: "Los Angeles",
    street: "456 Sunset Blvd",
    zipCode: "90028",
    phone: "+0 123-456-7890",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",

    country: "US",
    state: "NY",
    city: "New York",
    street: "789 Broadway Ave",
    zipCode: "10003",
    phone: "+1 234-567-8901",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",

    country: "US",
    state: "IL",
    city: "Chicago",
    street: "321 Lakeshore Dr",
    zipCode: "60601",
    phone: "+2 345-678-9012",
  },
].map((el) => ({
  ...el,
  ...commonFields,
}));

export const catStores = Object.values(CatBookStore);

export const getValidCat = (mainCat: CatBookStore[]) => {
  const allowed = Object.entries(subcategories)
    .filter(([k, v]) => mainCat.some((el) => el === k))
    .flatMap(([_, v]) => v);

  const random = Array.from({ length: 3 }, () => pickRandom(allowed));

  return random;
};

export const fillDefVals = ({
  min,
  max,
  u,
  store,
}: {
  min: number;
  max: number;
  u: UserInstance;
  store: BookStoreInstance;
}) => ({
  bookStoreID: store!.id,
  description: doLorem(20),
  year: makeRandomMinMax(min, max).toFixed(0),
  price: makeRandomMinMax(1, 50).toFixed(2),
  qty: makeRandomMinMax(1, 50).toFixed(0),
  createdBy: u.email,
  lastUpdatedBy: u.email,
  categories: getValidCat(store!.categories),
});
