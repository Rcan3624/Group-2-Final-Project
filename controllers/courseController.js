const Course = require('../models/class');




const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        dept: '',
        name: '',
        desc: ''
    };
}


module.exports.create_post = async (req, res) => {
    const {dept, name, desc} = req.body;

    try {

        const crea = await Course.create({dept, name, desc});
        res.status(201).json({crea: crea._id});

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

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

module.exports.course_details = (req, res) =>{
    const id = req.params.id;
    Course.findById(id)
    .then((result) =>{
        res.render('details', { course: result, title:'Courses'})
    })
    .catch((err)=>{
        console.log(err);
    });
};

//Displays course database information
module.exports.create_get = (req, res) =>{
    res.render('create', {courses: req.body, title: 'create'}
)};

/*module.exports.create_post = (req, res) =>{
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