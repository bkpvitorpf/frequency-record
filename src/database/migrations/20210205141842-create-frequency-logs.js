'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('frequency_logs',{
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      sensor_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mode_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'modes', key: 'id'},
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
        references: {model: 'classes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      matter_identifier:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('frequency_logs');
  }
};
