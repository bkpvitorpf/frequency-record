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
        allowNull: false,
        references: {model: 'modes', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'courses', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      class_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'classes', key:'id'},
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
    await queryInterface.dropTable('students');
  }
};
