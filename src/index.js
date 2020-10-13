const connection = require('./database');
const User = require('./models/User');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Mode = require('./models/Mode');
const Course = require('./models/Course');
const Shift = require('./models/Shift');
const SchoolClass = require('./models/SchoolClass');
const Info4 = require('./models/Info_4');

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

    */
}

defaultQuery();