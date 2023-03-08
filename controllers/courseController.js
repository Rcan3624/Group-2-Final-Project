const Course = require('../models/Course');






/*module.exports.create_get = (req, res) =>{
    res.render('create', {title: 'Create'});
}

module.exports.create_post = async (req, res) => {
    const {dept, name, desc} = req.body;

    try {

        const crea = await Course.create({dept, name, desc});
        crea.save();

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}



/*const course_details = (req, res) =>{
    const id = req.params.id;
    Course.findById(id)
    .then((result) =>{
        res.render('course_list', { course: result, title:'Courses'})
    })
    .catch((err)=>{
        console.log(err);
    });
}*/

/// Might not be needed ///
 module.exports.course_index = (req, res) => {
    Course.find().sort({createdAt: -1})
    .then((result) =>{
        res.render('create', {title:'Create Course', courses: result})
    })
    .catch((err)=>{
        console.log(err);
    })
};

module.exports.create_get = (req, res) =>{
    res.render('create', {title: 'Create a new Blog'}
)};

module.exports.create_post = (req, res) =>{
    const crea = new Course(req.body);
    crea.save()
        .then((result)=>{
            res.redirect('/sunnydale/create')
        })
    .catch((err)=>{
        console.log(err);
    });
};

///
/*
const course_delete = (req, res) =>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/'})
    })
    .catch(err => {
        console.log(err)
    })
};

module.exports = {
    creat_get
    create_post
    course_index,
    course_details,
    course_create_get,
    course_delete,
    course_create_post
}*/