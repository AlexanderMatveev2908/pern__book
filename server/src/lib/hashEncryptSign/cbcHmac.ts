import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
} from "crypto";
import { MsgCheckToken, TokAlg, TokenEventType } from "../../types/types.js";
import { KeyCbcHmac } from "../../models/all/KeyCbcHmac.js";
import { KeyTypeCbcHmac } from "../../types/all/keys.js";
import { Op } from "sequelize";
import { genExpiryCBC } from "./expiryTime.js";
import { keyCert, myCert, myIv } from "../../config/env.js";
import { v4 } from "uuid";
import { UserInstance } from "../../models/all/User.js";
import { Token } from "../../models/all/Token.js";

const AES_KEY_LENGTH = 32;
const HMAC_KEY_LENGTH = 32;
const IV_LENGTH = 16;

export interface AppPayloadCBC {
  id: string;
}

// jjj

const makeHEX = (data: Buffer) => data.toString("hex");
const makeBuff = (data: string) => Buffer.from(data, "hex");

//  ADVANCED ENCRYPTION STANDARD KEY WILL BE USED TO ENCRYPT AND DECRYPT
// HASH BASED MESSAGE AUTH CODE WILL BE USED TO VERIFY IT HAS NOT BE BEEN TEMPERATED
const genPairCbcHmac = async () => {
  const aesKey = randomBytes(AES_KEY_LENGTH);
  const hmacKey = randomBytes(HMAC_KEY_LENGTH);

  await KeyCbcHmac.create({
    key: makeHEX(hmacKey),
    type: KeyTypeCbcHmac.HMAC,
  });
  await KeyCbcHmac.create({
    key: makeHEX(aesKey),
    type: KeyTypeCbcHmac.CBC,
  });
};

const getKeyCBC = async () => {
  const keyHEX = await KeyCbcHmac.findOne({
    where: { type: KeyTypeCbcHmac.CBC },
  });
  return makeBuff(keyHEX?.key ?? "");
};
const getKeyHMAC = async () => {
  const keyHEX = await KeyCbcHmac.findOne({
    where: { type: KeyTypeCbcHmac.HMAC },
  });
  return makeBuff(keyHEX?.key ?? "");
};
const getPairKeys = async () => {
  const keyCBC = await getKeyCBC();
  const keyHMAC = await getKeyHMAC();

  return { keyCBC, keyHMAC };
};

// A BASIC HMAC LIKE IS TOKENS FILE WITH A PARAM AS INPUT AND ONE KEY AS SIGN
export const genHmac = (data: Buffer, keyHmac: Buffer) =>
  createHmac("sha256", keyHmac).update(data).digest().toString("hex");

// CYPHER BLOCK CHAINING SPLIT CYPHER TEXT IN BLOCK, THEN EACH BLOCK OF TEXT IS XOR WITH PREV ONE, SO IS A CHAINING OP
//  WE WILL NOT HAVE A PREV AT BEGINNING, AND HERE IV DOES HIS JOB WITH A RANDOM VALUE THAT MAKE A FLOW OF CHANGING ALWAYS RESULT THANKS TO HIS DOMINO EFFECT ON NEXT XOR BITWISE

