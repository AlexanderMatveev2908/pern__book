/* eslint-disable @typescript-eslint/no-explicit-any */
export const preventBrowser = async (
  e: React.FormEvent,
  cb: () => Promise<any>
) => {
  e.preventDefault();

  await cb();
};
