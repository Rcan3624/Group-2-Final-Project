const { Router } = require('express');
const courseController = require('../controllers/courseController');
const router = Router();



router.get('/sunnydale/create',  courseController.course_index);
router.get('/sunnydale/create', courseController.create_get);
router.post('/sunnydale/create', courseController.create_post);

module.exports = router;