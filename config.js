require('dotenv-flow').config()

const config = {
  BOT_ALIAS_ID: process.env.BOT_ALIAS_ID,
  BOT_ID: process.env.BOT_ID,
  LOCALE_ID: process.env.LOCALE_ID,
  AWS_KEY: process.env.AWS_ACCESS_KEY_IDD,
  AWS_SECRET: process.env.AWS_SECRET_ACCESS_KEYY,
}

module.exports = config
