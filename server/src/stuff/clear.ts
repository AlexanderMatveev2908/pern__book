import { User } from "../models/models.js";

export const clearDB = async () => {
  const start = performance.now();

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
