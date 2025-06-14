import { CatBookStore } from "../../types/all/bookStore.js";

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
