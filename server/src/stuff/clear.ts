import { User } from "../models/models.js";

export const clearDB = async () => {
  const start = performance.now();

  await User.destroy({ where: {} });

  const end = performance.now();

  console.log(`=> DONE ${end - start} ms`);
};
