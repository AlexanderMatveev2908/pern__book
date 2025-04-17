const calcFromNow = (...args) => Date.now() +
    1000 * 60 * args.reduce((acc, curr) => acc * curr, 1);
// MAKE THEM SYNC TO NOT HAVE ERR BETWEEN SERVER AND CLIENT
export const genExpiryJWE = () => calcFromNow(5);
export const genExpiryCookie = () => new Date(genExpiryJWE());
export const expiryAccess = "5m";
export const genExpiryCBC = () => calcFromNow(2);
