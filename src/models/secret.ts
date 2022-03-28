export{}
const mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

const secretTextSchema = new Schema({
    hash:{
      type: String,
      unique: true 
    },
    secretText:{type:String,required:true},
    expireAt:{type:Date},
    createdAt: { type: Date, default: Date.now }

});

var secret = mongoose.model('secret', secretTextSchema);

module.exports = secret;