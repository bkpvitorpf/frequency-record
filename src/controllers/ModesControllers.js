const Teacher = require('../models/Teacher');

module.exports={
  async indexModes(req,res){
    const {user_type} = req.user;

    if(user_type == 'teacher'){
      const {id:teacher_id} = req.user;

      const {mode:modes} = await Teacher.findOne({
        where:{
          id: teacher_id
        },
        include:{
          association: 'mode',
          attributes: ['id','name'],
          through:{
            attributes:[]
          }
        }
      });

      res.json({modes});
    }
  }
}