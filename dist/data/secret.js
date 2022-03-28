"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const random_hash_1 = __importDefault(require("random-hash"));
const Secret = require('../models/secret');
class SecretData {
    constructor() { }
    AddSecret(params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            var expireDate = new Date();
            var currentDate = new Date();
            let randomHash = (0, random_hash_1.default)({ length: 5 });
            if (params['expireAfter'] == 0) {
                var secret = new Secret({
                    hash: randomHash,
                    secretText: params['secret'],
                    expireAt: null,
                    createdAt: currentDate
                });
            }
            else {
                console.log(params["expireAfter"]);
                expireDate.setSeconds(expireDate.getSeconds() + params['expireAfter']);
                var secret = new Secret({
                    hash: randomHash,
                    secretText: params['secret'],
                    expireAt: expireDate,
                    createdAt: currentDate
                });
            }
            try {
                secret.save();
                let result = {
                    hash: secret.hash,
                    secretText: secret.secretText,
                    createdAt: secret.createdAt,
                    expiresAt: secret.expireAt
                };
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    GetSecret(params, query, header) {
        return __awaiter(this, void 0, void 0, function* () {
            let randomHash = params.hash;
            let secret = yield Secret.find({ hash: randomHash }).lean();
            if (secret.length == 0) {
                return null;
            }
            let result = {
                hash: secret[0].hash,
                secretText: secret[0].secretText,
                createdAt: secret[0].createdAt,
                expiresAt: secret[0].expireAt
            };
            return result;
        });
    }
}
module.exports = SecretData;
//# sourceMappingURL=secret.js.map