'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('info_4',{
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      month:{
        type: Sequelize.STRING,
        allowNull: false
      },
      student_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'students', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      total_asor:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      asor:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_construcao_de_sites:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      construcao_de_sites:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_eletronica_aplicada:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eletronica_aplicada:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_espanhol:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      espanhol:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_filosofia:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      filosofia:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_geografia:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      geografia:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_historia:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      historia:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_hst:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hst:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_instalacoes_eletricas:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      instalacoes_eletricas:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_portugues:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      portugues:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_programacao_web:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      programacao_web:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_pcc:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pcc:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_seguranca_da_informacao:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seguranca_da_informacao:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_sociologia:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sociologia:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('info_4');
  }
};
