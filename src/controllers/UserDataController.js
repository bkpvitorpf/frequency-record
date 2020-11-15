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

      const mattersFrequency = [];

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
        const courses = await Course.findAll({
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
        });

        for (let count2 = 0; count2 < courses.length; count2++) {
          const schoolClasses = await SchoolClass.findAll({
            include:{
              association: 'teacher',
              attributes: [],
              where:{
                id: teacherId
              }
            },
            where:{
              course_id: courses[count2].id
            }
          });

          for (let count3 = 0; count3 < schoolClasses.length; count3++) {
            const matters = await Matter.findAll({
              include:[{
                association: 'teacher',
                attributes: [],
                where:{
                  id: teacherId
                }
              },{
                association: 'class',
                attributes: [],
                where:{
                  id: schoolClasses[count3].id
                }
              }]
            });

            for (let count4 = 0; count4 < matters.length; count4++) {
              const data = await connection.query(`SELECT classes_taught,total_classes FROM ${modes[count].table_name} WHERE teacher_id = ${teacherId} AND class_id = ${schoolClasses[count3].id} AND matter_id = ${matters[count4].id} AND month = 'Anual'`,{
                type: QueryTypes.SELECT
              });

              const mode = modes[count].name;
              const course = courses[count2].name;
              const schoolClass = schoolClasses[count3].name;
              const name = matters[count4].name;
            
              const values = Object.values(data[0]);

              const percentFrequency = (Number(values[0]) / Number(values[1])) * 100;
      
              mattersFrequency[count] = {
                mode,
                course,
                schoolClass,
                name,
                percentFrequency
              }
            }
          }
        }
      }

      return res.json(mattersFrequency);
    }else{
      const {class_id,id} = req.user;

      const mattersFrequency = [];

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
        const data = await connection.query(`SELECT ${matters[count].identifier},total_${matters[count].identifier} FROM ${tableName} WHERE student_id = ${id} AND month = 'Anual'`,{
          type: QueryTypes.SELECT
        });

        const name = matters[count].name;

        const values = Object.values(data[0]);

        const percentFrequency = (Number(values[0]) / Number(values[1])) * 100;

        mattersFrequency[count] = {
          name,
          percentFrequency
        }
      }

      return res.json(mattersFrequency);
    }
  }
}