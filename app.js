const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Stu = require('./models/student')


// express app
const app = express();

// listen for requests
const dBURI = 'mongodb+srv://group2.fnkywbf.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
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

//Home page redirect
app.get('/index', (req, res) => {
  res.redirect('./pages/index.ejs');
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// about redirect
//app.get('/about-us', (req, res) => {
//res.redirect('./pages/about.html');
//});

// Degrees page
app.get('/degrees.html', (req, res) => {
  res.render('degrees', { title: 'Degrees' });
});

// Course List Page
app.get('/course_list.ejs', (req, res) => {
  res.render('course_list', { title: 'Admission' });
});

// FAQ page
app.get('/faq.html', (req, res) => {
  res.render('faq', { title: 'Faq' });
});

// Admission Page
app.get('/admission.ejs', (req, res) => {
  res.render('admission', { title: 'Admission' });
});

// Login page
app.get('/login.html', (req, res) => {
  res.render('login', { title: 'Login' });
});


// 404 page
app.use(() => {
  res.status(404).render('./pages/404.html', { root: __dirname });
});