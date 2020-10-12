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
