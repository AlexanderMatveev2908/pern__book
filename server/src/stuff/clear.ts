import { Token, User } from "../config/db.js";

export const clearDB = async () => {
  const start = performance.now();

  await Token.destroy({ where: {} });
  await User.destroy({ where: {} });

  const end = performance.now();

  console.log(`=> DONE ${end - start} ms`);
};

export const getDataDB = async () => {
  const users = await User.findAll();

  // await User.update(
  //   { firstName: "newName" },
  //   {
  //     where: {
  //       id: 1,
  //     },
  //   }
  // );
  console.log(users);
};
