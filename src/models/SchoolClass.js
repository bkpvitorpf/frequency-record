const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class SchoolClass extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING
        },{
            sequelize
        });
    }

    static associate(models){
        this.belongsTo(models.Course,{foreignKey:'course_id',as: 'course'})
    }
}

module.exports = SchoolClass;