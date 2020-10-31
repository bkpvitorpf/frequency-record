const Teacher = require('../models/Teacher');
const Matter = require('../models/Matter');
const SchoolClass = require('../models/SchoolClass');

module.exports={
  async indexMatters(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){
      const {id:teacher_id} = req.user;

      const {matter:matters} = await Teacher.findOne({
        where:{
          id: teacher_id
        },
        include:{
          association: 'matter',
          attributes: ['id','identifier','name'],
          through:{
            attributes:[]
          }
        }
      });

      res.json({matters});
    }else{
      const {class_id} = req.user;

      const {matter:matters} = await SchoolClass.findOne({
        where:{
          id: class_id
        },
        include:{
          association: 'matter',
          attributes: ['id','identifier','name'],
          through:{
            attributes:[]
          }
        }
      });

      res.json({matters});
    }
  },
  async mattersData(req,res){
    
  }
}