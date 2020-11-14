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

      return res.json({matters,courses,classes});
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

      return res.json({registration,course,mode,schoolClass,shift});
    }
  },
  async indexFrequency(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){
      const {id: teacherId} = req.user;

      const courses = [];
      const schoolClasses = [];
      const schoolClassesMatters = [];
      const mattersData = [];

      const matters = [];
      //const mattersFrequency = [];
      const schoolClassData = [];
      const frequencyData = [];

      const modes = await Mode.findAll({
        include:{
          association: 'teacher',
          attributes: [],
          where:{
            id: teacherId
          }
        }
      });

      for(let count = 0; count < modes.length; count++){
        courses[count] = await Course.findAll({
          include: [{
            association: 'mode',
            attributes: [],
            where:{
              id: modes[count].id
            }
          },{
            association: 'teacher',
            attributes: [],
            where:{
              id: teacherId
            }
          }]
        })
      }

      for (let count = 0; count < courses.length; count++) {
        const stage1 = courses[count];

        for (let count2 = 0; count2 < stage1.length; count2++){
          const data = await SchoolClass.findAll({
            include:{
              association: 'teacher',
              attributes: [],
              where:{
                id: teacherId
              }
            },
            where:{
              course_id: stage1[count2].id
            }
          })

          schoolClasses.push(data);
        }

        schoolClassData[count] = schoolClasses;
      }

      for (let count = 0; count < schoolClasses.length; count++) {
        const stage1 = schoolClasses[count];

        for (let count2 = 0; count2 < stage1.length; count2++){
          const data = await Matter.findAll({
            include:[{
              association: 'class',
              attributes:[],
              where:{
                id: stage1[count].id
              }
            },{
              association: 'teacher',
              attributes:[],
              where:{
                id: teacherId
              }
            }]
          })

          matters.push(data);
        }

        schoolClassesMatters[count] = matters
      }

      for (let count = 0; count < schoolClassData.length; count++) {
        
      }

      for(let count = 0; count < modes.length; count++){
        for (let count2 = 0; count2 < courses.length; count2++) {
          for (let count3 = 0; count3 < schoolClasses.length; count3++) {
            for (let count4 = 0; count4 < matters.length; count4++) {
              mattersData[count4] = await connection.query(`SELECT total_classes,classes_taught FROM ${modes[count].table_name} WHERE teacher_id = ${teacherId} AND class_id = ${schoolClasses[count3].id} AND matter_id = ${matters[count4].id} and month != 'Anual'`,{
                type: QueryTypes.SELECT
              });
            }
          }
        }
      }

      return res.json(mattersData);
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
        var percentFrequency = 0;

        if(frequency > totalAnualFrequency){
          percentFrequency = 100;
        }else{
          percentFrequency = (frequency / totalFrequency) * 100;
        }

        frequencyData[count] = {
          name,
          percentFrequency
        }
      }

      return res.json(frequencyData);
    }
  }
}