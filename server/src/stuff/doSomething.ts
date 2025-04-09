import { Model } from "sequelize";
import User, { UserType } from "../models/User.js";
import Product from "../models/Product.js";

export const doUser = async () => {
  // const user = (await User.create({
  //   name: "John",
  //   email: "john@gmail.com",
  //   password: "1234",
  //   role: "admin",
  // })) as UserType;

  // await Product.create({
  //   name: "item__2",
  //   price: 88.99,
  //   quantity: 66,
  //   category: "cat__1",
  //   description: "...content",
  //   image: "image_url",
  //   userId: 1,
  // });

  // await Product.destroy({ where: {} });

  await Product.count({ where: {} });

  const newUser = (await User.findOne({
    where: { id: 1 },
    include: Product,
  })) as UserType;
  console.log(newUser);
  // const productsUser = await Product.findAll({
  //   where: {
  //     userId: user.id,
  //   },
  // });

  // console.log(productsUser);
};
