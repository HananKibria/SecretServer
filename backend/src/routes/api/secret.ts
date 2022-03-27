export {};
let express = require('express');
let router = express.Router();
const SecretBusiness = require('../../business/secret');

router.post('/secret', async (req: any, res: any, next: any) => {
    let secretBusiness = new SecretBusiness();
    let result = await secretBusiness.AddSecret(req.body, req.header);
  
    result = {
      success: true,
      result: result,
      message: 'Secret Added',
    };
  
    res.status(200).send(result);
  });

  router.get('/secret/:hash', async (req: any, res: any, next: any) => {
    let secretBusiness= new SecretBusiness();
    let result = await secretBusiness.GetSecret(req.params, req.query, req.header);
    let currentDate=new Date();
    if(result==null){
      result={
        success:false,
        message:"Wrong Hash"
      }
    }
    else if(result.expiresAt==null || currentDate<=result.expiresAt){
      result = {
        success: true,
        result: result,
        message: 'Secret Found',
      };
    }
    else{
      result={
        success:false,
        message:"secret expired"
      }
    }
    res.status(200).send(result);
  });

module.exports=router;