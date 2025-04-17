// CYPHER BLOCK CHAINING XOR EACH BLOCK WITH PREV BLOCK BEFORE ENCRYPTION

import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto";
import { TokAlg, UserRole } from "../../../types/types.js";
import { UserInstance } from "../../../models/models.js";

const AES_KEY_LENGTH = 32;
const HMAC_KEY_LENGTH = 32;
const IV_LENGTH = 16;

export interface PayloadCBC {
  id: string;
  verified: boolean;
  role: UserRole;
}

const makeHEX = (data: Buffer) => data.toString("hex");
const makeBuff = (data: string) => Buffer.from(data, "hex");

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

export const encryptCbcHmac = ({
  user,
  aesKey,
  hmacKey,
}: {
  user: Partial<UserInstance>;
  aesKey: Buffer;
  hmacKey: Buffer;
}) => {
  const iv = randomBytes(IV_LENGTH);
  const cypher = createCipheriv(TokAlg.CBC_HMAC, aesKey, iv);
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      verified: user.isVerified,
      role: user.role,
    })
  );

  // FIRST PAYLOAD IS ENCRYPTED WITH CBC TO HAVE AN UNPREDICTABLE RESULT THEN ER CREATE ALSO A VERSION ENCRYPTED WITH HMAC TO VERIFY IS AUTHENTICITY BUT BESIDE ORIGINAL VERSION CAUSE SHA IS IRREVERSIBLE AND WE COULD NOT GET NEVER AGAIN BACK THE DATA
  const encrypted = Buffer.concat([cypher.update(payload), cypher.final()]);
  const hmac = genHmac(Buffer.concat([iv, encrypted]), hmacKey);

  return {
    iv: makeHEX(iv),
    encrypted: makeHEX(encrypted),
    hmac: makeHEX(hmac),
  };
};

export const decryptCbcHmac = ({
  iv,
  encrypted,
  hmac,
  aesKey,
  hmacKey,
}: {
  iv: string;
  encrypted: string;
  hmac: string;
  aesKey: Buffer;
  hmacKey: Buffer;
}) => {
  const iVBuff = makeBuff(iv);
  const encryptedBuff = makeBuff(encrypted);
  const hmacBuff = makeBuff(hmac);

  const expectedMac = genHmac(
    Buffer.concat([iVBuff, encryptedBuff]),
    Buffer.from(hmacKey)
  );

  //  BESIDE BRUTE FORCE ATTACK THERE COULD BE ANALYSIS OF HOW MUCH TAKE AND WHEN AN ALGORITHM THROW AN ERROR AND CALCULATE POSITION CHAR BY CHAR KNOWING WHEN SYSTEM BROKE, WITH TIMING EQUAL IT DOES NOT MATTER SUCCESS OR NOT IT WILL TAKE SAME TIME TO NOT GIVE ANY INFORMATION OF HOW THINGS WENT IN OUR COSE, IS LIKE MAKING A LOOP DO WHILE WHERE EVEN U ALREADY GET TO YOUR GOAL , STILL KEEP GOING UNTIL THE END WITHOUT ANY EARLY RETURN OR BREAK
  if (
    !timingSafeEqual(hmacBuff, expectedMac) ||
    hmacBuff.length !== expectedMac.length
  )
    throw new Error("INVALID TOKEN");

  const decipher = createDecipheriv(TokAlg.CBC_HMAC, aesKey, iVBuff);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuff),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString());
};

const flow = () => {
  const keys = genPairCbcHmac();

  const payload = {
    id: "134",
    verified: true,
    role: UserRole.OWNER,
  };

  const { iv, hmac, encrypted } = encryptCbcHmac({
    user: payload,
    aesKey: keys.aesKey,
    hmacKey: keys.hmacKey,
  });

  console.log(hmac, iv, encrypted);

  const decrypted = decryptCbcHmac({
    iv,
    hmac,
    encrypted,
    aesKey: keys.aesKey,
    hmacKey: keys.hmacKey,
  });

  console.log(decrypted);
};

flow();