export const genTokenCBC = async ({
  user,
  event,
}: {
  user: UserInstance;
  event: TokenEventType;
}): Promise<{ verifyToken: string } | void> => {
  const count = await KeyCbcHmac.count({
    where: {
      type: {
        [Op.in]: [KeyTypeCbcHmac.CBC, KeyTypeCbcHmac.HMAC],
      },
    },
  });
  if (!count) await genPairCbcHmac();

  const { keyCBC, keyHMAC } = await getPairKeys();
  const payload = Buffer.from(JSON.stringify(user.makePayload()));

  const MAX_ATTEMPTS = 10;
  let attempts = 0;

  do {
    try {
      const iv = randomBytes(IV_LENGTH);
      const cypher = createCipheriv(TokAlg.CBC_HMAC, keyCBC, iv);

      // FIRST PAYLOAD IS ENCRYPTED WITH CBC TO HAVE AN UNPREDICTABLE RESULT THEN ER CREATE ALSO A VERSION ENCRYPTED WITH HMAC TO VERIFY IS AUTHENTICITY BUT BESIDE ORIGINAL VERSION CAUSE SHA IS IRREVERSIBLE AND WE COULD NOT GET NEVER AGAIN BACK THE DATA
      const encrypted = Buffer.concat([cypher.update(payload), cypher.final()]);

      const hmacHEX = genHmac(Buffer.concat([iv, encrypted]), keyHMAC);
      await Token.create({
        userID: user.id,
        hashed: hmacHEX,
        expiry: genExpiryCBC(),
        event,
      });

      return {
        verifyToken: makeHEX(
          Buffer.from(
            JSON.stringify({
              iv: makeHEX(iv),
              encrypted: makeHEX(encrypted),
            })
          )
        ),
      };
    } catch (err: any) {
      if (err.name === "SequelizeUniqueConstraintError") {
        attempts++;

        if (attempts === MAX_ATTEMPTS)
          throw new Error("Unable to create token");
      } else {
        throw err;
      }
    }
  } while (attempts < MAX_ATTEMPTS);
};
// return {
//   token: Buffer.concat([iv, encrypted]).toString("hex"),
// };

// THIS VERSION FOR DB AUTOMATICALLY CHECK EQ OF TOKENS SEARCHING ORIGINAL IN DB AND TIME DEPEND ONLY ON CONNECTION, BUT DOES NOT HAVE ANY IN COMMON WITH THROWING ERROR NOT EQ, THEN I THINK IS FINE ADD EVENT TO HAVE A KIND OF CONTEXT, EVEN DOES NOT CHANGE ANYTHING CAUSE KEYS WILL BE UNIQUE SO CAN NOT
export const checkCbcHmac = async ({
  token,
  event,
  user,
  del = true,
}: {
  token: string;
  event: TokenEventType;
  user?: UserInstance;
  del?: boolean;
}): Promise<string> => {
  // const buff = Buffer.from(token, "hex");
  // const iv = buff.subarray(0, IV_LENGTH);
  // const encrypted = buff.subarray(IV_LENGTH, buff.length);

  const obj = JSON.parse(makeBuff(token).toString());
  const iv = makeBuff(obj.iv);
  const encrypted = makeBuff(obj.encrypted);

  const { keyHMAC } = await getPairKeys();

  if (!keyHMAC.length) return MsgCheckToken.NOT_EMITTED;

  const expectedHmacHEX = genHmac(Buffer.concat([iv, encrypted]), keyHMAC);
  const existentHmacHEX = await Token.findOne({
    where: { hashed: expectedHmacHEX, event },
  });

  if (!existentHmacHEX) {
    if (user)
      await Token.destroy({
        where: { userID: user.id, event },
      });

    return MsgCheckToken.INVALID;
  }
  if (existentHmacHEX.expiry < Date.now()) {
    await existentHmacHEX.destroy();

    return MsgCheckToken.EXPIRED;
  }

  if (del) await existentHmacHEX.destroy();

  return MsgCheckToken.OK;

  // const decipher = createDecipheriv(TokAlg.CBC_HMAC, keyCBC, iv);
  // const decrypted = Buffer.concat([
  //   decipher.update(encrypted),
  //   decipher.final(),
  // ]);

  // return JSON.parse(decrypted.toString());
};

export const calcLenToken = () => {
  const aesKey = randomBytes(AES_KEY_LENGTH);
  const iv = randomBytes(IV_LENGTH);

  const payload = Buffer.from(
    JSON.stringify({
      id: v4(),
    })
  );

  const cypher = createCipheriv(TokAlg.CBC_HMAC, aesKey, iv);
  const encrypted = Buffer.concat([cypher.update(payload), cypher.final()]);

  const tokenToSend = makeHEX(
    Buffer.from(
      JSON.stringify({
        iv: makeHEX(iv),
        encrypted: makeHEX(encrypted),
      })
    )
  );
};

