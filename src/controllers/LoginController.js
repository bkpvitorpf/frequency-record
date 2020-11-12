const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const AuthConfig = require('../config/auth');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

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

          // Coloca os dados do professor ou do aluno dentro do objeto de usuário
          Object.assign(user,user_data.dataValues);

          const token = Jwt.sign(user,AuthConfig.secret,{
            expiresIn: 432000
          });

          res.json({token,user_info:{type,name}});
        }
      }

      res.status(401).json({message:'Unauthorized user'});
    }).catch(()=>res.json({message: 'User not found'}));
  }
}
