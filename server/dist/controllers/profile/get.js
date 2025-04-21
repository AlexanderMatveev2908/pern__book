var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../../models/models.js";
import { res200, res204 } from "../../lib/res.js";
import { Thumb } from "../../models/all/Thumb.js";
export const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userID)
        return res204(res);
    const user = yield User.findByPk(req.userID, {
        // attributes is like select in mongoose where u specify what u want or what to exclude with - like (-password, ...ecc)
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "tempEmail"],
        },
        // include is like populate in mongoose ODM( object data modelling instead of object relational mapping) that allow u to get the data referenced by id after `populate` that field with real data and not just leaving the id as string
        include: [
            {
                model: Thumb,
                attributes: { exclude: [] },
            },
        ],
        // raw is like lean or toObject in mongoose and it allow u to to get data as js obj and not as document mongoDB, in this case postGres model, it also make operation faster
        raw: true,
        // nest exist just in sql, in mongoDB objects are naturally nested by default and u do not need to specify it as characteristic
        nest: true,
    });
    // const user = userInstance?.get({ plain: true });
    // return err401(res, { msg: MsgErrSession.ACCESS_INVALID });
    return res200(res, { user });
});
