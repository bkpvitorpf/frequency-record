const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Teacher extends Model{
  static init(sequelize){
    super.init({
      sensor_id: DataTypes.INTEGER
    },{
      sequelize
    });
  }

  static associate(models){
    this.belongsTo(models.User,{foreignKey:'user_id',as: 'user'});
    this.belongsToMany(models.SchoolClass,{foreignKey:'teacher_id', through: 'classes_teachers', as:'schoolClass'});
    this.belongsToMany(models.Matter,{foreignKey:'teacher_id', through: 'matters_teachers', as:'matter'});
    this.belongsToMany(models.Mode,{foreignKey:'teacher_id', through: 'teachers_modes', as: 'mode'});
    this.belongsToMany(models.Course,{foreignKey:'teacher_id', through: 'teachers_courses', as: 'course'});
  }
}

module.exports = Teacher;