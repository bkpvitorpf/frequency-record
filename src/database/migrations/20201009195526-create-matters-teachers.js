'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matters_teachers', {
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      matter_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'matters', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teacher_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'teachers', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('matters_teachers');
  }
};
