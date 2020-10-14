const Student = require('../models/Student');
const SchoolClass = require('../models/SchoolClass');
const Info4 = require('../models/Info_4');
const connection = require('../database');
const Teacher = require('../models/Teacher');
const Matter = require('../models/Matter');

async function selectStudent(table_name,student_id){
    if(table_name == 'info_4'){
        const data = await Info4.findOne({
            where:{
                student_id
            }
        })

        return data;
    }
}

module.exports = {
    async save(req,res){
        const { id,modeId,courseId,schoolClass,matterIdentifier,classQuanty} = req.params;
        
        const student = await Student.findOne({
            where:{
                sensor_id: id
            },
        })

        const teacher = await Teacher.findOne({
            where:{
                sensor_id: id
            },
        })

        if(teacher){
            const {matter} = await Teacher.findOne({
                include:{
                    association: 'matter',
                    attributes: ['identifier'],
                    through: {
                        attributes: []
                    },
                    where:{
                       identifier:  matterIdentifier
                    }
                }
            })

            const result = matter[0];

        }else{
            const {table_name} = await SchoolClass.findOne({
                where:{
                    id: schoolClass,
                    course_id: courseId
                }
            })

            const studentData = await selectStudent(table_name,student.id);

            const currentFrequency = studentData.getDataValue(matterIdentifier) + Number(classQuanty);

            await connection.query(`UPDATE ${table_name} SET ${matterIdentifier} = ${currentFrequency} WHERE student_id = ${student.id}`)

            res.json({message: 'A frequência do aluno foi registrada'})
        }
    }
}