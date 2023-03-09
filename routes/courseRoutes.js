const {Router} = require('express');
const courseController = require('../controllers/courseController');
const router = Router();




router.get('/',  courseController.course_index);
router.get('/create', courseController.create_get);
router.post('/create', courseController.create_post);
router.get('/:id', courseController.course_details);

module.exports = router;