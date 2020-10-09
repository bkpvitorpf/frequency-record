const {Sequelize} = require('sequelize');
const DbConfig = require('../config/database');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Mode = require('../models/Mode');
const Course = require('../models/Course');
const SchoolClass = require('../models/SchoolClass');
const Shift = require('../models/Shift');

const connection = new Sequelize(DbConfig);

User.init(connection);
Student.init(connection);
Teacher.init(connection);
Mode.init(connection);
Course.init(connection);
SchoolClass.init(connection);
Shift.init(connection);

Student.associate(connection.models);
Teacher.associate(connection.models);
Mode.associate(connection.models);
Course.associate(connection.models);
SchoolClass.associate(connection.models);
Shift.associate(connection.models);

module.exports = connection;