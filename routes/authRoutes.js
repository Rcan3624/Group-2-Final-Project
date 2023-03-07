const { Router } = require('express');
const authController = require('../controllers/authControllers')
const courseController = require('../controllers/courseController')

const router = Router();

//router.get('/sunnydale', courseController.course_index);                     // Code at line 7 currently not working
router.get('/create')
router.get('/sunnydale/signup', authController.signup_get);
router.post('/sunnydale/signup', authController.signup_post);
router.get('/sunnydale/login', authController.login_get);
router.post('/sunnydale/login', authController.login_post);
router.get('/sunnydale/logout', authController.logout_get);
router.get('/sunnydale/create', authController.create_get);
router.post('/sunnydale/create', authController.create_post);

module.exports = router;