// CYPHER BLOCK CHAINING XOR EACH BLOCK WITH PREV BLOCK BEFORE ENCRYPTION

import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto";
import { DevAlg } from "../../../types/types.js";

const AES_KEY_LENGTH = 32;
const HMAC_KEY_LENGTH = 32;
const IV_LENGTH = 17;

const make64 = (data: Buffer) => data.toString("base64");
const makeBuff = (data: string) => Buffer.from(data);

//  ADVANCED ENCRYPTION STANDARD KEY WILL BE USED TO ENCRYPT AND DECRYPT
// HASH BASED MESSAGE AUTH CODE WILL BE USED TO VERIFY IT HAS NOT BE BEEN TEMPERATED
export const genPairCbcHmac = () => ({
  aesKey: randomBytes(AES_KEY_LENGTH),
  hmacKey: randomBytes(HMAC_KEY_LENGTH),
});

// A BASIC HMAC LIKE IS TOKENS FILE WITH A PARAM AS INPUT AND ONE KEY AS SIGN
export const genHmac = (data: Buffer, key: Buffer) =>
  createHmac("sha256", key).update(data).digest();

// CYPHER BLOCK CHAINING SPLIT CYPHER TEXT IN BLOCK, THEN EACH BLOCK OF TEXT IS XOR WITH PREV ONE, SO IS A CHAINING OP
//  WE WILL NOT HAVE A PREV AT BEGINNING, AND HERE IV DOES HIS JOB WITH A RANDOM VALUE THAT MAKE A FLOW OF CHANGING ALWAYS RESULT THANKS TO HIS DOMINO EFFECT ON NEXT XOR BITWISE

export const encryptCbcHmac = (
  payload: object,
  aesKey: Buffer,
  hmacKey: Buffer
) => {
  const iV = randomBytes(IV_LENGTH);
  const cypher = createCipheriv(DevAlg.CBC_HMAC, aesKey, iV);

  const plainText = Buffer.from(JSON.stringify(payload));
  //
  const encrypted = Buffer.concat([cypher.update(plainText), cypher.final()]);
  const hmac = genHmac(Buffer.concat([iV, encrypted]), hmacKey);

  return {
    iV: make64(iV),
    encrypted: make64(encrypted),
    hmac: make64(hmac),
  };
};

export const decryptCbcHmac = (
  { iV, encrypted, hmac }: { iV: string; encrypted: string; hmac: string },
  aesKey: Buffer,
  hmacKey: Buffer
) => {
  const iVBuff = makeBuff(iV);
  const encryptedBuff = makeBuff(encrypted);
  const hmacBuff = makeBuff(hmac);

  const expectedMac = genHmac(Buffer.concat([iVBuff, encryptedBuff]), hmacKey);

  if (!timingSafeEqual(hmacBuff, expectedMac))
    throw new Error("HMAC verification failed. Data may have been tampered.");

  const decipher = createDecipheriv(DevAlg.CBC_HMAC, aesKey, iVBuff);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuff),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString());
};