export const encryptCert = () => {
  // const aesKey = randomBytes(AES_KEY_LENGTH);
  // const iv = randomBytes(IV_LENGTH);
  // const p = path.join(
  //   path.dirname(fileURLToPath(import.meta.url)),
  //   "../../../certs/ca.pem"
  // );
  // const cert = fs.readFileSync(p);
  // const cypher = createCipheriv(TokAlg.CBC_HMAC, aesKey, iv);
  // const encrypted = Buffer.concat([cypher.update(cert), cypher.final()]);
  // const data = makeHEX(encrypted);
};

export const decryptCert = () => {
  const iv = makeBuff(myIv!);
  const keyCBC = makeBuff(keyCert!);
  const cert = makeBuff(myCert!);
  const decipher = createDecipheriv(TokAlg.CBC_HMAC, keyCBC, iv);
  const decrypted = Buffer.concat([decipher.update(cert), decipher.final()]);

  return decrypted.toString("utf-8");
};

// export const flow_0 = async () => {
//   const me = await User.findOne({
//     where: { id: "a465030a-7f51-4eda-b519-5c5151214f1f" },
//   });

//   const token = await genTokenCBC({
//     user: me!,
//     event: TokenEventType.CHANGE_PWD,
//   });

// };

// export const flow_1 = async () => {
//   const me = await User.findOne({
//     where: { id: "a465030a-7f51-4eda-b519-5c5151214f1f" },
//   });

//   const res = await decryptCbcHmac({
//     event: TokenEventType.CHANGE_PWD,
//     user: me as UserInstance,
//     verifyToken:
//       "783dc2eb25160ac7505cdb34234922c0c8336d7110093f45a7a136af9207835ea2888041fb79e86e0fed4873a2d9143c19c19d746efadd7070e560cbf66fbd93a4d08b7c7e4d339e454128dd9a9d1114d2cbf550f2be34775a6833eb98f98764d43d9ed7b9a3311c18f9982923cd66a1",
//   });

// };
// 6ecc7c8e682d6d409a0617a457130a21c994bb7b6647bc8e9550aa3d728de1508bac08701d05dcb0531728fd81ae4b4243fda1442809ab2cf7ba97bbe732207a245caa5aa68eb82b4826bb404c0ea412d2383a2a77f7387b74fc92a53152e7037aeeb2c152eb9b5ed25cd0bf0acc8198

/*
export const decryptCbcHmac = async ({
  iv,
  encrypted,
  hmac,
}: {
  iv: string;
  encrypted: string;
  hmac: string;
}) => {
  const iVBuff = makeBuff(iv);
  const encryptedBuff = makeBuff(encrypted);
  const hmacBuff = makeBuff(hmac);

  const keyCBC = await getKeyCBC();
  const keyHMAC = await getKeyHMAC();

  const expectedMac = genHmac(Buffer.concat([iVBuff, encryptedBuff]), keyHMAC);

  //  BESIDE BRUTE FORCE ATTACK THERE COULD BE ANALYSIS OF HOW MUCH TAKE AND WHEN AN ALGORITHM THROW AN ERROR AND CALCULATE POSITION CHAR BY CHAR KNOWING WHEN SYSTEM BROKE, WITH TIMING EQUAL IT DOES NOT MATTER SUCCESS OR NOT IT WILL TAKE SAME TIME TO NOT GIVE ANY INFORMATION OF HOW THINGS WENT IN OUR COSE, IS LIKE MAKING A LOOP DO WHILE WHERE EVEN U ALREADY GET TO YOUR GOAL , STILL KEEP GOING UNTIL THE END WITHOUT ANY EARLY RETURN OR BREAK
  if (
    !timingSafeEqual(hmacBuff, expectedMac) ||
    hmacBuff.length !== expectedMac.length
  )
    throw new Error("INVALID TOKEN");

  const decipher = createDecipheriv(TokAlg.CBC_HMAC, keyHMAC, iVBuff);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuff),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString());
};
*/
