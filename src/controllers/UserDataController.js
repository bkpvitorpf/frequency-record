const Mode = require('../models/Mode');
const SchoolClass = require('../models/SchoolClass');
const Course = require('../models/Course');
const Shift = require('../models/Shift');
const Matter = require('../models/Matter');
const Info4 = require('../models/Info_4');
const connection = require('../database');
const { QueryTypes } = require('sequelize');

module.exports={
  async indexData(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){
      const {id: teacherId} = req.user;

      const matters = await Matter.findAll({
        include:{
          association: 'teacher',
          attributes: [],
          where:{
            id: teacherId
          }
        }
      });

      const courses = await Course.findAll({
        include:{
          association: 'teacher',
          attributes: [],
          where:{
            id: teacherId
          }
        }
      })

      const classes = await SchoolClass.findAll({
        include:{
          association: 'teacher',
          attributes: [],
          where:{
            id: teacherId
          }
        }
      })

      res.json({matters,courses,classes});
    }else{
      const {registration,mode_id,course_id,class_id} = req.user;

      const course = await Course.findByPk(course_id);

      const schoolClass = await SchoolClass.findByPk(class_id);

      const mode = await Mode.findByPk(mode_id);

      const shift = await Shift.findOne({
        include:{
          association: 'class',
          attributes: [],
          where:{
            id: class_id
          }
        }
      })

      res.json({registration,course,mode,schoolClass,shift});
    }
  },
  async indexFrequency(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){

    }else{
      const {class_id,id} = req.user;

      const mattersFrequency = [];
      const mattersData = [];
      const frequencyData = [];
      
      const matters = await Matter.findAll({
        include:{
          association: 'class',
          attributes: [],
          where:{
            id: class_id
          }
        }
      });

      const {table_name: tableName} = await SchoolClass.findByPk(class_id);

      for(let count = 0; count < matters.length; count++){
        mattersData[count] = await connection.query(`SELECT ${matters[count].identifier} FROM ${tableName} WHERE student_id = ${id} AND month != 'Anual'`,{
          type: QueryTypes.SELECT
        });
      }

      for(let count = 0; count < mattersData.length; count++){
        const stage1 = mattersData[count];
        
        // Inicia o valor da posição como 0, para que possa haver um valor para iniciar a soma da frequência
        mattersFrequency[count] = 0;

        for(let count2 = 0; count2 < stage1.length; count2 ++){
          // Desestruturando o objeto
          const stage2 = stage1[count2];

          // Pegando o valor do objeto
          const value = Number(Object.values(stage2));

          mattersFrequency[count] += value;
        }

        // Atualizando o valor anual de aulas assistidas da matéria na base de dados
        await connection.query(`UPDATE ${tableName} SET ${matters[count].identifier} = ${mattersFrequency[count]} WHERE student_id = ${id} AND month = 'Anual'`);
      }

      const anualFrequency = await Info4.findAll({
        where:{
          student_id: id,
          month: 'Anual',
        }
      });

      const totalAnualFrequency = anualFrequency[0];

      for(let count = 0; count < matters.length; count++){
        const frequency = mattersFrequency[count];
        const name = matters[count].name;
        const totalFrequency = totalAnualFrequency.getDataValue(`total_${matters[count].identifier}`);

        frequencyData[count] = {
          name,
          frequency,
          totalFrequency
        }
      }

      res.json(frequencyData);
    }
  }
}