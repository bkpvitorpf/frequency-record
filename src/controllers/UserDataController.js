const Mode = require('../models/Mode');
const SchoolClass = require('../models/SchoolClass');
const Course = require('../models/Course');
const Shift = require('../models/Shift');
const Matter = require('../models/Matter');

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

      res.json({registration,course,mode,class: schoolClass,shift});
    }
  }
}