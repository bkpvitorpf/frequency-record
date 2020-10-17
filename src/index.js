const connection = require('./database');
const User = require('./models/User');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Mode = require('./models/Mode');
const Course = require('./models/Course');
const Shift = require('./models/Shift');
const SchoolClass = require('./models/SchoolClass');
const Info4 = require('./models/Info_4');
const Matter = require('./models/Matter');
const MedioIntegrado = require('./models/Medio_integrado');

async function defaultQuery(){
    /*
    await User.create({
        name: 'Vitor Pereira Fontes',
        email: 'vitor@gmail.com',
        password: '1234'
    })

    await User.create({
        name: 'Pedro Lemos de Almeida Júnior',
        email: 'plemos@gmail.com',
        password: '1234',
        permission_level: 1
    })

    await Mode.create({
        name: 'Médio Integrado'
    })

    await Course.create({
        name: 'Informática'
    })

    await SchoolClass.create({
        name: '4º Ano',
        table_name: 'info_4',
        course_id: 1
    })


    await Student.create({
        registration: '3971',
        sensor_id: 1,
        mode_id: 1,
        course_id: 1,
        class_id: 1,
        user_id: 1
    })

    await Info4.create({
        month: 'Outubro',
        student_id: 2,
        total_asor: 0,
        total_construcao_de_sites: 0,
        total_eletronica_aplicada: 0,
        total_espanhol: 0,
        total_filosofia: 0,
        total_geografia: 0,
        total_historia: 0,
        total_hst: 0,
        total_instalacoes_eletricas: 0,
        total_portugues: 0,
        total_programacao_web: 0,
        total_pcc: 0,
        total_seguranca_da_informacao: 0,
        total_sociologia: 0,
    })
    
    await Teacher.create({
        user_id: 2,
        sensor_id: 4,
    })

    await Matter.create({
        identifier: 'quimica',
        name: 'Química'
    })

    const teacher = await Teacher.findByPk(1)
    const matter = await Matter.findByPk(1)

    await teacher.addMatter(matter)

    await MedioIntegrado.create({
        class_id: 2,
        teacher_id: 1,
        matter_id: 1,
        month: 'Outubro',
        monthly_classes: 8
    })

    const course = await Course.findByPk(1);
    const mode =  await Mode.findByPk(1);

    await course.addMode(mode);

        */

    const schoolClass = await SchoolClass.findByPk(2);
    const teacher = await Teacher.findByPk(1);

    schoolClass.addTeacher(teacher);
}

defaultQuery();