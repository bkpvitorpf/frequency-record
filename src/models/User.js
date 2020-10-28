const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class User extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      permission_level: DataTypes.INTEGER,
      password: DataTypes.STRING
    },{
      sequelize
    });
  }
}

module.exports = User;