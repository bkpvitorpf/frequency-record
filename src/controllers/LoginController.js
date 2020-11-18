const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const AuthConfig = require('../config/auth');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const SchoolClass = require('../models/SchoolClass');
const Mode = require('../models/Mode');
const Shift = require('../models/Shift');
const Matter = require('../models/Matter');

module.exports = {
  async login(req,res){
    const {email,password} = req.body;

    await User.findOne({
      where: {
        // Short sintaxe, ou seja email: email só que de uma forma mais amigável
        email
      }
    }).then(async (data)=>{
      const {password: user_password,id: user_id,type,name}= data;

      const passwordValidate = await Bcrypt.compare(password,user_password);
    
      if(passwordValidate){
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
          // Armazena dentro da variável user_data o conteúdo de student ou de teacher caso um dos dois existam
          const user_data = student || teacher;

          const user = {
            user_type: type
          }

          const userInfo = {
            type,
            name
          }

          // Coloca os dados do professor ou do aluno dentro do objeto de usuário
          Object.assign(user,user_data.dataValues);

          const token = Jwt.sign(user,AuthConfig.secret,{
            expiresIn: 432000
          });

          if(teacher){
            const modes = await Mode.findAll({
              include:{
                association: 'teacher',
                attributes: [],
                where:{
                  id: teacher.id
                }
              }
            });

            const matters = await Matter.findAll({
              include:{
                association: 'teacher',
                attributes: [],
                where:{
                  id: teacher.id
                }
              }
            });

            const courses = await Course.findAll({
              include:{
                association: 'teacher',
                attributes: [],
                where:{
                  id: teacher.id
                }
              }
            });
      
            const classes = await SchoolClass.findAll({
              include:{
                association: 'teacher',
                attributes: [],
                where:{
                  id: teacher.id
                }
              }
            });

            Object.assign(userInfo,{modes,matters,courses,classes});
          }else{
            const {name: course} = await Course.findByPk(student.course_id);

            const {name: schoolClass} = await SchoolClass.findByPk(student.class_id);

            const {name: mode} = await Mode.findByPk(student.mode_id);

            const {name: shift} = await Shift.findOne({
              include:{
                association: 'class',
                attributes: [],
                where:{
                  id: student.class_id
                }
              }
            })

            Object.assign(userInfo,{registration:student.registration,course,schoolClass,mode,shift});
          }

          return res.json({token,userInfo});
        }
      }

      return res.status(401).json("Unauthorized user");
    }).catch(() => {
      return res.status(404).json("User not found");
    });
  }
}
