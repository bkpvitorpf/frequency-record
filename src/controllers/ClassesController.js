const SchoolClass = require('../models/SchoolClass');

module.exports={
  async indexClasses(req,res){
    const {courseId} = req.body;

    const classes = await SchoolClass.findAll({
      where:{
        course_id: courseId
      }
    })

    res.json({classes});
  }
}