const {Sequelize} = require('sequelize');
const DbConfig = require('../config/database');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Mode = require('../models/Mode');
const Course = require('../models/Course');
const SchoolClass = require('../models/SchoolClass');
const Shift = require('../models/Shift');
const Matter = require('../models/Matter');
const Info4 = require('../models/Info_4');
const MedioIntegrado = require('../models/Medio_integrado');

const connection = new Sequelize(DbConfig);

// Passa a conexão com o banco para os models
User.init(connection);
Student.init(connection);
Teacher.init(connection);
Mode.init(connection);
Course.init(connection);
SchoolClass.init(connection);
Shift.init(connection);
Matter.init(connection);
Info4.init(connection);
MedioIntegrado.init(connection);

// Passa todos os models existentes pra dentro de cada model, para que possam ser feitos os relacionamentos
Student.associate(connection.models);
Teacher.associate(connection.models);
Mode.associate(connection.models);
Course.associate(connection.models);
SchoolClass.associate(connection.models);
Shift.associate(connection.models);
Matter.associate(connection.models);
Info4.associate(connection.models);
MedioIntegrado.associate(connection.models);

module.exports = connection;