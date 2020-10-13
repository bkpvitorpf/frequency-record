const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Student extends Model{
    static init(sequelize){
        super.init({
            registration: DataTypes.INTEGER,
            sensor_id: DataTypes.INTEGER,
        },{
            sequelize
        });
    }

    static associate(models){
        this.belongsTo(models.User,{foreignKey:'user_id',as: 'user'});
        this.belongsTo(models.Mode,{foreignKey:'mode_id',as: 'mode'});
        this.belongsTo(models.Course,{foreignKey:'course_id',as: 'course'});
        this.belongsTo(models.SchoolClass,{foreignKey:'class_id',as: 'class'});
    }
}

module.exports = Student;