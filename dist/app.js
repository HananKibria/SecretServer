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
var env = require("dotenv").config();
const mongoose = require('mongoose');
const debug = require('debug')('app:secretServer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
var cfg = require("../config.json")[process.env.NODE_ENV];
const path = require('path');
function createMongoConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        // const conStr = `mongodb://${username}:${password}@${clusterendpoint}:${mongoDbPort}/${mongoDbName}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
        // console.log('conStr: ', conStr);
        // await mongoose.connect(conStr);
        const atlasDb = `mongodb+srv://mongodb:mongodb@cluster0.zog6m.mongodb.net/secret?retryWrites=true&w=majority`;
        yield mongoose.connect(atlasDb, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Mongo Connected...');
        return;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use(
    //cors()
    cors({
        origin: cfg.frontend_BaseURL,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    }));
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    try {
        yield createMongoConnection();
        app.use(bodyParser.json({ limit: '1500mb', extended: true }));
        app.use(bodyParser.urlencoded({ limit: '1500mb', extended: true }));
        const port = process.env.PORT || 5000;
        let secretAPI = require("./routes/api/secret");
        app.use("", secretAPI);
        const server = app.listen(port, (req) => {
            debug('Listening on port: ' + port);
        });
        module.exports = server;
    }
    catch (ex) {
        console.log('ex: ', ex);
    }
}))();
//# sourceMappingURL=app.js.map