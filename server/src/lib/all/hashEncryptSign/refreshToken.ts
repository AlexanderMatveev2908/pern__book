import { generateKeyPairSync } from "crypto";
import { Key, UserInstance } from "../../../models/models.js";
import { KeyType } from "../../../types/all/keys.js";
import { compactDecrypt, CompactEncrypt, importPKCS8, importSPKI } from "jose";
import { JWEInvalid, JWTExpired } from "jose/errors";
import { ErrAppMsgCode, KeyAlg } from "../../../types/types.js";
import { Response } from "express";
import { isDev } from "../../../config/env.js";

// IMPORTANT ⚠️
// IF U PREFER USE COMMON-JS JOSE IS THOUGH FOR MODULES AND U'LL HAVE WARNINGS OR COULD EVEN CRASH IF BECOME UNSUPPORTED(I USED COMMON JS IN LAST PROJECT) SO U WOULD NEED TO MAKE DYNAMIC ASYNC IMPORTS INSTEAD OF SIMPLE IMPORT

export interface PayloadJWE {
  id: string;
  verified: boolean;
  role: string;
}

export const genPairRSA = async () => {
  const pair = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  const publicKey = await Key.create({
    key: pair.publicKey,
    alg: KeyAlg.RSA,
    type: KeyType.PUB,
  });
  const privateKey = await Key.create({
    key: pair.privateKey,
    alg: KeyAlg.RSA,
    type: KeyType.PRIV,
  });

  return { publicKey, privateKey };
};

// RSA ITSELF IS DETERMINISTIC
//  HIS LOGIC IS BASED ON MODULUS THAT IS PRODUCT OF 2 PRIME NUMBERS, WHERE THERE IS PUBLIC AND PRIVATE ESPONENT

// THE ALG THAT ENCRYPT PAYLOAD IS GALOIS COUNTER MODE THAT RESPECT THE PRINCIPLE OF AVALANCHE THANKS TO A COUNTER THAT MAKE SAME PLAINTEXT PRODUCE DIFFERENT CYPHERTEXT
// UNDER THE HOOD EACH CHAR OF TEXT IS XOR (exclusive or) WITH THE KEYSTREAM OF BITS PRODUCED BY COUNTER

// THE ALG THAT ENCRYPT THE SYMMETRIC KEY USE OPTIMAL ASYMMETRIC PADDING ENCRYPTION PADDING, THIS GIVE US AN OUTPUT LESS PREDICTABLE AND RESPECT THE PRINCIPLE OF AVALANCHE
// UNDER THE HOODS IT USE MGF1( MASK GENERATION FUNCTION1 ), IT TAKE AS INPUT PLAINTEXT OF MESSAGE, MASK IS PRODUCED HASHING REPEDEATELY INPUT WITH SHA256, AT THE END MASK IS XOR WITH PLAINTEXT TO ADD PADDING AND IMPREDICTABILITY, THEN WILL BE ENCRYPTED WITH GCM

// WE WILL HAVE THE SYMMETRIC KEY ENCRYPTED WITH THE ASYMMETRIC PUBLIC KEY
// THE PAYLOAD WILL BE ENCRYPTED WITH THE SYMMETRIC KEY (GCM)
// ONLY THE PRIVATE KEY IS ABLE TO DECRYPT THE SYMMETRIC KEY , THEN WE CAN DECRYPT THE PAYLOAD

export const getPublicRSA = async () => {
  const publicKey = await Key.findOne({ where: { type: KeyType.PUB } });
  return await importSPKI(publicKey!.key, KeyAlg.RSA);
};

export const getPrivateRSA = async () => {
  const privateKey = await Key.findOne({ where: { type: KeyType.PRIV } });
  return await importPKCS8(privateKey!.key, KeyAlg.RSA);
};

export const genTokenJWE = async (user: UserInstance) => {
  const count = await Key.count({ where: {} });
  if (!count) await genPairRSA();

  const payload: PayloadJWE = {
    id: user.id,
    verified: user.isVerified,
    role: user.role,
  };

  const publicKey = await getPublicRSA();

  return await new CompactEncrypt(Buffer.from(JSON.stringify(payload)))
    .setProtectedHeader({ alg: KeyAlg.RSA, enc: KeyAlg.GCM })
    .encrypt(publicKey);
};

export const checkJWE = async (token: string): Promise<PayloadJWE | string> => {
  const privateKey = await getPrivateRSA();

  try {
    const { plaintext } = await compactDecrypt(token, privateKey);
    return JSON.parse(plaintext.toString());
  } catch (err: any) {
    // is ok even with if in my opinion when the question is about returning something cause code automatically does not go on next lines
    if (err instanceof JWEInvalid) return ErrAppMsgCode.REFRESH_INVALID;
    if (err instanceof JWTExpired) return ErrAppMsgCode.REFRESH_EXPIRED;

    throw err;
  }
};

export const setCookie = (res: Response, refreshToken: string) =>
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDev,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 5),
  });
