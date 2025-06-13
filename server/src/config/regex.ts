export const REG_PATH_HOME = /^\/[/]*$/;

export const REG_NAME = /^[\p{L}\s\d_`']*$/u;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;

export const REG_ID =
  /^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$/;
export const REG_TOK = /^[a-f0-9]{304}$/;
export const REG_CLOUD = /^https:\/\/res.cloudinary.com\/.*$/;

export const REG_COUNTRY = /^[\p{L}\s`']*$/u;
export const REG_STATE = /^[\p{L}\s`']*$/u;
export const REG_CITY = /^[\p{L}\s`']*$/u;
export const REG_STREET = /^[\p{L}\p{N}\s`']*$/u;
export const REG_ZIP = /^[A-Za-z0-9\s-]+$/;
export const REG_PHONE =
  /^\+\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{3,4}[-\s]?\d{3,4}$/;

export const REG_STORE_NAME = /^[\p{L}\s\d`'@#$&_-]+$/u;
export const REG_STORE_DESC = /^[\p{L}\s\d`'@#$&?!.,:;()-]+$/u;

export const REG_PRICE = /^\d+(\.\d{1,2})?$/;
export const REG_INT = /^\d+$/;

export const REG_BOOK_TITLE = /^[\p{L}\s\d`'@#$!?&_-]+$/u;
