export {};
var SecretData = require("../data/secret");

class SecretBusiness {
    secretData: any;
    constructor() {
      this.secretData = new SecretData();
    }
    async AddSecret(params: any, header?: any) {
        let result = await this.secretData.AddSecret(params, header);
        return result;
      }
      async GetSecret(params?: any, query?: any, header?: any) {
        let result: any;
        result = await this.secretData.GetSecret(params, query, header);
        return result;
      }
}
module.exports=SecretBusiness;