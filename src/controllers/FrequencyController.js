const Student = require('../models/Student');
const SchoolClass = require('../models/SchoolClass');
const Info4 = require('../models/Info_4');
const connection = require('../database');
const Teacher = require('../models/Teacher');
const MedioIntegrado = require('../models/Medio_integrado');

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

async function registerClass(mode_id,class_id,teacher_id,matter_id,classQuanty,month){
  switch(mode_id){
    case 1:
      const data = await MedioIntegrado.findOne({
        where:{
          class_id,
          teacher_id,
          matter_id,
          month
        }
      });

      const currentFrequency = data.getDataValue('classes_taught') + Number(classQuanty);

      await MedioIntegrado.update({classes_taught: currentFrequency},{
        where:{
          class_id,
          teacher_id,
          matter_id,
          month
        }
      })

    break;
  }
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
      include:{
        association: 'matter',
        attributes: ['id'],
        through:{
          attributes: []
        },
        where:{
          identifier: matterIdentifier
        }
      }
    });

    if(teacher){
      const month = getMonth();

      await registerClass(Number(mode_id),class_id,teacher.id,teacher.matter[0].id,classQuanty,month);

      res.json({message: "A aula foi registrada com sucesso"});
    }else{
      const {table_name} = await SchoolClass.findOne({
        where:{
          id: class_id,
          course_id,
        }
      });

      const studentData = await selectStudent(table_name,student.id);

      const currentFrequency = studentData.getDataValue(matterIdentifier) + Number(classQuanty);

      const month = getMonth();

      await connection.query(`UPDATE ${table_name} SET ${matterIdentifier} = ${currentFrequency} WHERE student_id = ${student.id} AND month = '${month}'`);

      res.json({message: 'A frequência do aluno foi registrada'});
    }
  } 
}