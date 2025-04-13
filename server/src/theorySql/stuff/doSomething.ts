import { Model } from "sequelize";
import User, { UserType } from "../models/User.js";
import Product from "../models/Product.js";

export const doUser = async () => {
  await Product.count({ where: {} });

  const users = await User.findAll({
    include: [
      {
        model: Product,
        as: "Products",
      },
    ],
  });
  console.log(users[0]?.Products);

  // const newP = await Product.create({
  //   name: "Product 1",
  //   price: 100,
  //   userId: 1,
  // });

  // const newUser = await User.create({
  //   name: "John",
  //   email: "john@example.com",
  //   password: "XXXXXXXX",
  //   role: "admin",
  // });
};
