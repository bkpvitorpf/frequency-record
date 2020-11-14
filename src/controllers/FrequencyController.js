const Student = require('../models/Student');
const SchoolClass = require('../models/SchoolClass');
const Info4 = require('../models/Info_4');
const connection = require('../database');
const Teacher = require('../models/Teacher');
const { QueryTypes } = require('sequelize');

async function selectStudent(tableName,studentId,matterIdentifier,month){
  const data = await connection.query(`SELECT ${matterIdentifier} FROM ${tableName} WHERE student_id = ${studentId} AND month = '${month}'`,{
    type: QueryTypes.SELECT
  });
  
  return data[0];
}

async function registerClass(tableName,classId,teacherId,matterId,classQuanty,month){

  const data = await connection.query(`SELECT classes_taught FROM ${tableName} WHERE class_id = ${classId} AND teacher_id = ${teacherId} AND matter_id = ${matterId} AND month = '${month}'`,{
    type: QueryTypes.SELECT
  })

  const frequency = data[0];

  const currentFrequency = Number(Object.values(frequency)) + Number(classQuanty);

  await connection.query(`UPDATE ${tableName} SET classes_taught = ${currentFrequency} WHERE class_id = ${classId} AND teacher_id = ${teacherId} AND matter_id = ${matterId} AND month = '${month}'`);

  await connection.query(`UPDATE ${tableName} SET classes_taught = ${currentFrequency} WHERE class_id = ${classId} AND teacher_id = ${teacherId} AND matter_id = ${matterId} AND month = 'Anual'`);
}

function getMonth(){
  const data = new Date();

  const currentDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);

  const month_id = currentDate.getUTCMonth();

  let month_name;

  switch(month_id){
    case 0:
      month_name = 'Janeiro';
    break;
    case 1:
      month_name = 'Fevereiro';
    break;
    case 2:
      month_name = 'Março';
    break;
    case 3:
      month_name = 'Abril';
    break;
    case 4:
      month_name = 'Maio';
    break;
    case 5:
      month_name = 'Junho';
    break;
    case 6:
      month_name = 'Julho';
    break;
    case 7:
      month_name = 'Agosto';
    break;
    case 8:
      month_name = 'Setembro';
    break;
    case 9:
      month_name = 'Outubro';
    break;
    case 10:
      month_name = 'Novembro';
    break;
    case 11:
      month_name = 'Dezembro';
    break;
  }

  return month_name;
}

module.exports = {
  async save(req,res){
    const { id,mode_id,course_id,class_id,matterIdentifier,classQuanty} = req.params;
    
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
        attributes: ['id'],
        through:{
          attributes: []
        },
        where:{
          identifier: matterIdentifier
        }
      },{
        association: 'mode',
        attributes: ['id','table_name'],
        through:{
          attributes: []
        },
        where:{
          id: mode_id
        }
      }]
    });

    if(teacher){
      const month = getMonth();

      await registerClass(teacher.mode[0].table_name,class_id,teacher.id,teacher.matter[0].id,classQuanty,month);

      return res.json({message: "A aula foi registrada com sucesso"});
    }else{
      const month = getMonth();

      const {table_name} = await SchoolClass.findOne({
        where:{
          id: class_id,
          course_id,
        }
      });

      const frequency = await selectStudent(table_name,student.id,matterIdentifier,month);

      const currentFrequency = Number(Object.values(frequency)) + Number(classQuanty);

      await connection.query(`UPDATE ${table_name} SET ${matterIdentifier} = ${currentFrequency} WHERE student_id = ${student.id} AND month = '${month}'`);

      await connection.query(`UPDATE ${table_name} SET ${matterIdentifier} = ${currentFrequency} WHERE student_id = ${student.id} AND month = 'Anual'`);

      return res.json({message: 'A frequência do aluno foi registrada'});
    }
  } 
}