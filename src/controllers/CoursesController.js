const Course = require('../models/Course');

module.exports={
  async indexCourses(req,res){
    const {modeId} = req.body;
    const {id:teacherId} = req.user;

    const courses = await Course.findAll({
      include:[{
        association: 'mode',
        attributes: [],
        where:{
          id: modeId
        }
      },{
        association: 'teacher',
        attributes: [],
        where:{
          id: teacherId
        }
      }]
    })

    return res.json({courses});
  }
}