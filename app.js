const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Stu = require('./models/student')
const Teach = require('./models/teacher');
const Course = require('./models/class');
const Dept = require('./models/department');
const Enroll = require('./models/enrollment');

// express app
const app = express();

// listen for requests
const dBURI = 'mongodb+srv://grouptwo:schoolyard@group2.50g5lu7.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});



// DATABASE STUFF

// Lookup database
app.get('/sunnydale', (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { courses: result, title: 'All courses' });
      
    })
    .catch(err => {
      console.log(err);
    });
});

//TODO: Fix the issue with the links, and add the ability to add, update, and remove the courses
// This is an ugly fix, but this will have to do for now.

// app.get('/sunnydale/:id', (req, res) => {
//   const id = req.params.id;
//   Course.findById(id)
//     .then(result => {
//       res.render('details', { courses: result, title: 'Course Details' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// End of Database lookup

// // TODO Still need to get code for creating courses working
// // create courses code
// app.get('/sunnydale/create', (req, res) => {
//   res.render('create', { courses: 'Create a new course' });
// });

// app.get('/sunnydale', (req, res) => {
//   Course.find().sort({ createdAt: -1 })
//     .then(result => {
//       res.render('index', { courses: result, title: 'All Courses' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// // end create courses code

// // TODO Still need to get code for deleting courses working
// // Delete course code
// app.delete('/sunnydale/:id', (req, res) => {
//   const id = req.params.id;
  
//   Course.findByIdAndDelete(id)
//     .then(result => {
//       res.json({ redirect: '/sunnydale' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// end delete course code
// END OF DATABASE STUFF


// URL STUFF
// Home page
app.get('/', (req, res) => {
  res.redirect('/sunnydale');
});

// Home page redirect
app.get('/sunnydale', (req, res) => {
  res.render('index', { title: 'Home' })
});

// Degrees page
app.get('/sunnydale/degrees', (req, res) => {
  res.render('degrees', { title: 'Degrees' })
});

// Course List Page
app.get('/sunnydale/course_list', (req, res) => {
  res.render('course_list', { title: 'Course List' })
});

// FAQ page
app.get('/sunnydale/faq', (req, res) => {
  res.render('faq', { title: 'FAQ' })
});

// Admission Page
app.get('/sunnydale/admission', (req, res) => {
  res.render('admission', { title: 'Admission' })
});

// Login page
app.get('/sunnydale/login', (req, res) => {
  res.render('login', { title: 'Login' })
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});
//END OF URL STUFF