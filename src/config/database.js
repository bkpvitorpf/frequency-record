require('dotenv/config');

module.exports={
  dialect:'postgres',
  host: process.env.DEV_HOST,
  username: process.env.DEV_USERNAME,
  password: process.env.DEV_PASSWORD,
  database: process.env.DEV_DATABASE,
  define:{
    timestamps: true,
    underscored: true
  },
};