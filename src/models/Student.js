const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');
const { model } = require('../database');

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
        this.belongsTo(models.User,{foreignKey:'user_id',as: 'user'})
    }
}

module.exports = Student;