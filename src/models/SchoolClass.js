const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class SchoolClass extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            course_id: DataTypes.INTEGER
        },{
            sequelize,
            tableName: 'classes'
        });
    }

    static associate(models){
        this.belongsTo(models.Course,{foreignKey:'course_id',as: 'course'});
        this.belongsToMany(models.Shift,{foreignKey:'class_id', through: 'classes_shifts', as:'classes'});
    }
}

module.exports = SchoolClass;