const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class SchoolClass extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            table_name: DataTypes.STRING
        },{
            sequelize,
            tableName: 'classes'
        });
    }

    static associate(models){
        this.belongsTo(models.Course,{foreignKey:'course_id',as: 'course'});
        this.belongsToMany(models.Shift,{foreignKey:'class_id', through: 'classes_shifts', as:'shift'});
        this.belongsToMany(models.Teacher,{foreignKey:'class_id', through: 'classes_teachers', as:'teacher'});
    }
}

module.exports = SchoolClass;