import { hashPwd } from "../lib/hashEncryptSign/argon.js";
import { calcTimeRun } from "../lib/utils/utils.js";
import { User, UserInstance } from "../models/models.js";

const commonFields = {
  isVerified: true,
  password: "Safe_pwd_@123",
};
const users = [
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
})) as UserInstance[];

export const populateDB = async () => {
  await calcTimeRun(async () => {
    const safeUsers = await Promise.all(
      users.map(async (u) => {
        u.password = await hashPwd(u.password);
        return u;
      })
    );
    await User.bulkCreate(safeUsers);
  });
};
