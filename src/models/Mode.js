const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Mode extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING
    },{
      sequelize
    });
  }

  static associate(models){
    this.belongsToMany(models.Course,{foreignKey:'mode_id', through: 'courses_modes', as:'course'});
  }
}

module.exports = Mode;