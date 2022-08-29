require('dotenv-flow').config()

const config = {
  BOT_ALIAS_ID: process.env.BOT_ALIAS_ID,
  BOT_ID: process.env.BOT_ID,
  LOCALE_ID: process.env.LOCALE_ID
}

module.exports = config
