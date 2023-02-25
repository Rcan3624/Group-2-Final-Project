const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Stu = require('./models/student')
const Teach = require('./models/teacher');
const Course = require('./models/class');
const Dept = require('./models/department');

// express app
const app = express();

// listen for requests
const dBURI = 'mongodb+srv://aowens35:schoolyard@group2.apj3tsk.mongodb.net/school?retryWrites=true&w=majority';
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
  res.render('index');
});

// Home page redirect
app.get('/index.html', (req, res) => {
  res.render('index');
});

// Degrees page
app.get('/degrees.html', (req, res) => {
  res.render('degrees', { title: 'Degrees' });
});

// Course List Page
app.get('/course_list.html', (req, res) => {
  res.render('course_list', { title: 'Course_List' });
});

// FAQ page
app.get('/faq.html', (req, res) => {
  res.render('faq', { title: 'Faq' });
});

// Admission Page
app.get('/admission.html', (req, res) => {
  res.render('admission', { title: 'Admission' });
});

// Login page
app.get('/login.html', (req, res) => {
  res.render('login', { title: 'Login' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('./pages/404.html', { root: __dirname });
});