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
import { Key } from "../../../models/models.js";
import { KeyType } from "../../../types/all/keys.js";
import { compactDecrypt, CompactEncrypt } from "jose";
import { JWEInvalid, JWTExpired } from "jose/errors";
import { ErrAppMsgCode } from "../../../types/types.js";
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
    const publicKey = yield Key.create({
        key: pair.privateKey,
        alg: "rsa",
        type: KeyType.PRIV,
    });
    const privateKey = yield Key.create({
        key: pair.privateKey,
        alg: "rsa",
        type: KeyType.PRIV,
    });
    return { publicKey, privateKey };
});
// THE ALG THAT ENCRYPT PAYLOAD IS GALOIS COUNTER MODE THAT RESPECT THE PRINCIPLE OF AVALANCHE THANKS TO A COUNTER THAT MAKE SAME PLAINTEXT PRODUCE DIFFERENT CYPHERTEXT
// UNDER THE HOOD EACH CHAR OF TEXT IS XOR (exclusive or) WITH THE KEYSTREAM OF BITS PRODUCED BY COUNTER
// WE WILL HAVE THE SYMMETRIC KEY ENCRYPTED WITH THE ASYMMETRIC PUBLIC KEY
// THE PAYLOAD WILL BE ENCRYPTED WITH THE SYMMETRIC KEY (GCM)
// ONLY THE PRIVATE KEY IS ABLE TO DECRYPT THE SYMMETRIC KEY , THEN WE CAN DECRYPT THE PAYLOAD
export const getPublicRSA = () => __awaiter(void 0, void 0, void 0, function* () { return yield Key.findOne({ where: { type: KeyType.PUB } }); });
export const getPrivateRSA = () => __awaiter(void 0, void 0, void 0, function* () { return yield Key.findOne({ where: { type: KeyType.PRIV } }); });
export const genTokenJWE = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = (yield getPublicRSA());
    return yield new CompactEncrypt(Buffer.from(JSON.stringify(payload)))
        .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
        .encrypt(publicKey);
});
export const checkJWE = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = (yield getPrivateRSA());
    try {
        const { plaintext } = yield compactDecrypt(token, privateKey);
        const payload = JSON.parse(plaintext.toString());
        return payload;
    }
    catch (err) {
        if (err instanceof JWEInvalid)
            return ErrAppMsgCode.REFRESH_INVALID;
        else if (err instanceof JWTExpired)
            return ErrAppMsgCode.REFRESH_EXPIRED;
        return err;
    }
});
