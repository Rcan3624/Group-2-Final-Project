// Note for anyone reading this code: This is all based of this video by Net Ninja: https://youtu.be/VVGgacjzc2Y?list=PLKycv9hdyoo3VewM8LEcQ8Iis-qgjwTtG

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Stu = require('./models/student')
const Teach = require('./models/teacher');
const Course = require('./models/class');
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


// Home page
app.get('/', (req, res) => {
  res.redirect('/sunnydale');
});

//Lookup database
app.get('/sunnydale', (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { courses: result, title: 'All courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/sunnydale/:id', (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then(result => {
      res.render('details', { course: result, title: 'Course Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

// blog routes
app.get('/sunnydale/create', (req, res) => {
  res.render('create', { title: 'Create a new course' });
});



// Home page redirect
app.get('/sunnydale', (req, res) => {
  res.render('index', { title: 'Home' })
});

// // Degrees page
// app.get('/sunnydale/degrees'z (req, res) => {
//   res.render('degrees', { tizle: 'Degrees' })
// });


 // Course List Page
 app.get('/sunnydale/course_list', (req, res) => {
   res.render('courses', { title: 'Course List' })
 });

// FAQ page
 app.get('/sunnydale/faq', (req, res) => {
   res.render('faq', { title: 'FAQ' })
 });

// // Admission Page
// app.get('/sunnydale/admission', (req, res) => {
//   res.render('admission', { title: 'Admission' })
// });

// // Login page
// app.get('/sunnydale/login', (req, res) => {
//   res.render('login', { title: 'Login' })
// });

// // 404 page
// app.use((req, res) => {
//   res.status(404).render('404', { title: '404' })
// });