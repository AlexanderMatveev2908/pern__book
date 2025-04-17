var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generateKeyPairSync } from "crypto";
import { KeyRSA, Token } from "../../../models/models.js";
import { compactDecrypt, CompactEncrypt, importPKCS8, importSPKI } from "jose";
import { JWEInvalid, JWTExpired } from "jose/errors";
import { MsgErrSession, KeyAlgRSA, TokAlg, TokenEventType, } from "../../../types/types.js";
import { isDev } from "../../../config/env.js";
import { Op } from "sequelize";
import { KeyTypeRSA } from "../../../types/all/keys.js";
import { genExpiryCookie, genExpiryJWE } from "./expiryTime.js";
export const genPairRSA = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const publicKey = yield KeyRSA.create({
        key: pair.publicKey,
        type: KeyTypeRSA.RSA_PUBLIC,
    });
    const privateKey = yield KeyRSA.create({
        key: pair.privateKey,
        type: KeyTypeRSA.RSA_PRIVATE,
    });
    return { publicKey, privateKey };
});
// RSA ITSELF IS DETERMINISTIC
//  HIS LOGIC IS BASED ON MODULUS THAT IS PRODUCT OF 2 PRIME NUMBERS, WHERE THERE IS PUBLIC AND PRIVATE ESPONENT
// THE ALG THAT ENCRYPT PAYLOAD IS GALOIS COUNTER MODE THAT RESPECT THE PRINCIPLE OF AVALANCHE THANKS TO A COUNTER THAT MAKE SAME PLAINTEXT PRODUCE DIFFERENT CYPHERTEXT
// UNDER THE HOOD EACH CHAR OF TEXT IS XOR (exclusive or) WITH THE KEYSTREAM OF BITS PRODUCED BY COUNTER
// THE ALG THAT ENCRYPT THE SYMMETRIC KEY USE OPTIMAL ASYMMETRIC PADDING ENCRYPTION PADDING, THIS GIVE US AN OUTPUT LESS PREDICTABLE AND RESPECT THE PRINCIPLE OF AVALANCHE
// UNDER THE HOODS IT USE MGF1( MASK GENERATION FUNCTION1 ), IT TAKE AS INPUT PLAINTEXT OF MESSAGE, MASK IS PRODUCED HASHING REPEDEATELY INPUT WITH SHA256, AT THE END MASK IS XOR WITH PLAINTEXT TO ADD PADDING AND IMPREDICTABILITY, THEN WILL BE ENCRYPTED WITH GCM
// WE WILL HAVE THE SYMMETRIC KEY ENCRYPTED WITH THE ASYMMETRIC PUBLIC KEY
// THE PAYLOAD WILL BE ENCRYPTED WITH THE SYMMETRIC KEY (GCM)
// ONLY THE PRIVATE KEY IS ABLE TO DECRYPT THE SYMMETRIC KEY , THEN WE CAN DECRYPT THE PAYLOAD
export const getPublicRSA = () => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = yield KeyRSA.findOne({
        where: { type: KeyTypeRSA.RSA_PUBLIC },
    });
    return yield importSPKI(publicKey.key, KeyAlgRSA.RSA);
});
export const getPrivateRSA = () => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = yield KeyRSA.findOne({
        where: { type: KeyTypeRSA.RSA_PRIVATE },
    });
    return yield importPKCS8(privateKey.key, KeyAlgRSA.RSA);
});
export const genTokenJWE = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield KeyRSA.count({
        where: {
            type: {
                [Op.or]: [KeyTypeRSA.RSA_PRIVATE, KeyTypeRSA.RSA_PUBLIC],
            },
        },
    });
    if (!count)
        yield genPairRSA();
    const publicKey = yield getPublicRSA();
    const payload = user.makePayload();
    const encrypted = yield new CompactEncrypt(Buffer.from(JSON.stringify(payload)))
        .setProtectedHeader({ alg: KeyAlgRSA.RSA, enc: TokAlg.GCM })
        .encrypt(publicKey);
    const newToken = yield Token.create({
        hashed: encrypted,
        expiry: genExpiryJWE(),
        event: TokenEventType.REFRESH,
        userID: user.id,
    });
    return newToken.hashed;
});
export const checkJWE = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = yield getPrivateRSA();
    try {
        const { plaintext } = yield compactDecrypt(token, privateKey);
        return JSON.parse(plaintext.toString());
    }
    catch (err) {
        // is ok even with if in my opinion when the question is about returning something cause code automatically does not go on next lines
        if (err instanceof JWEInvalid)
            return MsgErrSession.REFRESH_INVALID;
        if (err instanceof JWTExpired)
            return MsgErrSession.REFRESH_EXPIRED;
        throw err;
    }
});
export const setCookie = (res, refreshToken) => res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDev,
    sameSite: "strict",
    expires: genExpiryCookie(),
});
