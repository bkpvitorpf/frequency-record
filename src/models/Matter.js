const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Matter extends Model{
  static init(sequelize){
    super.init({
      identifier: DataTypes.STRING,
      name: DataTypes.STRING
    },{
      sequelize
    });
  }

  static associate(models){
    this.belongsToMany(models.Teacher,{foreignKey:'matter_id', through: 'matters_teachers', as:'teacher'});
    this.belongsToMany(models.SchoolClass,{foreignKey:'matter_id', through: 'classes_matters', as:'class'});
  }
}

module.exports = Matter;