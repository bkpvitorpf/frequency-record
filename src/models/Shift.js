const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Shift extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING
    },{
      sequelize
    });
  }

  static associate(models){
    this.belongsToMany(models.SchoolClass,{foreignKey:'shift_id', through: 'classes_shifts', as:'class'});
  }
}

module.exports = Shift;