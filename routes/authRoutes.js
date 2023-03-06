const { Router } = require('express');
const authController = require('../controllers/authControllers')

const router = Router();

router.get('/sunnydale/signup', authController.signup_get);
router.post('/sunnydale/signup', authController.signup_post);
router.get('/sunnydale/login', authController.login_get);
router.post('/sunnydale/login', authController.login_post);
router.get('/sunnydale/logout', authController.logout_get);

module.exports = router;