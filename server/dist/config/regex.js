export const REG_PATH_HOME = /^\/[/]*$/;
export const REG_NAME = /^[a-zA-ZÀ-ÿ`'-\s]+$/;
export const REG_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/;
export const REG_ID = /^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$/;
