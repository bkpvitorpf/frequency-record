const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class MedioIntegrado extends Model{
    static init(sequelize){
        super.init({
            month: DataTypes.STRING,
            monthly_classes: DataTypes.INTEGER,
            classes_taught: DataTypes.INTEGER
        },{
            sequelize,
            tableName: 'medio_integrado'
        });
    }

    static associate(models){
        this.belongsTo(models.SchoolClass,{foreignKey:'class_id',as: 'class'});
        this.belongsTo(models.Teacher,{foreignKey:'teacher_id',as: 'teacher'});
        this.belongsTo(models.Matter,{foreignKey:'matter_id',as: 'matter'});
    }
}

module.exports = MedioIntegrado;