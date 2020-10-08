'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses_modes', {
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      course_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'courses', key: 'id'}
      },
      mode_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'modes', key: 'id'}
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
    await queryInterface.dropTable('courses_modes');
  }
};
