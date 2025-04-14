export const calcTimeRun = async (cb: () => Promise<any>) => {
  const start = performance.now();

  const res = await cb();

  const end = performance.now();

  console.log(`=> DONE ${end - start} md`);

  return res;
};
