'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('info_3',{
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
      quimica:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_quimica:{
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('info_3');
  }
};
