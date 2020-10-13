const sequelize = require('sequelize');
const {Model,DataTypes} = require('sequelize');

class Info4 extends Model{
    static init(sequelize){
        super.init({
            month: DataTypes.STRING,
            total_asor: DataTypes.INTEGER,
            asor: DataTypes.INTEGER,
            total_construcao_de_sites: DataTypes.INTEGER,
            construcao_de_sites: DataTypes.INTEGER,
            total_eletronica_aplicada: DataTypes.INTEGER,
            eletronica_aplicada: DataTypes.INTEGER,
            total_espanhol: DataTypes.INTEGER,
            espanhol: DataTypes.INTEGER,
            total_filosofia: DataTypes.INTEGER,
            filosofia: DataTypes.INTEGER,
            total_geografia: DataTypes.INTEGER,
            geografia: DataTypes.INTEGER,
            total_historia: DataTypes.INTEGER,
            historia: DataTypes.INTEGER,
            total_hst: DataTypes.INTEGER,
            hst: DataTypes.INTEGER,
            total_instalacoes_eletricas: DataTypes.INTEGER,
            instalacoes_eletricas: DataTypes.INTEGER,
            total_portugues: DataTypes.INTEGER,
            portugues: DataTypes.INTEGER,
            total_programacao_web: DataTypes.INTEGER,
            programacao_web: DataTypes.INTEGER,
            total_pcc: DataTypes.INTEGER,
            pcc: DataTypes.INTEGER,
            total_seguranca_da_informacao: DataTypes.INTEGER,
            seguranca_da_informacao: DataTypes.INTEGER,
            total_sociologia: DataTypes.INTEGER,
            sociologia: DataTypes.INTEGER,
        },{
            sequelize,
            tableName: 'info_4'
        });
    }

    static associate(models){
        this.belongsTo(models.Student,{foreignKey:'student_id',as: 'student'});
    }
}

module.exports = Info4;