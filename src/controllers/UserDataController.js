const Mode = require('../models/Mode');
const SchoolClass = require('../models/SchoolClass');
const Course = require('../models/Course');
const Shift = require('../models/Shift');
const Matter = require('../models/Matter');
const Info4 = require('../models/Info_4');
const Op = require('sequelize').Op;
const connection = require('../database');
const { QueryTypes } = require('sequelize');
const { all } = require('sequelize/types/lib/operators');

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
      const {registration,mode_id,course_id,class_id,id} = req.user;

      const mattersFrequency = [];
      const mattersData = [];
      
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
        // Precisei fazer uma série de desestruturações para obter o valor desejado

        const stage1 = mattersData[count];

        for(let count2 = 0; count2 < stage1.length; count ++){
          const stage2 = stage1[count2];

          const value = Number(Object.values(stage2));

          mattersFrequency[count] += value;
        }
      }

      res.json(mattersFrequency);

      const studentMatters = await Info4.findAll({
        where:{
          student_id: id,
          month:{
            [Op.ne]: 'Anual'
          }
        }
      });

      const teste = await Info4.findAll({
        where:{
          student_id: id,
          month: 'Anual'
        }
      });

      res.json(matters);
    }
  }
}