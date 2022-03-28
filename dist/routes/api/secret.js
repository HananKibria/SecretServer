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
let express = require('express');
let router = express.Router();
const SecretBusiness = require('../../business/secret');
router.post('/secret', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let secretBusiness = new SecretBusiness();
    let result = yield secretBusiness.AddSecret(req.body, req.header);
    result = {
        success: true,
        result: result,
        message: 'Secret Added',
    };
    res.status(200).send(result);
}));
router.get('/secret/:hash', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let secretBusiness = new SecretBusiness();
    let result = yield secretBusiness.GetSecret(req.params, req.query, req.header);
    let currentDate = new Date();
    if (result == null) {
        result = {
            success: false,
            message: "Wrong Hash"
        };
    }
    else if (result.expiresAt == null || currentDate <= result.expiresAt) {
        result = {
            success: true,
            result: result,
            message: 'Secret Found',
        };
    }
    else {
        result = {
            success: false,
            message: "secret expired"
        };
    }
    res.status(200).send(result);
}));
module.exports = router;
//# sourceMappingURL=secret.js.map