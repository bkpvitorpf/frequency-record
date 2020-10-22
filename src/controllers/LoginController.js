const Bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

module.exports = {
  async login(req,res){
    const {email,password} = req.body;

    await User.findOne({
      where: {
        email
      }
    }).then(async (data)=>{
      const {password: user_password,id: user_id,permission_level,name}= data;

      const status = await Bcrypt.compare(password,user_password);
    
      if(status){
        
        const student = await Student.findOne({
          where:{
            user_id
          },
          attributes:[
            'id',
            'registration',
            'sensor_id',
            'mode_id',
            'course_id',
            'class_id'
          ]
        }); 
        
        const teacher = await Teacher.findOne({
          where:{
            user_id
          },
          attributes:[
            'id',
            'sensor_id',
          ]
        })

        if(student || teacher){
          function defineType(){
            if(student){
              return 'student';
            }else if(teacher){
              return 'teacher';
            }
          }

          const user_type = defineType();

          if(student || teacher){
            const user = {
              // Coloca dentro de user a propriedade que existe, ou seja, se professor existir, user: teacher, se não, user: student
              user: student || teacher,
              user_type,
              name,
              permission_level
            }

            res.json(user);
          }
        }else{
          res.json({message: "User not exist"})
        }
      }

      res.status(401).json({message:'Unauthorized user'});
    }).catch(()=>res.json({message: 'User not found'}));

  }
}