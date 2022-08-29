const aws = require('aws-sdk');
const config = require('./config.js')


exports.handler = async (event) => {
  if(event.type==1){
    console.log(event.intentName);
  }
}


