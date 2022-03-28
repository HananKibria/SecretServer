export {};
// @ts-ignore
import generateHash from 'random-hash';
const Secret = require('../models/secret');

class SecretData {
    constructor() {}
    async AddSecret(params: any, header?: any) {
        var expireDate=new Date();
        var currentDate=new Date();
        let randomHash=generateHash({length:5});
        if(params['expireAfter']==0){
            var secret =new Secret({
                hash:randomHash,
                secretText:params['secret'],
                expireAt:null,
                createdAt:currentDate
            });
        }
        else{
            console.log(params["expireAfter"]);
            expireDate.setSeconds(expireDate.getSeconds()+params['expireAfter']);
            var secret =new Secret({
                hash:randomHash,
                secretText:params['secret'],
                expireAt:expireDate,
                createdAt:currentDate
            });
        }
        try{
        secret.save();
        let result={
            hash:secret.hash,
            secretText:secret.secretText,
            createdAt:secret.createdAt,
            expiresAt:secret.expireAt
        }
        return result;
    }
    catch(err){
        throw err;
    }
}
    async GetSecret(params?: any, query?: any, header?: any) {
        let randomHash=params.hash;
        let secret = await Secret.find({hash : randomHash}).lean();
        if(secret.length==0){
            return null;
        }
        let result={
            hash:secret[0].hash,
            secretText:secret[0].secretText,
            createdAt:secret[0].createdAt,
            expiresAt:secret[0].expireAt
        }
        return result;

    }
}
module.exports=SecretData;