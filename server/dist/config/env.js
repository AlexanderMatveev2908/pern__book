export const isDev = process.env.NODE_ENV === "development";
export const frontURL = isDev
    ? process.env.FRONT_URL_DEV
    : process.env.FRONT_URL;
export const myMail = process.env.MY_EMAIL;
export const mySign = process.env.MY_SIGN;
