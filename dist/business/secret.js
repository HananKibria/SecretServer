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
Object.defineProperty(exports, "__esModule", { value: true });
var SecretData = require("../data/secret");
class SecretBusiness {
    constructor() {
        this.secretData = new SecretData();
    }
    AddSecret(params, header) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.secretData.AddSecret(params, header);
            return result;
        });
    }
    GetSecret(params, query, header) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            result = yield this.secretData.GetSecret(params, query, header);
            return result;
        });
    }
}
module.exports = SecretBusiness;
//# sourceMappingURL=secret.js.map