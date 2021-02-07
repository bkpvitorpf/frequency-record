const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Log extends Model{
  static init(sequelize){
    super.init({
      sensor_id: DataTypes.INTEGER,
      mode_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
      matter_identifier: DataTypes.STRING
    },{
      sequelize,
      tableName: 'frequency_logs'
    });
  }
}

module.exports = Log;