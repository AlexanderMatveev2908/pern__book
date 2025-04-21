export const REG_PATH_HOME = /^\/[/]*$/;

export const REG_NAME = /^[a-zA-ZÀ-ÿ`'-\s]+$/;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;

export const REG_ID =
  /^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$/;
export const REG_TOK = /^[a-f0-9]{304}$/;

export const REG_COUNTRY = /^[A-Za-zÀ-ÿ\s`']*$/;
export const REG_STATE = /^[A-Za-zÀ-ÿ\s`']*$/;
export const REG_CITY = /^[A-Za-zÀ-ÿ\s`']*$/;
export const REG_STREET = /^[A-Za-zÀ-ÿ0-9\s`']*$/;
export const REG_ZIP = /^\d{5}(-\d{4})?$/;
export const REG_PHONE =
  /^\+\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{3,4}[-\s]?\d{3,4}$/;

export const iphoteticMaxLen = "+123-(1234)-1234-1234";
export const iphoteticMinLen = "+11123123";
