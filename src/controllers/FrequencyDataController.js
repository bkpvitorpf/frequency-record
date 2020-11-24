const Teacher = require('../models/Teacher');
const Matter = require('../models/Matter');
const SchoolClass = require('../models/SchoolClass');
const connection = require('../database');
const { QueryTypes } = require('sequelize');
const Course = require('../models/Course');
const User = require('../models/User');
const Mode = require('../models/Mode');
const Student = require('../models/Student');

module.exports={
  async fetchData(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){
      const {id: teacherId} = req.user;
      const {month,matterIdentifier,modeId,courseId,classId} = req.body;

      const {name: matterName,id: matterId} = await Matter.findOne({
        where:{
          identifier: matterIdentifier
        }
      });

      const {name: modeName,table_name: modeTableName} = await Mode.findByPk(modeId);

      const {name: courseName} = await Course.findByPk(courseId)

      const {name: className,table_name: classTableName,shift} = await SchoolClass.findOne({
        where:{
          id: classId
        },
        include: {
          association: 'shift',
          attributes: ['name']
        }
      });

      const students = await Student.findAll({
        where:{
          mode_id: modeId,
          course_id: courseId,
          class_id: classId
        }
      })

      const studentsFrequency = [];

      for(let count = 0; count < students.length; count++){
        const {name} = await User.findByPk(students[count].user_id);

        const studentsData = await connection.query(`SELECT ${matterIdentifier}, total_${matterIdentifier} FROM ${classTableName} WHERE student_id = ${students[count].id} AND month = '${month}'`,{
          type: QueryTypes.SELECT
        });
  
        const values = Object.values(studentsData[0]);
  
        const monthlyAttendedClasses = values[0];
  
        const monthlyClasses = values[1];

        studentsFrequency[count] = {
          name,
          monthlyAttendedClasses,
          monthlyClasses
        }
      } 

      const monthlyData = await connection.query(`SELECT classes_taught,total_classes FROM ${modeTableName} WHERE teacher_id = ${teacherId} AND class_id = ${classId} AND matter_id = ${matterId} AND month = '${month}'`,{
        type: QueryTypes.SELECT
      });

      const anualData = await connection.query(`SELECT classes_taught,total_classes FROM ${modeTableName} WHERE teacher_id = ${teacherId} AND class_id = ${classId} AND matter_id = ${matterId} AND month = 'Anual'`,{
        type: QueryTypes.SELECT
      });

      const monthlyValues = Object.values(monthlyData[0]);

      const monthlyRemainingClasses = Number(monthlyValues[1]) - Number(monthlyValues[0]);

      const percentFrequency = (Number(monthlyValues[0]) / Number(monthlyValues[1])) * 100;

      const anualValues = Object.values(anualData[0]);

      const anualRemainingClasses = Number(anualValues[1]) - Number(anualValues[0]);

      const frequencyData = {
        matterName,
        courseName,
        className,
        shift: shift[0].name,
        modeName,
        month,
        monthlyClassesTaught: monthlyValues[0],
        monthlyClasses: monthlyValues[1],
        monthlyRemainingClasses,
        percentFrequency,
        anualRemainingClasses
      }

      return res.json({studentsFrequency,frequencyData});
    }else{
      const {class_id,id} = req.user;
      const {month,matterIdentifier} = req.body;

      const {user_id: teacherId} = await Teacher.findOne({
        include: [{
          association: 'class',
          attributes: [],
          where:{
            id: class_id
          }
        },{
          association: 'matter',
          attributes: [],
          where:{
            identifier: matterIdentifier
          }
        }]
      });

      const {name: matterName} = await Matter.findOne({
        where:{
          identifier: matterIdentifier
        }
      })

      const {name: teacher} = await User.findByPk(teacherId);

      const {table_name: tableName} = await SchoolClass.findByPk(class_id);

      const monthlyData = await connection.query(`SELECT ${matterIdentifier},total_${matterIdentifier} FROM ${tableName} WHERE student_id = ${id} AND month = '${month}'`,{
        type: QueryTypes.SELECT
      });

      const anualData = await connection.query(`SELECT ${matterIdentifier},total_${matterIdentifier} FROM ${tableName} WHERE student_id = ${id} AND month = 'Anual'`,{
        type: QueryTypes.SELECT
      });

      const monthlyValues = Object.values(monthlyData[0]);

      const monthlyRemainingClasses = Number(monthlyValues[1]) - Number(monthlyValues[0]);

      var percentFrequency;

      if(monthlyValues[0] > monthlyValues[1]){
        percentFrequency = 100;
      }else{
        percentFrequency = (Number(monthlyValues[0]) / Number(monthlyValues[1])) * 100;
      }

      const anualValues = Object.values(anualData[0]);

      const anualRemainingClasses = Number(anualValues[1]) - Number(anualValues[0]);

      const frequencyData = {
        matterName,
        teacher,
        month,
        monthlyAttendedClasses: monthlyValues[0],
        monthlyClasses: monthlyValues[1],
        monthlyRemainingClasses,
        percentFrequency,
        anualRemainingClasses
      }

      return res.json(frequencyData);
    }
  }
}