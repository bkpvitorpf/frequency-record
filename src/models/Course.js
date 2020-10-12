const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Course extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING
        },{
            sequelize,
        });
    }

    static associate(models){
        this.belongsToMany(models.Mode,{foreignKey:'course_id', through: 'courses_modes', as: 'mode'});
    }
}

module.exports = Course;