const Student = require('../models/Student');
const SchoolClass = require('../models/SchoolClass');
const Info4 = require('../models/Info_4');
const connection = require('../database');
const Teacher = require('../models/Teacher');
const Matter = require('../models/Matter');
const Course = require('../models/Course');

async function selectStudent(table_name,student_id){
  if(table_name == 'info_4'){
    const data = await Info4.findOne({
      where:{
        student_id
      }
    });

    return data;
  }
}

module.exports = {
  async save(req,res){
    const { id,modeId,courseId,classId,matterIdentifier,classQuanty} = req.params;
    
    const student = await Student.findOne({
      where:{
        sensor_id: id
      },
    });

    const teacher = await Teacher.findOne({
      where:{
        sensor_id: id
      },
      include:[{
        association: 'matter',
        attributes: ['identifier','id'],
        through: {
          attributes: []
        },
        where:{
          identifier:  matterIdentifier
        }
      },{
        association: 'schoolClass',
        attributes: ['course_id','id'],
        through:{
          attributes: []
        },
        where:{
          id: classId
        }
      }]
    });

    if(teacher){
        
      res.json(teacher);
    }else{
      const {table_name} = await SchoolClass.findOne({
        where:{
          id: classId,
          course_id: courseId
        }
      });

      const studentData = await selectStudent(table_name,student.id);

      const currentFrequency = studentData.getDataValue(matterIdentifier) + Number(classQuanty);

      await connection.query(`UPDATE ${table_name} SET ${matterIdentifier} = ${currentFrequency} WHERE student_id = ${student.id}`);

      res.json({message: 'A frequência do aluno foi registrada'});
    }
  } 
}