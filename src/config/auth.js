require('dotenv/config');

// Chave de criptografia do JWT
module.exports = {
  secret: process.env.PRODUCTION_SECRET
}