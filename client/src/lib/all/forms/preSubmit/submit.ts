/* eslint-disable @typescript-eslint/no-explicit-any */
export const preventBrowser = (e: React.FormEvent, cb: () => any) => {
  e.preventDefault();
  cb();
};
