require('dotenv/config');

// Credenciais da base de dados
module.exports={
  dialect:'postgres',
  host: process.env.PRODUCTION_HOST,
  username: process.env.PRODUCTION_USERNAME,
  password: process.env.PRODUCTION_PASSWORD,
  database: process.env.PRODUCTION_DATABASE,
  define:{
    timestamps: true,
    underscored: true
  }
};