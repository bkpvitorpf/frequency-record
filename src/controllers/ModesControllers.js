const Teacher = require('../models/Teacher');

module.exports={
  async indexModes(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){
      const {id:teacherId} = req.user;

      const {mode:modes} = await Teacher.findOne({
        where:{
          id: teacherId
        },
        include:{
          association: 'mode',
          attributes: ['id','name'],
          through:{
            attributes:[]
          }
        }
      });

      return res.json({modes});
    }
  }
}