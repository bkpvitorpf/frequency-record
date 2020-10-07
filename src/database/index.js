const {Sequelize} = require('sequelize');
const DbConfig = require('../config/database');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const connection = new Sequelize(DbConfig);

User.init(connection);
Student.init(connection);
Teacher.init(connection);

Student.associate(connection.models);
Teacher.associate(connection.models);

module.exports = connection;