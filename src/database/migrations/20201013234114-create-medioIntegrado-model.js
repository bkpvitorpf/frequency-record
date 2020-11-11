'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('medio_integrado',{
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      class_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'classes', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teacher_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'teachers', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      matter_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'matters', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      month:{
        type: Sequelize.STRING,
        allowNull: false
      },
      total_classes:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      classes_taught:{
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
    await queryInterface.dropTable('medio_integrado');
  }
};
