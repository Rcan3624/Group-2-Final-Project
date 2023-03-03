//TODO - Figure out what's causing the "SyntaxError: Unexpected token '.' " error when running the "nodemon app" in the terminal
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

// routes
app.get('/', (req, res) => {
  res.redirect('/courses');
});

//TODO - 
// Create course code
//app.get('/courses/create', (req, res) => {
  //res.render('create', { title: 'Create a new course' });
//});

app.get('/courses', (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { course: result, title: 'All courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

// Course delete code
app.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});