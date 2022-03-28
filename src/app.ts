export {};
var env = require("dotenv").config();
const mongoose = require('mongoose');
const debug = require('debug')('app:secretServer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
var cfg = require("../config.json")[process.env.NODE_ENV];
const path = require('path');
async function createMongoConnection() {
    // const conStr = `mongodb://${username}:${password}@${clusterendpoint}:${mongoDbPort}/${mongoDbName}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
    // console.log('conStr: ', conStr);
    // await mongoose.connect(conStr);
    const atlasDb =`mongodb+srv://mongodb:mongodb@cluster0.zog6m.mongodb.net/secret?retryWrites=true&w=majority`
    await mongoose.connect(atlasDb, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo Connected...');
    return;
  }

  (async () => {
    app.use(
      //cors()
      cors({
        origin: '*',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      }),
    );
    app.use(express.static(path.join(__dirname, '../UI/secretserver/build')));


    app.get('/*', (req:any, res:any) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    try {
      await createMongoConnection();
      app.use(bodyParser.json({ limit: '1500mb', extended: true }));
      app.use(bodyParser.urlencoded({ limit: '1500mb', extended: true }));
      const port=process.env.PORT || 5000;
      let secretAPI = require("./routes/api/secret");
      app.use("", secretAPI);
      const server = app.listen(port, (req:any) => {
        debug('Listening on port: ' + port);
      });
      
      module.exports = server;
    } catch (ex) {
      console.log('ex: ', ex);
    }
})();