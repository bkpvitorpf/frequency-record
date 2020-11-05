const Teacher = require('../models/Teacher');
const SchoolClass = require('../models/SchoolClass');
const Matter = require('../models/Matter');

module.exports={
  async indexMatters(req,res){
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
  },
  async customIndexMatters(req,res){
    const {classId} = req.body;
    const {id:teacher_id} = req.user;

    const matters = await Matter.findAll({
      include:[
        {
          association: 'class',
          attributes: [],
          where:{
            id: classId
          }
        },{
          association: 'teacher',
          attributes: [],
          where:{
            id: teacher_id
          }
        }
      ]
    })

    res.json({matters});
  }
}