export const isValidNumber = (txt) => !!txt?.trim()?.length && !!+(txt ?? "0");

console.log(isValidNumber());
