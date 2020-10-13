'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      table_name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      course_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'courses', key:'id'},
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
    await queryInterface.dropTable('classes');
  }
};
