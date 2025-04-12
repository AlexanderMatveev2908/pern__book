export const REG_PATH_HOME = /^\/[/]*$/;

export const REG_NAME = /^[A-Z][a-zA-ZÀ-ÿ`'-_\d\s]+$/;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;
