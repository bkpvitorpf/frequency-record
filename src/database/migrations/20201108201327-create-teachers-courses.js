'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teachers_courses',{
      id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      teacher_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'teachers', key:'id'},
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
    await queryInterface.dropTable('teachers_courses');
  }
};
