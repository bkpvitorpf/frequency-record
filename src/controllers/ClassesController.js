const SchoolClass = require('../models/SchoolClass');

module.exports={
  async indexClasses(req,res){
    const {courseId} = req.body;
    const {id:teacherId} = req.user;

    const classes = await SchoolClass.findAll({
      where:{
        course_id: courseId
      },
      include:{
        association: 'teacher',
        attributes: [],
        where:{
          id: teacherId
        }
      }
    })

    return res.json({classes});
  }
}