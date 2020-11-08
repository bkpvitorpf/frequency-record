const Express = require('express');
const AuthMiddleware = require('./middleware/authMiddleware');
const LoginController = require('./controllers/LoginController');
const FrequencyController = require('./controllers/FrequencyController');
const MattersController = require('./controllers/MattersController');
const ModesController = require('./controllers/ModesControllers');
const CoursesController = require('./controllers/CoursesController');
const ClassesController = require('./controllers/ClassesController');
const UserDataController = require('./controllers/UserDataController');

const route = Express.Router();

route.get('/register/:id/:mode_id/:course_id/:class_id/:matterIdentifier/:classQuanty', FrequencyController.save);
route.get('/data/matters',AuthMiddleware,MattersController.indexMatters);
route.get('/data/modes',AuthMiddleware,ModesController.indexModes);
route.get('/data/user',AuthMiddleware,UserDataController.indexData);

route.post('/login',LoginController.login);
route.post('/data/matters',AuthMiddleware,MattersController.customIndexMatters);
route.post('/data/courses',AuthMiddleware,CoursesController.indexCourses);
route.post('/data/classes',AuthMiddleware,ClassesController.indexClasses);

module.exports = route;