'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'users', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      registration:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      sensor_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mode_id:{
        type: Sequelize.INTEGER,
      },
      course_id:{
        type: Sequelize.INTEGER,
      },
      class_id:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('students');
  }
};
