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
        this.belongsTo(models.User,{foreignKey:'user_id',as: 'user'})
    }
}

module.exports = Teacher;