const Student = require('../models/Student');
const SchoolClass = require('../models/SchoolClass');
const Info4 = require('../models/Info_4');
const connection = require('../database');
const Teacher = require('../models/Teacher');

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
        const { id,mode,course,schoolClass,matter,classQuanty} = req.params;
        
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
            res.json({ok: 'true'});
        }else{
            const {table_name} = await SchoolClass.findOne({
                where:{
                    id: schoolClass,
                    course_id: course
                }
            })

            const studentData = await selectStudent(table_name,student.id);

            const currentFrequency = studentData.getDataValue(matter) + Number(classQuanty);

            await connection.query(`UPDATE ${table_name} SET ${matter} = ${currentFrequency} WHERE student_id = ${student.id}`)

            res.json({message: 'A frequência do aluno foi registrada'})
        }
    }
}