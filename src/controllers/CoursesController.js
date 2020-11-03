const Course = require('../models/Course');

module.exports={
  async indexCourses(req,res){
    const {modeId} = req.body;

    const courses = await Course.findAll({
      include:{
        association: 'mode',
        attributes: [],
        through:{
          attributes:[]
        },
        where:{
          id: modeId
        }
      }
    })

    res.json({courses});
  }
}