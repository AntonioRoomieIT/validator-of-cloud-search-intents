const AWS = require('aws-sdk');
const { LexRuntimeV2, DeleteSessionCommand, StartConversationCommand, RecognizeTextCommand } = require("@aws-sdk/client-lex-runtime-v2");
const config = require('./config.js')



exports.handler = async (event) => {

  if (event.type > 0 && event.intentName != null && event.response != null && Object.keys(event.utterace).length > 0) {
    if (event.type == 1) {
      const session_id = getRandomSessionID();
      /**
       * Creating array of objects
       */
      var generalObj = {
        intentName: event?.intentName
      }, arrOfObjPerUtterance = [];
  
      for (let index = 0; index < event.utterace.length; index++) {
        try {
          let objPerUtterance = {};
          let lexparams = {
            "botAliasId": config.BOT_ALIAS_ID,
            "botId": config.BOT_ID,
            "localeId": config.LOCALE_ID,
            "text": event.utterace[index],
            "sessionId": session_id
          };
          let cmd = new RecognizeTextCommand(lexparams);
          const client = authAWS();
          const data = await client.send(cmd);
          objPerUtterance.utterance = event.utterace[index];
          objPerUtterance.response = data.messages[0].content;
          objPerUtterance.status = data.messages[0].content === event.response ? true : false;
          arrOfObjPerUtterance.push(objPerUtterance);
        } catch (err) {
          console.log("Error responding to message. ", err);
        }
  
      }
      generalObj.results = arrOfObjPerUtterance;
      generalObj.status=200;
      return generalObj;
    }else{
      return{status:500,error:"Por ahora solo existe type=1"};  
    }
  }else{
      return{status:500,error:"Type debe ser 1 o mayor, intentName no debe ser nullo, Response no debe ser nullo y Debes agregar por lo menos 1 utterance en forma de array."}; 
  }
}




const getRandomSessionID = () => {
  let base_numers = 99388815565;
  return base_numers.toString() + getRandomInt(9).toString() + getRandomInt(9).toString() + getRandomInt(9).toString() + getRandomInt(9).toString();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const authAWS = () => {
  try {
    const client = new LexRuntimeV2({
      region: "us-east-1",
      credentials: new AWS.Credentials({
        accessKeyId: config.AWS_KEY,
        secretAccessKey: config.AWS_SECRET
      })
    });
    return client;
  } catch (error) {
    console.log("Error autenticacion:" + error);
  }
}