export const isDev: boolean = import.meta.env.VITE_MODE === "development";

export const backURL = isDev
  ? import.meta.env.VITE_BACK_URL_DEV
  : import.meta.env.VITE_BACK_URL;

export const backSocket = isDev ? import.meta.env.VITE_BACK_SOCKET : null;
